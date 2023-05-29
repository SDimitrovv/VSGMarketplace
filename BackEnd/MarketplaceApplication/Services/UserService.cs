using MarketplaceApplication.Models.UserModels;
using Microsoft.AspNetCore.Http;

namespace MarketplaceApplication.Services
{
    public class UserService : IUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(IHttpContextAccessor httpContextAccessor) => _httpContextAccessor = httpContextAccessor;
        

        public string GetEmail(string emailClaim)
        {
            return _httpContextAccessor.HttpContext.User.FindFirst(emailClaim)?.Value;
        }
    }
}
