using System.Threading.Tasks;

namespace server.Auth
{
    public interface IAuthService
    {
        //returns a JWT after user is authenticated
        Task<string> AuthenticateAsync(string username, string password);
        bool AuthorizeAccess(string token);
    }
}