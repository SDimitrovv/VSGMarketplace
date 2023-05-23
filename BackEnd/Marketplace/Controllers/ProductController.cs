using FluentValidation;
using MarketplaceAPI.Identity;
using MarketplaceApplication.Models.PictureModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.DTOs;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MarketplaceAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IPictureService _pictureService;
        private readonly IValidator<ProductAddModel> _productAddValidator;
        private readonly IValidator<ProductEditModel> _productEditValidator;

        public ProductController(
            IProductService productService, 
            IPictureService pictureService, 
            IValidator<ProductAddModel> productAddValidator,
            IValidator<ProductEditModel> productEditValidator)
        {
            _productService = productService;
            _pictureService = pictureService;
            _productAddValidator = productAddValidator;
            _productEditValidator = productEditValidator;
        }

        [Authorize(Policy = IdentityData.AdminUserPolicy)]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] ProductAddModel model)
        {
            await _productAddValidator.ValidateAndThrowAsync(model);

            var product = await _productService.Add(model);

            return CreatedAtAction(null, product);
        }

        [Authorize]
        [HttpGet]
        [Route("{id}")]
        public async Task<ProductGetDetailsModel> GetProductDetails(int id)
        {
            return await _productService.GetDetails(id);
        }

        [Authorize(Policy = IdentityData.AdminUserPolicy)]
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Edit(int id, ProductEditModel newProduct)
        {
            await _productEditValidator.ValidateAndThrowAsync(newProduct);

            await _productService.Update(id, newProduct);

            return Ok();
        }

        [Authorize(Policy = IdentityData.AdminUserPolicy)]
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _pictureService.DeletePicture(id);
            await _productService.Delete(id);

            return Ok();
        }

        [Authorize]
        [HttpGet]
        [Route("Marketplace")]
        public async Task<IEnumerable<ProductGetMarketplaceModel>> GetMarketplace()
        {
            return await _productService.GetMarketplace();
        }

        [Authorize(Policy = IdentityData.AdminUserPolicy)]
        [HttpGet]
        [Route("Inventory")]
        public async Task<IEnumerable<ProductGetInventoryModel>> GetInventory()
        {
            return await _productService.GetInventory();
        }
    }
}
