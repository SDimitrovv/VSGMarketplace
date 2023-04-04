using VSGMarketplace.Application.Models.ItemModels.DTOs;
using VSGMarketplace.Application.Models.ItemModels.Interfaces;

namespace VSGMarketplace.Application.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;

        public ItemService(IItemRepository itemRepository) => _itemRepository = itemRepository;

        public async Task<IEnumerable<GetItemDto>> GetAll()
        {
            var items = await _itemRepository.GetAll();
            return items;
        }

        public async Task<GetItemDto> GetById(int id)
        {
            var item = await _itemRepository.GetById(id);
            return item;
        }

        public async Task<CreateItemDto> Create(CreateItemDto item)
        {
            var createdItem = await _itemRepository.Create(item);
            return createdItem;
        }

        public async Task Update(GetItemDto item)
        {
            await _itemRepository.Update(item);
        }

        public async Task Delete(int id)
        {
            await _itemRepository.Delete(id);
        }
    }
}
