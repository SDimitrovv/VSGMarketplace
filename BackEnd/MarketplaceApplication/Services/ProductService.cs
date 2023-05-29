 using AutoMapper;
using MarketplaceApplication.Models.CategoryModels.Interfaces;
using MarketplaceApplication.Models.ExceptionModels;
using MarketplaceApplication.Models.LocationModels.Interfaces;
using MarketplaceApplication.Models.OrderModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.DTOs;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceDomain.Entities;
using System.Net;
using System.Reflection;

namespace MarketplaceApplication.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly ILocationRepository _locationRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public ProductService(
            IProductRepository productRepository, 
            ICategoryRepository categoryRepository, 
            ILocationRepository locationRepository, 
            IMapper mapper, 
            IOrderRepository orderRepository)
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
            _locationRepository = locationRepository;
            _mapper = mapper;
            _orderRepository = orderRepository;
        }

        public async Task<ProductAddedModel> Add(ProductAddModel model)
        {
            var productFromDb = await _productRepository.GetByCode(model.Code);
            if (productFromDb?.Code == model.Code) throw new HttpException("Code already exists!", HttpStatusCode.BadRequest);

            var category = await _categoryRepository.GetById(model.CategoryId);
            if (category == null) throw new HttpException("Category id not found!", HttpStatusCode.NotFound);

            var location = await _locationRepository.GetById(model.LocationId);
            if (location == null) throw new HttpException("Location id not found!", HttpStatusCode.NotFound);

            var product = _mapper.Map<Product>(model);

            var productId = await _productRepository.Create(product);

            var newProduct = _mapper.Map<ProductAddedModel>(product);
            newProduct.Id = productId;

            return newProduct;
        }

        public async Task<ProductGetDetailsModel> GetDetails(int id)
        {
            var product = await _productRepository.GetDetails(id);
            if (product == null) throw new HttpException("Product id not found!", HttpStatusCode.NotFound);

            return product;
        }

        public async Task Update(int productId, ProductEditModel newProduct)
        {
            var productFromDb = await _productRepository.GetByCode(newProduct.Code);
            if (productFromDb?.Code == newProduct.Code && productFromDb.Id != productId) throw new HttpException("Code already exists!", HttpStatusCode.BadRequest);

            var product = await _productRepository.GetById(productId);
            if (product == null) throw new HttpException("Product id not found!", HttpStatusCode.NotFound);

            var category = await _categoryRepository.GetById(newProduct.CategoryId);
            if (category == null) throw new HttpException("Category id not found!", HttpStatusCode.NotFound);

            var location = await _locationRepository.GetById(newProduct.LocationId);
            if (location == null) throw new HttpException("Location id not found!", HttpStatusCode.NotFound);

            var editedProduct = _mapper.Map<Product>(newProduct);
            editedProduct.Id = productId;

            await _productRepository.Update(editedProduct);
        }

        public async Task Delete(int id)
        {
            var product = await _productRepository.GetById(id);
            if (product == null) throw new HttpException("Product id not found!", HttpStatusCode.NotFound);

            var order = await _orderRepository.GetOrderByProductId(id);

            if (order == null)
            {
                await _productRepository.Delete(id);
                return;
            }

            if (order.Status == "Pending")
            {
                throw new HttpException("Order is pending!", HttpStatusCode.BadRequest);
            }

            await _productRepository.Delete(id);
        }

        public async Task<IEnumerable<ProductGetInventoryModel>> GetInventory()
        {
            return await _productRepository.GetInventory();
        }

        public async Task<IEnumerable<ProductGetMarketplaceModel>> GetMarketplace()
        {
            return await _productRepository.GetMarketplace();
        }

    }
}
