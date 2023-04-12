using Dapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using VSGMarketplace.Application.Models.ItemModels.DTOs;
using VSGMarketplace.Application.Models.ItemModels.Interfaces;
using VSGMarketplace.Infrastructure.Context;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using VSGMarketplace.Application.Helpers;

namespace VSGMarketplace.Infrastructure.Repositories
{
    public class ItemRepository : DapperContext, IItemRepository
    {
        private readonly Cloudinary _cloudinary;

        public ItemRepository(IDapperContext dapperContext) 
        {
            var account = new Account(
                "dwmtkp1d1",
                "983881433641766",
                "03sMbu4hUUs6UjW8-QwhL5TWLu4"
            );

            _cloudinary = new Cloudinary(account);
        }

        public async Task<IEnumerable<GetItemDto>> GetAll()
        {
            var query = "SELECT i.*, c.Type, l.City, p.Image FROM Items i LEFT JOIN Categories c ON i.Id = c.ItemId LEFT JOIN Locations l ON i.Id = l.ItemId LEFT JOIN Pictures p ON i.Id = p.ItemId";


            var items = await Connection.QueryAsync<GetItemDto>(query);

            return items;
        }

        public async Task<GetItemDto> GetById(int id)
        {
            var query = "SELECT i.*, c.Type, l.City, p.Image FROM Items i LEFT JOIN Categories c ON i.Id = c.ItemId LEFT JOIN Locations l ON i.Id = l.ItemId LEFT JOIN Pictures p ON i.Id = p.ItemId WHERE id = @Id";

            var item = await Connection.QueryFirstAsync<GetItemDto>(query, new { Id = id });

            return item;
        }

        public async Task<CreateItemDto> Create(CreateItemDto item)
        {
            var query = @"INSERT INTO Items (FullName, Price, Quantity, QuantityForSale, Description)
                          VALUES (@FullName, @Price, @Quantity, @QuantityForSale, @Description);
                          SELECT CAST(SCOPE_IDENTITY() AS int)";

            var itemId = await Connection.QuerySingleAsync<int>(query, item);

            var categoryQuery = "INSERT INTO Categories (Type, ItemId) VALUES (@Type, @ItemId)";
            var locationQuery = "INSERT INTO Locations (City, ItemId) VALUES (@City, @ItemId)";
            var pictureQuery = "INSERT INTO Pictures (Image, ItemId) VALUES (@Image, @ItemId)";

            if (!string.IsNullOrWhiteSpace(item.Type))
            {
                await Connection.ExecuteAsync(categoryQuery, new { Type = item.Type, ItemId = itemId });
            }

            if (!string.IsNullOrWhiteSpace(item.City))
            {
                await Connection.ExecuteAsync(locationQuery, new { City = item.City, ItemId = itemId });
            }

            if (item.Image.Length > 0)
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription("image", new MemoryStream(item.Image)),
                    PublicId = "items/" + itemId
                };
                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                await Connection.ExecuteAsync(pictureQuery, new { Image = uploadResult.SecureUrl.AbsoluteUri, ItemId = itemId });
            }

            //var newItem = await GetById(itemId);

            item.ItemId = itemId;
            return item;
        }

        public async Task Update(int id, GetItemDto item)
        {

        }

        public async Task Delete(int id)
        {
            //    var getItemQuery = "SELECT Image FROM Pictures WHERE ItemId = @ItemId";

            //    var deleteItemQuery = "DELETE FROM Items WHERE Id = @Id";
            //    var deleteCategoryQuery = "DELETE FROM Categories WHERE ItemId = @ItemId";
            //    var deleteLocationQuery = "DELETE FROM Locations WHERE ItemId = @ItemId";
            //    var deletePictureQuery = "DELETE FROM Pictures WHERE ItemId = @ItemId";

            //    await using var connection = (SqlConnection)_context.CreateConnection();
            //    await using var transaction = await connection.BeginTransactionAsync();

            //    try
            //    {
            //        var imageResult = await connection.QuerySingleOrDefaultAsync<string>(getItemQuery, new { ItemId = id });

            //        if (imageResult != null)
            //        {
            //            var publicId = imageResult.Split('/').Last().Split('.').First();
            //            var deleteParams = new DeletionParams(publicId);
            //            await _cloudinary.DestroyAsync(deleteParams);
            //        }

            //        await connection.ExecuteAsync(deleteCategoryQuery, new { ItemId = id }, transaction);
            //        await connection.ExecuteAsync(deleteLocationQuery, new { ItemId = id }, transaction);
            //        await connection.ExecuteAsync(deletePictureQuery, new { ItemId = id }, transaction);
            //        await connection.ExecuteAsync(deleteItemQuery, new { Id = id }, transaction);

            //        await transaction.CommitAsync();
            //    }
            //    catch (Exception ex)
            //    {
            //        await transaction.RollbackAsync();

            //        throw;
            //    }
        }
    }
}
