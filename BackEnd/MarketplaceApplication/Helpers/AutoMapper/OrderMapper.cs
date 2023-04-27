using AutoMapper;
using MarketplaceApplication.Models.OrderModels.DTOs;
using MarketplaceDomain.Entities;
using MarketplaceDomain.Enums;

namespace MarketplaceApplication.Helpers.AutoMapper
{
    public class OrderMapper : Profile
    {
        public OrderMapper()
        {
            CreateMap<AddOrderModel, Order>()
                .ForMember(o => o.Date, opt => opt.MapFrom(src => DateTime.Now.ToString("yyyy-MM-dd HH:mm")))
                .ForMember(o => o.Status, opt => opt.MapFrom(src => Status.Pending.ToString()));

            CreateMap<Order, AddedOrderModel>();
        }
    }
}
