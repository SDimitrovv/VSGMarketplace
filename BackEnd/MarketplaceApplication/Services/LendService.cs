using AutoMapper;
using MarketplaceApplication.Models.ExceptionModels;
using MarketplaceApplication.Models.LendModels.DTOs;
using MarketplaceApplication.Models.LendModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceApplication.Models.UserModels;
using MarketplaceDomain.Entities;
using System.Net;

namespace MarketplaceApplication.Services
{
    public class LendService : ILendService
    {
        private readonly ILendRepository _lendRepository;
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IUserService _userService;

        public LendService(
            ILendRepository lendRepository,
            IProductRepository productRepository,
            IMapper mapper,
            IUserService userService)
        {
            _lendRepository = lendRepository;
            _productRepository = productRepository;
            _mapper = mapper;
            _userService = userService;
        }

        public async Task<AddedLendModel> CreateLend(AddLendModel model)
        {
            var product = await _productRepository.GetById(model.ProductId);
            if (product == null)
                throw new HttpException("Product id not found!", HttpStatusCode.NotFound);

            if (model.Quantity > product.QuantityForLend)
                throw new HttpException("Not enough quantity for lend!", HttpStatusCode.BadRequest);

            var lend = _mapper.Map<Lend>(model);
            lend.ProductFullName = product.FullName;
            lend.ProductCode = product.Code;

            var lendId = await _lendRepository.Create(lend);
            lend.Id = lendId;

            product.Quantity -= model.Quantity;
            product.QuantityForLend -= model.Quantity;
            await _productRepository.Update(product);

            var newLend = _mapper.Map<AddedLendModel>(lend);

            return newLend;
        }

        public async Task ReturnItem(int id)
        {
            var lend = await _lendRepository.GetById(id);
            if (lend == null)
                throw new HttpException("Lend id not found!", HttpStatusCode.NotFound);

            //Maybe chek if endDate is alredy returned 

            lend.EndDate = DateTime.Now.ToString("yyyy-MM-dd HH:mm");

            await _lendRepository.Update(lend);

            var product = await _productRepository.GetById(lend.ProductId);

            product.Quantity += lend.Quantity;
            product.QuantityForLend += lend.Quantity;
            await _productRepository.Update(product);
        }

        public async Task<IEnumerable<AllLentItemsModel>> GetAllLentItems()
        {
            var lends = await _lendRepository.GetAll();

            var allLendedItems = lends
                .GroupBy(l => l.Email)
                .Select(g => new AllLentItemsModel
                {
                    Email = g.Key,
                    LentItems = g
                        .Select(l => new LentItemsPerUserModel
                        {
                            Id = l.Id,
                            StartDate = l.StartDate,
                            EndDate = l.EndDate,
                            Quantity = l.Quantity,
                            ProductId = l.ProductId,
                            ProductCode = l.ProductCode,
                            ProductFullName = l.ProductFullName
                        })
                });

            return allLendedItems;
        }

        public async Task<IEnumerable<MyLentItemsModel>> GetMyLentItems()
        {
            var userEmail = _userService.GetEmail("preferred_username");

            return await _lendRepository.GetMyLentItems(userEmail);
        }


    }
}
