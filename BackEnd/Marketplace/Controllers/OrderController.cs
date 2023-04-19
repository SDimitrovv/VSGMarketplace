using MarketplaceApplication.Models.OrderModels.DTOs;
using MarketplaceApplication.Models.OrderModels.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace MarketplaceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService) => _orderService = orderService;

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

        [HttpPost]
        public async Task<IActionResult> Add([FromBody] AddOrderModel model)
        {
            var order = await _orderService.CreateOrder(model);

            return Ok(order);
        }

        [HttpPut]
        [Route("Complete{id}")]
        public async Task EditComplete(int id)
        {
            await _orderService.UpdateComplete(id);
        }

        [HttpPut]
        [Route("Reject{id}")]
        public async Task EditReject(int id)
        {
            await _orderService.UpdateReject(id);
        }
    }
}
