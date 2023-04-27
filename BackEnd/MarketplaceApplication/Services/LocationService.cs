using MarketplaceApplication.Models.LocationModels.Interfaces;

namespace MarketplaceApplication.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository _repository;

        public LocationService(ILocationRepository repository)
        {
            _repository = repository;
        }

    }
}
