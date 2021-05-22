using Microsoft.AspNetCore.Mvc;
using server.Auth;
using server.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private IAuthService AuthService { get; set; }
        public LoginController(IAuthService authenticationService) {
            AuthService = authenticationService;
        }

        // POST: api/Login
        [HttpPost]
        public async Task<ActionResult<string>> Login([FromBody] LoginDto loginDto)
        {
            var username = loginDto.Username;
            var password = loginDto.Password;

            // Authenticate, if use is authenticated, return a jwt
            var jwt = await AuthService.AuthenticateAsync(username, password);

            // Authorize
            if (jwt != null)
            {
                return Ok(jwt);
            }
            return Unauthorized();
        }
    }
}
