using MarketplaceAPI.Identity;
using MarketplaceAPI.Swagger;
using MarketplaceApplication.Helpers.Configurations;
using MarketplaceApplication.Helpers.Middleware;
using MarketplaceInfrastructure.Configurations;
using MarketplaceInfrastructure.Migrations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using NLog.Web;
using Swashbuckle.AspNetCore.SwaggerGen;

var builder = WebApplication.CreateBuilder(args);

builder.Host.ConfigureLogging(logging =>
    {
        logging.ClearProviders();
    })
    .UseNLog();

//builder.Services.AddStackExchangeRedisCache(options =>
//{
//    options.Configuration = builder.Configuration["ConnectionString:Redis"];
//    options.InstanceName = "SampleInstance";
//});   

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(x =>
{
    x.Audience = builder.Configuration["JwtSettings:Audience"];
    x.Authority = builder.Configuration["JwtSettings:Authority"];
});
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(IdentityData.AdminUserPolicy, p => p.RequireClaim(IdentityData.AdminUserClaim, "f2123818-3d51-4fe4-990b-b072a80da143"));
});

builder.Services.AddControllers();

builder.Services.AddApplicationServiceCollection();
builder.Services.AddInfrastructureServiceCollection();
builder.Services.AddMigrationsConfigurations();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddTransient<IConfigureOptions<SwaggerGenOptions>, ConfigureSwaggerOptions>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CORSPolicy", policy =>
    {
        policy
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowAnyOrigin();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

CreateDatabase.Create(app.Services.GetRequiredService<IConfiguration>());

app.MigrateUpDatabase();

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

app.UseMiddleware<GlobalErrorHandlingMiddleware>();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
