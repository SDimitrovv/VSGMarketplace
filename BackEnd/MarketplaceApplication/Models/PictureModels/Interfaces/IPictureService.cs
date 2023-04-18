using Microsoft.AspNetCore.Http;

namespace MarketplaceApplication.Models.PictureModels.Interfaces;

public interface IPictureService
{
    Task UploadPicture(IFormFile file, int productId);
    Task DeletePicture(int productId);
}