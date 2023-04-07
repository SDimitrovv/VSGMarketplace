using MarketplaceApplication.Models.GenericRepository;

namespace MarketplaceInfrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T>
    {
        public Task<IEnumerable<T>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<T> GetByID(int id)
        {
            throw new NotImplementedException();
        }

        public Task<int> Create(T entity)
        {
            throw new NotImplementedException();
        }

        public Task Update(T entity)
        {
            throw new NotImplementedException();
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
