import React from "react";
import { LoginImg } from "./LoginImg";
import PageTemplate from "../../components/PageTemplate";
import {
  Center,
  HStack,
  VStack,
  Box,
  Text,
  Button,
  Input,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Field, Form, Formik, FormikHelpers } from "formik";

interface FormValues {
  username: string;
  password: string;
  unauthorized?: string;
}

export const SignIn = () => {
  const history = useHistory();
  const initialValues: FormValues = { username: "", password: "" };

  function validateName(value) {
    let err;
    if (!value) {
      err = "Username is required";
    }
    return err;
  }

  function validatePassword(value) {
    let err;
    if (!value) {
      err = "Password is required";
    }
    return err;
  }

  const onFormSubmit = (
    { username, password }: FormValues,
    actions: FormikHelpers<FormValues>,
  ) => {
    axios({
      method: "POST",
      url: "/api/Login",
      data: {
        username,
        password,
      },
    })
      .then((res) => {
        localStorage.setItem("token", res.data);
        history.push("/search");
        //TODO: when submit form to create worker, get token from local storage and include token in the header when sending request
      })
      .catch((e: Error) => {
        actions.setFieldError(
          "unauthorized",
          "The username or password is incorrect. Try again.",
        );
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  return (
    <PageTemplate curPage="signin">
      <Center height="80vh">
        <HStack spacing={40}>
          <Box>
            <LoginImg />
          </Box>

          <VStack spacing={5} align="left">
            <Center>
              <Text fontSize="24px" fontWeight="300">
                SIGN IN
              </Text>
            </Center>

            <VStack align="left" spacing={2} width="300px">
              <Formik initialValues={initialValues} onSubmit={onFormSubmit}>
                {(props) => {
                  return (
                    <Form>
                      <Field name="username" validate={validateName}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.username && form.touched.username
                            }
                          >
                            <Input
                              {...field}
                              type="text"
                              name="username"
                              placeholder="Username"
                              variant="filled"
                            />
                            <FormErrorMessage>
                              {form.errors.username}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Box m={2}></Box>

                      <Field name="password" validate={validatePassword}>
                        {({ field, form }) => (
                          <FormControl
                            isInvalid={
                              form.errors.password && form.touched.password
                            }
                          >
                            <Input
                              {...field}
                              type="password"
                              name="password"
                              placeholder="Password"
                              variant="filled"
                            />
                            <FormErrorMessage>
                              {form.errors.password}
                            </FormErrorMessage>
                          </FormControl>
                        )}
                      </Field>

                      <Text style={{ color: "red" }}>
                        {props.errors.unauthorized}
                      </Text>

                      <Box m={2}></Box>

                      <Button colorScheme="blue" type="submit" width="300px">
                        Sign In
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
            </VStack>
          </VStack>
        </HStack>
      </Center>
    </PageTemplate>
  );
};
