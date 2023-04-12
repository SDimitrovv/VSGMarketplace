using Microsoft.Extensions.DependencyInjection;
using VSGMarketplace.Application.Helpers;
using VSGMarketplace.Application.Models.ItemModels.Interfaces;
using VSGMarketplace.Application.Models.OrderModels.Interfaces;
using VSGMarketplace.Infrastructure.Context;
using VSGMarketplace.Infrastructure.Repositories;

namespace VSGMarketplace.Infrastructure.Configurations
{
    public static class InfrastructureConfiguration
    {
        public static IServiceCollection AddInfrastructureConfiguration(this IServiceCollection services)
        {
            services.AddScoped<IDapperContext, DapperContext>();
            services.AddScoped<IItemRepository, ItemRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();

            return services;
        }   

    }
}
