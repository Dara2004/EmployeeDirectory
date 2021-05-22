using Amazon;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using server.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PhotoUploadController : ControllerBase
    {
        private readonly EmployeeDirectoryContext _context;

        private const string bucketName = "ae-worker-photos";
        //private const string objectKey = "";
        private const string filePath = "*** provide the full path name of the file to upload ***";
        // Specify how long the presigned URL lasts, in hours
        private const double timeoutDuration = 12;
        private static readonly RegionEndpoint bucketRegion = RegionEndpoint.USEast1;
        private static IAmazonS3 s3Client;
        private string AwsAccessKeyId { get; set; }
        private string AwsSecretAccessKey { get; set; }
        public PhotoUploadController(EmployeeDirectoryContext context, IOptions<AppSettings> appSettings)
        {
            _context = context;
            AwsAccessKeyId = appSettings.Value.AwsAccessKeyId;
            AwsSecretAccessKey = appSettings.Value.AwsSecretAccessKey;
        }

        //https://docs.aws.amazon.com/AmazonS3/latest/userguide/PresignedUrlUploadObject.html
        // GET: api/PhotoUpload/10005
        [HttpGet("{id}")]
        public ActionResult<string> PhotoUpload(string id)
        {
            s3Client = new AmazonS3Client(AwsAccessKeyId, AwsSecretAccessKey, bucketRegion);
            var url = GeneratePreSignedURL(timeoutDuration, id);
            return Ok(url);
        }

        private string GeneratePreSignedURL(double duration, string objectKey)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = bucketName,
                Key = objectKey,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddHours(duration),
                ContentType = "application/octet-stream"
            };

            string url = s3Client.GetPreSignedURL(request);
            return url;
        }
    }
}