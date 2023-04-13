using MarketplaceApplication.Models.GenericRepository;
using MarketplaceApplication.Models.LocationModels.Interfaces;
using MarketplaceDomain.Entities;

namespace MarketplaceInfrastructure.Repositories
{
    public class LocationRepository : GenericRepository<Location>, ILocationRepository
    {
        public LocationRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }
}
