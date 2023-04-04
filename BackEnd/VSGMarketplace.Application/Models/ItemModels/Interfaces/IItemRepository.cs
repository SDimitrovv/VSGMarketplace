using VSGMarketplace.Application.Models.ItemModels.DTOs;

namespace VSGMarketplace.Application.Models.ItemModels.Interfaces;

public interface IItemRepository
{
    public Task<IEnumerable<GetItemDto>> GetAll();

    public Task<GetItemDto> GetById(int id);

    public Task<CreateItemDto> Create(CreateItemDto item);

    public Task Update(GetItemDto item);

    public Task Delete(int id);
} 