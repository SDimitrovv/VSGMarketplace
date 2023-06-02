using FluentValidation;
using MarketplaceAPI.Identity;
using MarketplaceApplication.Models.LendModels.DTOs;
using MarketplaceApplication.Models.LendModels.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MarketplaceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LendController : ControllerBase
    {
        private readonly ILendService _lendService;
        private readonly IValidator<AddLendModel> _addLendValidator;

        public LendController(
            ILendService lendService, 
            IValidator<AddLendModel> addLendValidator)
        {
            _lendService = lendService;
            _addLendValidator = addLendValidator;
        }

        [Authorize(Policy = IdentityData.AdminUserPolicy)]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AddLendModel model)
        {
            await _addLendValidator.ValidateAndThrowAsync(model);

            var lend = _lendService.CreateLend(model);

            return CreatedAtAction(null, lend);
        }

        [Authorize(Policy = IdentityData.AdminUserPolicy)]
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> Remove(int id)
        {
            await _lendService.ReturnItem(id);

            return Ok();
        }

        [Authorize(Policy = IdentityData.AdminUserPolicy)]
        [HttpGet]
        [Route("Lended-Items")]
        public async Task<IEnumerable<AllLendedItemsModel>> GetAllLendedItems()
        {
            return await _lendService.GetAllLendedItems();
        }

        [Authorize]
        [HttpGet]
        [Route("My-Lended-Items")]
        public async Task<IEnumerable<MyLendedItemsModel>> GetMyLendedItems()
        {
            return await _lendService.GetMyLendedItems();
        }
    }
}
