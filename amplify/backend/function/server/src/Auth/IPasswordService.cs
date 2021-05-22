using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Auth
{
    public interface IPasswordService
    {
        string GenerateHash(string password, string salt);
        string GenerateSalt();
    }
}
