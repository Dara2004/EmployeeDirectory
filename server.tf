terraform {
  backend "s3" {
    bucket = "testwestbucket"
    key    = "tfstates/ubcsharp"
    region = "us-west-2"
  }
}
provider "aws" {
  region = "us-west-2"
}
resource "null_resource" "build_dotnet" {
  triggers = {
    always_run = "${timestamp()}"
  }
  provisioner "local-exec" {
    command = "yarn build:server"
  }
}

resource "aws_db_instance" "employee_database" {
  allocated_storage   = 20
  engine              = "sqlserver-ex"
  engine_version      = "14.00.3356.20.v1"
  identifier          = "employee-database"
  instance_class      = "db.t2.micro"
  password            = "X5Eqd3eQzk"
  skip_final_snapshot = true
  publicly_accessible = true
  username            = "sharp"
}
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "amplify/backend/function/server/src/bin/release/netcoreapp3.1/publish"
  output_path = "lambda.zip"
  depends_on  = [null_resource.build_dotnet]
}
resource "aws_lambda_function" "myLambda" {
  function_name    = "firstFunction"
  filename         = "lambda.zip"
  memory_size      = 512
  timeout          = 30
  source_code_hash = data.archive_file.lambda_zip.output_base64sha256
  handler          = "server::server.LambdaEntryPoint::FunctionHandlerAsync"
  runtime          = "dotnetcore3.1"
  role             = aws_iam_role.lambda_role.arn
}
# IAM role which dictates what other AWS services the Lambda function
# may access.
resource "aws_iam_role" "lambda_role" {
  name               = "role_lambda"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}
resource "aws_iam_role_policy_attachment" "fullaccess" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/AWSLambda_FullAccess"
}
resource "aws_iam_role_policy_attachment" "basicexec" {
  role       = aws_iam_role.lambda_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}
resource "aws_api_gateway_rest_api" "apiLambda" {
  name = "myAPI"
}
resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = aws_api_gateway_rest_api.apiLambda.id
  parent_id   = aws_api_gateway_rest_api.apiLambda.root_resource_id
  path_part   = "{proxy+}"
}
resource "aws_api_gateway_method" "proxyMethod" {
  rest_api_id   = aws_api_gateway_rest_api.apiLambda.id
  resource_id   = aws_api_gateway_resource.proxy.id
  http_method   = "ANY"
  authorization = "NONE"
}
resource "aws_api_gateway_integration" "lambda" {
  rest_api_id             = aws_api_gateway_rest_api.apiLambda.id
  resource_id             = aws_api_gateway_method.proxyMethod.resource_id
  http_method             = aws_api_gateway_method.proxyMethod.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.myLambda.invoke_arn
}
resource "aws_api_gateway_method" "proxy_root" {
  rest_api_id   = aws_api_gateway_rest_api.apiLambda.id
  resource_id   = aws_api_gateway_rest_api.apiLambda.root_resource_id
  http_method   = "ANY"
  authorization = "NONE"
}
resource "aws_api_gateway_integration" "lambda_root" {
  rest_api_id             = aws_api_gateway_rest_api.apiLambda.id
  resource_id             = aws_api_gateway_method.proxy_root.resource_id
  http_method             = aws_api_gateway_method.proxy_root.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.myLambda.invoke_arn
}
resource "aws_api_gateway_deployment" "apideploy" {
  depends_on = [
    aws_api_gateway_integration.lambda,
    aws_api_gateway_integration.lambda_root,
  ]
  rest_api_id = aws_api_gateway_rest_api.apiLambda.id
  stage_name  = "test"
}
resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.myLambda.function_name
  principal     = "apigateway.amazonaws.com"
  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = "${aws_api_gateway_rest_api.apiLambda.execution_arn}/*/*"
}
output "base_url" {
  value = aws_api_gateway_deployment.apideploy.invoke_url
}
output "db_instance_url" {
  value = aws_db_instance.employee_database.address
}
