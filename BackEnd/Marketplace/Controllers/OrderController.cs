using FluentValidation;
using MarketplaceAPI.Identity;
using MarketplaceApplication.Models.OrderModels.DTOs;
using MarketplaceApplication.Models.OrderModels.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MarketplaceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IValidator<AddOrderModel> _addOrderValidator;

        public OrderController(IOrderService orderService, IValidator<AddOrderModel> addOrderValidator)
        {
            _orderService = orderService;
            _addOrderValidator = addOrderValidator;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AddOrderModel model)
        {
            await _addOrderValidator.ValidateAndThrowAsync(model);

            var order = await _orderService.CreateOrder(model);

            return CreatedAtAction(null, order);
        }

        [Authorize(Policy = IdentityData.AdminUserPolicy)]
        [HttpPut]
        [Route("Complete/{id}")]
        public async Task<IActionResult> EditComplete(int id)
        {
            await _orderService.UpdateComplete(id);

            return Ok();
        }

        [Authorize]
        [HttpPut]
        [Route("Reject/{id}")]
        public async Task<IActionResult> EditReject(int id)
        {
            await _orderService.UpdateReject(id);

            return Ok();
        }

        [Authorize(Policy = IdentityData.AdminUserPolicy)]
        [HttpGet]
        [Route("Pending-Orders")]
        public async Task<IEnumerable<PendingOrdersGetModel>> GetPendingOrders()
        {
            return await _orderService.GetPendingOrders();
        }

        [Authorize]
        [HttpGet]
        [Route("My-Orders")]
        public async Task<IEnumerable<MyOrdersGetModel>> GetMyOrders()
        {
            return await _orderService.GetMyOrders();
        }
    }
}
