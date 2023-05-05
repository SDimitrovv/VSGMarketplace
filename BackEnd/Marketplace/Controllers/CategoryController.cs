using MarketplaceApplication.Models.CategoryModels.DTOs;
using MarketplaceApplication.Models.CategoryModels.Interfaces;
using MarketplaceDomain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MarketplaceAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService) => _categoryService = categoryService;

        [HttpGet]
        public async Task<IEnumerable<GetAllCategoryModel>> GetCategories()
        {
            return await _categoryService.GetCategories();
        }

    }
}
