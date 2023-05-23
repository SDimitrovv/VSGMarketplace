using AutoMapper;
using MarketplaceApplication.Models.CategoryModels.DTOs;
using MarketplaceApplication.Models.CategoryModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.DTOs;
using MarketplaceDomain.Entities;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using StackExchange.Redis;

namespace MarketplaceApplication.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;
        //private const string CacheKey = "categories";
        //private static ConnectionMultiplexer _redis;
        //private readonly IDatabase _db;
        public CategoryService(ICategoryRepository repository, IMapper mapper, IConfiguration config)
        {
            _repository = repository;
            _mapper = mapper;
            _config = config;
            //_redis = ConnectionMultiplexer.Connect(_config.GetConnectionString("RedisConnection"));
            //_db = _redis.GetDatabase();
        }

        public async Task<IEnumerable<GetAllCategoryModel>> GetCategories()
        {
            //var cachedData = await _db.StringGetAsync(CacheKey);
            //if (!String.IsNullOrEmpty(cachedData))
            //{
            //    var categories = JsonConvert.DeserializeObject<IEnumerable<Category>>(cachedData);
            //    return categories;
            //}

            var categoriesFromDb = await _repository.GetAll();
            var categoriesModel = _mapper.Map<IEnumerable<GetAllCategoryModel>>(categoriesFromDb);

            //await _db.StringSetAsync(CacheKey, JsonConvert.SerializeObject(categoriesFromDb));

            return categoriesModel;
        }

        public async Task<int> Add(string type)
        {
            var addCategory = new Category()
            {
                Type = type
            };

            var categoryId = await _repository.Create(addCategory);

            // await _db.KeyDeleteAsync(CacheKey);

            return categoryId;
        }
    }
}
