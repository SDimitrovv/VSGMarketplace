namespace MarketplaceApplication.Models.GenericRepository;

public interface IGenericRepository<T>
{
    Task<IEnumerable<T>> GetAll();

    Task<T> GetByID(int id);

    Task<int> Create(T entity);

    Task Update(T entity);

    Task Delete(int id);
}