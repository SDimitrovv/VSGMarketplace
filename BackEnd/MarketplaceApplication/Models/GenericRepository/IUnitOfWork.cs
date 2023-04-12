using System.Data;

namespace MarketplaceApplication.Models.GenericRepository;

public interface IUnitOfWork : IDisposable
{
    IDbConnection Connection { get; }
}