using MarketplaceApplication.Models.CategoryModels.Interfaces;
using MarketplaceDomain.Entities;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace MarketplaceApplication.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;
        private readonly IConfiguration _config;
        private const string CacheKey = "categories";
        private static ConnectionMultiplexer _redis;
        private readonly IDatabase _db;
        public CategoryService(ICategoryRepository repository, IConfiguration config)
        {
            _repository = repository;
            _config = config;
            _redis = ConnectionMultiplexer.Connect(_config.GetConnectionString("RedisConnection"));
            _db = _redis.GetDatabase();
        }

        public async Task<IEnumerable<Category>> GetCategories()
        {
            //var cachedData = await _db.StringGetAsync(CacheKey);
            //if (!String.IsNullOrEmpty(cachedData))
            //{
            //    var categories = JsonConvert.DeserializeObject<IEnumerable<Category>>(cachedData);
            //    return categories;
            //}

            var categoriesFromDb = await _repository.GetAll();

            //await _db.StringSetAsync(CacheKey, JsonConvert.SerializeObject(categoriesFromDb));

            return categoriesFromDb;
        }
    }
}
