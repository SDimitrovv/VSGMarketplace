using Microsoft.AspNetCore.Mvc;
using VSGMarketplace.Application.Models.ItemModels.DTOs;
using VSGMarketplace.Application.Models.ItemModels.Interfaces;

namespace VSGMarketplace.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemController(IItemService itemService) =>_itemService = itemService;
        

        [HttpGet]
        public async Task<IActionResult> GetAllItems()
        {
            var items = await _itemService.GetAll();

            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemById(int id)
        {
            var item = await _itemService.GetById(id);
            if (item == null)
                return NotFound();
            
            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] CreateItemDto item)
        {
            var createdItem = await _itemService.Create(item);

            return CreatedAtAction(nameof(GetItemById), new { id = createdItem.ItemId }, createdItem);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, [FromBody] GetItemDto item)
        {
            await _itemService.Update(id, item);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            await _itemService.Delete(id);

            return NoContent();
        }

    }
}
