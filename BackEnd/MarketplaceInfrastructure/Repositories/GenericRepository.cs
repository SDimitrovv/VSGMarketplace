using MarketplaceApplication.Models.GenericRepository;
using MarketplaceDomain.Entities;
using System.Data;
using Dapper;

namespace MarketplaceInfrastructure.Repositories
{
    public class GenericRepository<T> : IGenericRepository<T> where T : BaseEntity
    {
        private readonly IUnitOfWork _unitOfWork;

        public GenericRepository(IUnitOfWork unitOfWork)
        {
                _unitOfWork = unitOfWork;
        }

        public IDbConnection Connection => _unitOfWork.Connection;

        public IDbTransaction Transaction => _unitOfWork.Transaction;

        public async Task<IEnumerable<T>> GetAll()
        {
            var collection = await Connection.GetListAsync<T>();

            return collection;
        }

        public async Task<T> GetByID(int id)
        {
            var entity = await Connection.GetAsync<T>(id);

            return entity;
        }

        public async Task<int> Create(T entity)
        {
            var recordId = (int)await Connection.InsertAsync<T>(entity);

            return recordId;
        }

        public async Task Update(T entity)
        {
            await Connection.UpdateAsync<T>(entity);
        }

        public async Task Delete(int id)
        {
            await Connection.DeleteAsync<T>(id);
        }
    }
}
