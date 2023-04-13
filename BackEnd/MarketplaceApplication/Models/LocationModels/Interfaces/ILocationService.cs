using MarketplaceApplication.Models.ProductModels.DTOs;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Models.LocationModels.Interfaces;

public interface ILocationService
{
    public Task<IEnumerable<Location>> GetLocations();

}