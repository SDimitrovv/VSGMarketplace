using Dapper;
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

        public async Task<Picture> GetPicture(int productId)
        {
            var query = @"SELECT Id, ImageUrl, ImagePublicId
                          FROM Pictures 
                          WHERE ProductId = @productId";

            return await Connection.QueryFirstOrDefaultAsync<Picture>(query, new { productId });
        }
    }
}
