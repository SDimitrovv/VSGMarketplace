using MarketplaceApplication.Models.ProductModels.DTOs;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceApplication.Serivces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MarketplaceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService) => _productService = productService;



        [HttpGet]
        [Route("Merketplace")]
        public async Task<IEnumerable<ProductGetMarketplaceModel>> GetMarketplace()
        {
            return await _productService.GetMarketplace();
        }

        [HttpGet]
        [Route("Details/{id}")]
        public async Task<ProductGetDetailsModel> GetProductDetails(int id)
        {
            return await _productService.GetDetails(id);
        }

        [HttpGet]
        [Route("Inventory")]
        public async Task<IEnumerable<ProductGetInventoryModel>> GetInventory()
        {
            return await _productService.GetInventory();
        }
    }
}
