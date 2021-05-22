using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using server.Dto;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace server.Auth
{
    public class JwtService : IJwtService
    {
        private string JwtSecret { get; set; }
        //https://stackoverflow.com/questions/58283776/net-core-settings-the-best-practice
        public JwtService(IOptions<AppSettings> appSettings)
        {
            JwtSecret = appSettings.Value.JwtSecret;
        }

        public string GenerateToken(JwtPayloadDto empDirectoryPayload)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(JwtSecret);

            var claims = new Claim[]
            {
                new Claim(ClaimTypes.Name, empDirectoryPayload.Username),
            };
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddYears(100),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature),
                Claims = new Dictionary<string, object>
                {
                    { "userId", empDirectoryPayload.UserId }
                }
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public bool ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = GetValidationParameters();

            SecurityToken validatedToken;
            try
            {
                tokenHandler.ValidateToken(token, validationParameters, out validatedToken);
                return true; //ValidateToken throws an exception if it's not valid. Therefore, if it gets to this line, it's valid. https://stackoverflow.com/questions/50204844/how-to-validate-a-jwt-token
            }
            catch (SecurityTokenInvalidSignatureException)
            {
                return false;
            }
        }

        private TokenValidationParameters GetValidationParameters()
        {
            var tokenKey = Encoding.ASCII.GetBytes(JwtSecret);
            return new TokenValidationParameters()
            {
                ValidateLifetime = false, // Because there is no expiration in the generated token
                ValidateAudience = false, // Because there is no audiance in the generated token
                ValidateIssuer = false,   // Because there is no issuer in the generated token
                IssuerSigningKey = new SymmetricSecurityKey(tokenKey) // The same key as the one that generate the token
            };
        }
    }
}
