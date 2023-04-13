﻿using MarketplaceApplication.Models.GenericRepository;
using MarketplaceApplication.Models.LocationModels.Interfaces;
using MarketplaceApplication.Models.OrderModels.Interfaces;
using MarketplaceApplication.Models.PictureModels.Interfaces;
using MarketplaceApplication.Models.ProductModels.Interfaces;
using MarketplaceInfrastructure.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace MarketplaceInfrastructure.Configurations
{
    public static class InfrastructureConfiguration
    {
        public static IServiceCollection AddInfrastructureServiceCollection(this IServiceCollection services)
        {
            services.AddScoped(typeof (IGenericRepository<>), typeof (GenericRepository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<ILocationRepository, LocationRepository>();
            services.AddScoped<IPictureRepository, PictureRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();

            return services;
        }
    }
}
