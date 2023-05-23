using MarketplaceApplication.Models.LocationModels.DTOs;
using MarketplaceApplication.Models.LocationModels.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MarketplaceAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService) => _locationService = locationService;

        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<GetAllLocationModel>> GetLocations()
        {
            return await _locationService.GetLocations();
        }
    }
}
