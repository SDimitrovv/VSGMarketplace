using AutoMapper;
using MarketplaceApplication.Models.CategoryModels.Interfaces;
using MarketplaceApplication.Models.LocationModels.Interfaces;
using MarketplaceApplication.Models.OrderModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.DTOs;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly ILocationRepository _locationRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository productRepository, ICategoryRepository categoryRepository, ILocationRepository locationRepository, IMapper mapper, IOrderRepository orderRepository)
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
            _locationRepository = locationRepository;
            _mapper = mapper;
            _orderRepository = orderRepository;
        }

        public async Task<ProductAddedModel> Add(ProductAddModel model)
        {
            await ExceptionService.ThrowExceptionWhenIdNotFound(model.CategoryId, _categoryRepository);
            await ExceptionService.ThrowExceptionWhenIdNotFound(model.LocationId, _locationRepository);

            var product = _mapper.Map<Product>(model);

            var productId = await _productRepository.Create(product);

            var newProduct = _mapper.Map<ProductAddedModel>(product);
            newProduct.Id = productId;

            return newProduct;
        }

        public async Task<ProductGetDetailsModel> GetDetails(int id)
        {
            await ExceptionService.ThrowExceptionWhenIdNotFound(id, _productRepository);

            return await _productRepository.GetDetails(id);
        }

        public async Task Update(int productId, ProductEditModel newProduct)
        {
            await ExceptionService.ThrowExceptionWhenIdNotFound(productId, _productRepository);
            await ExceptionService.ThrowExceptionWhenIdNotFound(newProduct.CategoryId, _categoryRepository);
            await ExceptionService.ThrowExceptionWhenIdNotFound(newProduct.LocationId, _locationRepository);

            var product = _mapper.Map<Product>(newProduct);
            product.Id = productId;

            await _productRepository.Update(product);
        }

        public async Task Delete(int id)
        {
            await ExceptionService.ThrowExceptionWhenIdNotFound(id, _productRepository);

            var order = await _orderRepository.GetOrderByProductId(id);

            if (order == null)
            {
                await _productRepository.Delete(id);
                return;
            }

            ExceptionService.ThrowExceptionWhenOrderIsPending(order.Status);

            order.ProductId = 0;
            var updatedOrder = _mapper.Map<Order>(order);
            await _orderRepository.Update(updatedOrder);

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
