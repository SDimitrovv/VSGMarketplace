using FluentValidation;
using MarketplaceApplication.Models.OrderModels.DTOs;
using MarketplaceApplication.Models.OrderModels.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MarketplaceAPI.Controllers
{
    [Authorize]
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

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AddOrderModel model)
        {
            await _addOrderValidator.ValidateAndThrowAsync(model);

            var order = await _orderService.CreateOrder(model);

            return Ok(order);
        }

        [HttpPut]
        [Route("Complete/{id}")]
        public async Task<IActionResult> EditComplete(int id)
        {
            await _orderService.UpdateComplete(id);

            return Ok();
        }

        [HttpPut]
        [Route("Reject/{id}")]
        public async Task<IActionResult> EditReject(int id)
        {
            await _orderService.UpdateReject(id);

            return Ok();
        }

        [HttpGet]
        [Route("PendingOrders")]
        public async Task<IEnumerable<PendingOrdersGetModel>> GetPendingOrders()
        {
            return await _orderService.GetPendingOrders();
        }

        [HttpGet]
        [Route("MyOrders")]
        public async Task<IEnumerable<MyOrdersGetModel>> GetMyOrders(string email)
        {
            return await _orderService.GetMyOrders(email);
        }
    }
}
