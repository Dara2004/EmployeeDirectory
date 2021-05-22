using server.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Auth
{
    public interface IJwtService
    {
        string GenerateToken(JwtPayloadDto payload);
        bool ValidateToken(string jwt);
    }
}
