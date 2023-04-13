using MarketplaceApplication.Models.LocationModels.Interfaces;
using MarketplaceApplication.Models.OrderModels.Interfaces;
using MarketplaceApplication.Models.PictureModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceApplication.Services;
using Microsoft.Extensions.DependencyInjection;

namespace MarketplaceApplication.Helpers.Configurations
{
    public static class ApplicationServiceCollection
    {
        public static IServiceCollection AddApplicationServiceCollection(this IServiceCollection services)
        {
            services.AddScoped<ILocationService, LocationService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IPictureService, PictureService>();
            services.AddScoped<IOrderService, OrderService>();

            return services;
        }
    }
}
