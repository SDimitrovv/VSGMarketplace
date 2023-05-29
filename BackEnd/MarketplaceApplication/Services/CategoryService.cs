using AutoMapper;
using MarketplaceApplication.Models.CategoryModels.DTOs;
using MarketplaceApplication.Models.CategoryModels.Interfaces;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;
        private readonly IMapper _mapper;

        public CategoryService(
            ICategoryRepository repository, 
            IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<GetAllCategoryModel>> GetCategories()
        {
            var categoriesFromDb = await _repository.GetAll();
            var categoriesModel = _mapper.Map<IEnumerable<GetAllCategoryModel>>(categoriesFromDb);

            return categoriesModel;
        }

        public async Task<int> Add(string type)
        {
            var addCategory = new Category()
            {
                Type = type
            };

            var categoryId = await _repository.Create(addCategory);

            return categoryId;
        }
    }
}
