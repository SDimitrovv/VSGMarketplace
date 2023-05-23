using MarketplaceApplication.Models.LocationModels.DTOs;

namespace MarketplaceApplication.Models.LocationModels.Interfaces;

public interface ILocationService
{
    public Task<IEnumerable<GetAllLocationModel>> GetLocations();
}