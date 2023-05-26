using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MarketplaceApplication.Models.ExceptionModels;
using MarketplaceApplication.Models.PictureModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceDomain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Net;

namespace MarketplaceApplication.Services
{
    public class PictureService : IPictureService
    {
        private readonly IPictureRepository _pictureRepository;
        private readonly IProductRepository _productRepository;
        private readonly Cloudinary _cloudinary;

        public PictureService(
            IPictureRepository pictureRepository, 
            IProductRepository productRepository, 
            IConfiguration configuration)
        {
            _pictureRepository = pictureRepository;
            _productRepository = productRepository;

            var account = new Account(
                configuration["Cloudinary:CloudName"],
                configuration["Cloudinary:ApiKey"],
                configuration["Cloudinary:ApiSecret"]
            );

            _cloudinary = new Cloudinary(account);
        }

        public async Task<string> UploadPicture(IFormFile file, int productId)
        {
            var product = await _productRepository.GetById(productId);
            if (product == null) throw new HttpException("Product id not found!", HttpStatusCode.NotFound);

            byte[] bytes;
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                bytes = stream.ToArray();
            }

            var uploadParams = new ImageUploadParams
            {
                Folder = "Marketplace",
                File = new FileDescription(file.FileName, new MemoryStream(bytes)),
                PublicId = $"product_{productId}_picture_{Guid.NewGuid()}"
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            var picture = new Picture
            {
                ProductId = productId,
                ImagePublicId = uploadResult.PublicId,
                ImageUrl = uploadResult.SecureUrl.ToString()
            };

            await _pictureRepository.Create(picture);

            return picture.ImageUrl;
        }

        public async Task DeletePicture(int productId)
        {
            var product = await _productRepository.GetById(productId);
            if (product == null) throw new HttpException("Product id not found!", HttpStatusCode.NotFound);

            var pictureForDelete = await _pictureRepository.GetPicture(productId);

            if (pictureForDelete != null)
            {
                await _cloudinary.DeleteResourcesAsync(pictureForDelete.ImagePublicId);

                await _pictureRepository.Delete(pictureForDelete.Id);
            }
        }
    }
}
