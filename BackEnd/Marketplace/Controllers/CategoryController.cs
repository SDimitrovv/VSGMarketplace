using MarketplaceAPI.Identity;
using MarketplaceApplication.Models.CategoryModels.DTOs;
using MarketplaceApplication.Models.CategoryModels.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MarketplaceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService) => _categoryService = categoryService;

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<GetAllCategoryModel>> GetCategories()
        {
            return await _categoryService.GetCategories();
        }

        [Authorize(Policy = IdentityData.AdminUserPolicy)]
        [HttpPost]
        public async Task<IActionResult> Add(string categoryType)
        {
            var categoryId = await _categoryService.Add(categoryType);

            return CreatedAtAction(null, categoryId);
        }
    }
}
