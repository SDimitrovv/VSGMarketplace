using Dapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using VSGMarketplace.Application.Models.ItemModels.DTOs;
using VSGMarketplace.Application.Models.ItemModels.Interfaces;
using VSGMarketplace.Infrastructure.Context;

namespace VSGMarketplace.Infrastructure.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private readonly DapperContext _context;

        private readonly Cloudinary _cloudinary;

        public ItemRepository(DapperContext context)
        {
            _context = context;

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

            using var connection = _context.CreateConnection();
            var items = await connection.QueryAsync<GetItemDto>(query);

            return items;
        }

        public async Task<GetItemDto> GetById(int id)
        {
            var query = "SELECT i.*, c.Type, l.City, p.Image FROM Items i LEFT JOIN Categories c ON i.Id = c.ItemId LEFT JOIN Locations l ON i.Id = l.ItemId LEFT JOIN Pictures p ON i.Id = p.ItemId WHERE id = @Id";

            using var connection = _context.CreateConnection();
            var item = await connection.QueryFirstAsync<GetItemDto>(query, new { Id = id });

            return item;
        }

        public async Task<CreateItemDto> Create(CreateItemDto item)
        {
            var query = @"INSERT INTO Items (FullName, Price, Quantity, QuantityForSale, Description)
                          VALUES (@FullName, @Price, @Quantity, @QuantityForSale, @Description);
                          SELECT CAST(SCOPE_IDENTITY() AS int)";

            using var connection = _context.CreateConnection();
            var itemId = await connection.QuerySingleAsync<int>(query, item);

            var categoryQuery = "INSERT INTO Categories (Type, ItemId) VALUES (@Type, @ItemId)";
            var locationQuery = "INSERT INTO Locations (City, ItemId) VALUES (@City, @ItemId)";
            var pictureQuery = "INSERT INTO Pictures (Image, ItemId) VALUES (@Image, @ItemId)";

            if (!string.IsNullOrWhiteSpace(item.Type))
            {
                await connection.ExecuteAsync(categoryQuery, new { Type = item.Type, ItemId = itemId });
            }

            if (!string.IsNullOrWhiteSpace(item.City))
            {
                await connection.ExecuteAsync(locationQuery, new { City = item.City, ItemId = itemId });
            }

            if (item.Image.Length > 0)
            {
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription("image", new MemoryStream(item.Image)),
                    PublicId = "items/" + itemId
                };
                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                await connection.ExecuteAsync(pictureQuery, new { Image = uploadResult.SecureUrl.AbsoluteUri, ItemId = itemId });
            }

            //var newItem = await GetById(itemId);

            item.ItemId = itemId;
            return item;
        }

        public async Task Update(int id, GetItemDto item)
        {
            throw new NotImplementedException();
        }

        public async Task Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}
