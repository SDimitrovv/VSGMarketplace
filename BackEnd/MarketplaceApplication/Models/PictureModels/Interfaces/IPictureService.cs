using Microsoft.AspNetCore.Http;

namespace MarketplaceApplication.Models.PictureModels.Interfaces;

public interface IPictureService
{
    Task<string> UploadPicture(IFormFile file, int productId);
    Task DeletePicture(int productId);
}