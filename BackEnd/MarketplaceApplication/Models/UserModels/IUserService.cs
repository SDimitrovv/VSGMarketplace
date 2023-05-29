namespace MarketplaceApplication.Models.UserModels;

public interface IUserService
{
    string GetEmail(string emailClaim);
}