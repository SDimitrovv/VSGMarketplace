using MarketplaceApplication.Models.GenericRepository;
using MarketplaceApplication.Models.PictureModels.Interfaces;
using MarketplaceDomain.Entities;

namespace MarketplaceInfrastructure.Repositories
{
    public class PictureRepository : GenericRepository<Picture>, IPictureRepository
    {
        public PictureRepository(IUnitOfWork unitOfWork) : base(unitOfWork)
        {
        }
    }
}
