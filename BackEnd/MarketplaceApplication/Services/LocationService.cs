using MarketplaceApplication.Models.LocationModels.Interfaces;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository _repository;

        public LocationService(ILocationRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Location>> GetLocations()
        {
            var locations = await _repository.GetAll();

            return locations;
        }
    }
}
