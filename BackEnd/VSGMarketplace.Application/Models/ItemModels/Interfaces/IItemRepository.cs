using VSGMarketplace.Application.Models.ItemModels.DTOs;

namespace VSGMarketplace.Application.Models.ItemModels.Interfaces;

public interface IItemRepository
{
    public Task<IEnumerable<ItemDTO>> GetAll();

    public Task<ItemDTO> GetById(int id);

    public Task<ItemDTO> Create(ItemDTO item);

    public Task Update(ItemDTO item);

    public Task Delete(int id);
} 