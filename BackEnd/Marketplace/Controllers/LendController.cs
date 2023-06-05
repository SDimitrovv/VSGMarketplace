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

            var lend = await _lendService.CreateLend(model);

            return CreatedAtAction(null, lend);
        }

        [Authorize(Policy = IdentityData.AdminUserPolicy)]
        [HttpPut]
        [Route("Return/{id}")]
        public async Task<IActionResult> Return(int id)
        {
            await _lendService.ReturnItem(id);

            return Ok();
        }

        [Authorize(Policy = IdentityData.AdminUserPolicy)]
        [HttpGet]
        [Route("Lent-Items")]
        public async Task<IEnumerable<AllLentItemsModel>> GetAllLentItems()
        {
            return await _lendService.GetAllLentItems();
        }

        [Authorize]
        [HttpGet]
        [Route("My-Lent-Items")]
        public async Task<IEnumerable<MyLentItemsModel>> GetMyLentItems()
        {
            return await _lendService.GetMyLentItems();
        }
    }
}
