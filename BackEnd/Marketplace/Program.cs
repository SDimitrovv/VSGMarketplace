using MarketplaceApplication.Helpers.Configurations;
using MarketplaceApplication.Helpers.Middleware;
using MarketplaceInfrastructure.Configurations;
using MarketplaceInfrastructure.Migrations;
using NLog.Web;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

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

builder.Services.AddControllers();

builder.Services.AddApplicationServiceCollection();
builder.Services.AddInfrastructureServiceCollection();
builder.Services.AddMigrationsConfigurations();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

CreateDatabase.Create(app.Services.GetRequiredService<IConfiguration>());

app.MigrateUpDatabase();

app.UseHttpsRedirection();

app.UseCors("CORSPolicy");

app.UseAuthorization();

app.UseMiddleware<GlobalErrorHandlingMiddleware>();

app.MapControllers();

app.Run();
