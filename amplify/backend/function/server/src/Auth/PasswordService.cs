using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace server.Auth
{
    public class PasswordService : IPasswordService
    {
        private string Secret { get; set; }
        public PasswordService(IOptions<AppSettings> appSettings)
        {
            Secret = appSettings.Value.JwtSecret;
        }
        public string GenerateSalt()
        {
            return System.Guid.NewGuid().ToString().Substring(0, 10);
        }

        string GenerateHash(string password, string salt)
        {
            throw new NotImplementedException();
        }

        string IPasswordService.GenerateHash(string password, string salt)
        {
            var key = Encoding.ASCII.GetBytes(Secret);
            var algorithm = new HMACSHA256
            {
                Key = key,
            };

            var buffer = Encoding.ASCII.GetBytes(password + salt);

            var hashBuffer = algorithm.ComputeHash(buffer);
            string hash = Encoding.ASCII.GetString(hashBuffer);
            return hash;
        }
    }
}
