using server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Dto;

namespace server.Auth
{
    public class AuthService : IAuthService
    {
        private IPasswordService PasswordService { get; set; }
        private IJwtService JwtService { get; set; }
        private EmployeeDirectoryContext _context { get; set; }
        public AuthService(EmployeeDirectoryContext context, IPasswordService passwordService, IJwtService jwtService)
        {
            _context = context;
            PasswordService = passwordService;
            JwtService = jwtService;
        }
        public async Task<string> AuthenticateAsync(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
            {
                return null;
            }

            var salt = user.Salt;
            var hash = PasswordService.GenerateHash(password, salt);

            if (user.Hash != hash)
            {
                return null;
            }

            //generated hash matches the hash stored in db, time to make a jwt payload
            var payload = new JwtPayloadDto
            {
                UserId = user.UserId,
                Username = username,
                Email = user.Email
            };

            var jwt = JwtService.GenerateToken(payload);
            return jwt;
        }

        public bool AuthorizeAccess(string token)
        {
            return JwtService.ValidateToken(token);
        }
    }
}
