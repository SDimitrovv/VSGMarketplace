using AutoMapper;
using MarketplaceApplication.Models.LendModels.DTOs;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Helpers.AutoMapper
{
    public class LendMapper : Profile
    {
        public LendMapper()
        {
            CreateMap<AddLendModel, Lend>()
                .ForMember(l => l.StartDate, opt => opt
                    .MapFrom(src => DateTime.Now.ToString("yyyy-MM-dd HH:mm")));

            CreateMap<Lend, AddedLendModel>();
        }
    }
}
