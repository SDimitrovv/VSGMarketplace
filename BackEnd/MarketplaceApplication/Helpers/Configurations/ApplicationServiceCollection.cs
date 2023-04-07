using MarketplaceApplication.Models.OrderModels.Interfaces;
using MarketplaceApplication.Models.PictureModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceApplication.Serivces;
using Microsoft.Extensions.DependencyInjection;

namespace MarketplaceApplication.Helpers.Configurations
{
    public static class ApplicationServiceCollection
    {
        public static IServiceCollection AddApplicationServiceCollection(this IServiceCollection services)
        {
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IPictureService, PictureService>();
            services.AddScoped<IOrderService, OrderService>();

            return services;
        }
    }
}
