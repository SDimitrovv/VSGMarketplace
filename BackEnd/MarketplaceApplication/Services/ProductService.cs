using AutoMapper;
using MarketplaceApplication.Models.CategoryModels.Interfaces;
using MarketplaceApplication.Models.ExceptionModels;
using MarketplaceApplication.Models.LocationModels.Interfaces;
using MarketplaceApplication.Models.OrderModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.DTOs;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceDomain.Entities;
using System.Net;

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

        public async Task<ProductAddedModel> Add(ProductAddModel addModel)
        {
            var productFromDb = await _productRepository.GetByCode(addModel.Code, addModel.LocationId);
            if (productFromDb?.Code == addModel.Code && productFromDb?.LocationId == addModel.LocationId) 
                throw new HttpException("Code already exists!", HttpStatusCode.BadRequest);

            var category = await _categoryRepository.GetById(addModel.CategoryId);
            if (category == null) 
                throw new HttpException("Category id not found!", HttpStatusCode.NotFound);

            var location = await _locationRepository.GetById(addModel.LocationId);
            if (location == null) 
                throw new HttpException("Location id not found!", HttpStatusCode.NotFound);

            var product = _mapper.Map<Product>(addModel);

            var productId = await _productRepository.Create(product);

            var newProduct = _mapper.Map<ProductAddedModel>(product);
            newProduct.Id = productId;

            return newProduct;
        }

        public async Task<ProductGetDetailsModel> GetDetails(int id)
        {
            var product = await _productRepository.GetDetails(id);
            if (product == null) 
                throw new HttpException("Product id not found!", HttpStatusCode.NotFound);

            return product;
        }

        public async Task Update(int productId, ProductEditModel editModel)
        {
            var productFromDb = await _productRepository.GetByCode(editModel.Code, editModel.LocationId);
            if (productFromDb?.Code == editModel.Code && productFromDb.Id != productId && productFromDb?.LocationId == editModel.LocationId) 
                throw new HttpException("Code already exists!", HttpStatusCode.BadRequest);

            var product = await _productRepository.GetById(productId);
            if (product == null) 
                throw new HttpException("Product id not found!", HttpStatusCode.NotFound);

            var category = await _categoryRepository.GetById(editModel.CategoryId);
            if (category == null)
                throw new HttpException("Category id not found!", HttpStatusCode.NotFound);

            var location = await _locationRepository.GetById(editModel.LocationId);
            if (location == null) 
                throw new HttpException("Location id not found!", HttpStatusCode.NotFound);

            var editedProduct = _mapper.Map<Product>(editModel);
            editedProduct.Id = productId;

            await _productRepository.Update(editedProduct);
        }

        public async Task Delete(int id)
        {
            var product = await _productRepository.GetById(id);
            if (product == null) 
                throw new HttpException("Product id not found!", HttpStatusCode.NotFound);

            var order = await _orderRepository.GetOrderByProductId(id);

            if (order?.Status == "Pending")
                throw new HttpException("Order is pending!", HttpStatusCode.BadRequest);
            
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
