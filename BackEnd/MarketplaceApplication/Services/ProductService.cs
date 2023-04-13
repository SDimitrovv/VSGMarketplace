using MarketplaceApplication.Models.ProductModels.DTOs;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceDomain.Entities;
using MarketplaceDomain.Enums;

namespace MarketplaceApplication.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository)
        {
                _repository = repository;
        }

        public async Task<Product> Add(ProductAddModel model)
        {
            var product = new Product
            {
                Code = model.Code,
                FullName = model.FullName,
                Price = model.Price,
                Quantity = model.Quantity,
                QuantityForSale = model.QuantityForSale,
                Description = model.Description,
                Location = (Location)model.Location,
                Category = (Category)model.Category
            };

            var productId = await _repository.Create(product);
            product.Id = productId;

            return product;
        }

        public async Task<ProductGetDetailsModel> GetDetails(int id)
        {
            return await _repository.GetDetails(id);
        }

        public async Task<IEnumerable<ProductGetInventoryModel>> GetInventory()
        {
            return await _repository.GetInventory();
        }

        public async Task<IEnumerable<ProductGetMarketplaceModel>> GetMarketplace()
        {
            return await _repository.GetMarketplace();
        }

    }
}
