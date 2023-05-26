using AutoMapper;
using MarketplaceApplication.Models.LocationModels.DTOs;
using MarketplaceApplication.Models.LocationModels.Interfaces;

namespace MarketplaceApplication.Services
{
    public class LocationService : ILocationService
    {
        private readonly ILocationRepository _repository;
        private readonly IMapper _mapper;

        public LocationService(
            ILocationRepository repository, 
            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GetAllLocationModel>> GetLocations()
        {
            var locationsFromDb = await _repository.GetAll();
            var locationsModel = _mapper.Map<IEnumerable<GetAllLocationModel>>(locationsFromDb);

            return locationsModel;
        }
    }
}
