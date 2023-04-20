using MarketplaceApplication.Models.ProductModels.DTOs;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceDomain.Entities;

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
                CategoryId = model.CategoryId
            };

            var productId = await _repository.Create(product);
            product.Id = productId;

            return product;
        }

        public async Task<Product> GetForUpdate(int id)
        {
            return await _repository.GetByID(id);
        }

        public async Task Update(int productId, ProductEditModel newProduct)
        {
            var product = new Product
            {
                Id = productId,
                Code = newProduct.Code,
                FullName = newProduct.FullName,
                Price = newProduct.Price,
                Quantity = newProduct.Quantity,
                QuantityForSale = newProduct.QuantityForSale,
                Description = newProduct.Description,
                CategoryId = newProduct.CategoryId
            };

            await _repository.Update(product);
        }

        public async Task Delete(int id)
        {
            await _repository.Delete(id);
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
