using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VSGMarketplace.Application.Models.ItemModels.DTOs;
using VSGMarketplace.Application.Models.ItemModels.Interfaces;

namespace VSGMarketplace.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _itemRepository;

        public ItemController(IItemRepository itemRepository) => _itemRepository = itemRepository;

        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            var items = await _itemRepository.GetAll();

            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemById(int id)
        {
            var item = await _itemRepository.GetById(id);
            if (item is null) 
                return NotFound();

            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem([FromBody] CreateItemDto item)
        {
            var createItem = await _itemRepository.Create(item);

            return CreatedAtRoute("ItemId", new { id = createItem.ItemId }, createItem);
        }

    }
}
