using AutoMapper;
using MarketplaceApplication.Models.LocationModels.DTOs;
using MarketplaceDomain.Entities;

namespace MarketplaceApplication.Helpers.AutoMapper
{
    public class LocationMapper : Profile
    {
        public LocationMapper()
        {
            CreateMap<Location, GetAllLocationModel>();
        }
    }
}
