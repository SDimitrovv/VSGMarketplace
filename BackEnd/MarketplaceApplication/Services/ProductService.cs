using AutoMapper;
using MarketplaceApplication.Models.CategoryModels.Interfaces;
using MarketplaceApplication.Models.OrderModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.DTOs;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public ProductService(IProductRepository repository, ICategoryRepository categoryRepository, IMapper mapper, IOrderRepository orderRepository)
        {
            _repository = repository;
            _categoryRepository = categoryRepository;
            _mapper = mapper;
            _orderRepository = orderRepository;
        }

        public async Task<ProductAddedModel> Add(ProductAddModel model)
        {
            await ExceptionService.ThrowExceptionWhenIdNotFound(model.CategoryId, _categoryRepository);

            var product = _mapper.Map<Product>(model);

            var productId = await _repository.Create(product);

            var newProduct = _mapper.Map<ProductAddedModel>(product);
            newProduct.Id = productId;

            return newProduct;
        }

        public async Task<ProductGetDetailsModel> GetDetails(int id)
        {
            await ExceptionService.ThrowExceptionWhenIdNotFound(id, _repository);

            return await _repository.GetDetails(id);
        }

        public async Task Update(int productId, ProductEditModel newProduct)
        {
            await ExceptionService.ThrowExceptionWhenIdNotFound(productId, _repository);

            var product = _mapper.Map<Product>(newProduct);
            product.Id = productId;

            await _repository.Update(product);
        }

        public async Task Delete(int id)
        {
            await ExceptionService.ThrowExceptionWhenIdNotFound(id, _repository);

            var order = await _orderRepository.GetOrderByProductId(id);

            if (order == null)
            {
                await _repository.Delete(id);
                return;
            }

            ExceptionService.ThrowExceptionWhenOrderIsPending(order.Status);

            order.ProductId = 0;
            var updatedOrder = _mapper.Map<Order>(order);
            await _orderRepository.Update(updatedOrder);

            await _repository.Delete(id);
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
