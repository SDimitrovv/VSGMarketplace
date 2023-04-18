using MarketplaceApplication.Models.OrderModels.DTOs;
using MarketplaceApplication.Models.OrderModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.DTOs;
using Microsoft.AspNetCore.Http;
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
        [Route("{productId}")]
        public async Task<IActionResult> Add(int productId, [FromBody] AddOrderModel model)
        {
            var order = await _orderService.CreateOrder(productId, model);

            return Ok(order);
        }

    }
}
