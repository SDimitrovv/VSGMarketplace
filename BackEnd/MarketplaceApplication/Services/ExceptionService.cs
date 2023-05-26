using MarketplaceApplication.Models.ExceptionModels;
using MarketplaceApplication.Models.GenericRepository;
using System.Net;

namespace MarketplaceApplication.Services
{
    public static class ExceptionService
    {
        public static async Task ThrowExceptionWhenIdNotFound<T>(int id, IGenericRepository<T> repository)
        {
            var entity = await repository.GetById(id);

            if (entity == null)
                throw new HttpException($"{typeof(T).Name} id not found!", HttpStatusCode.NotFound);
        }

        public static void ThrowExceptionWhenNotEnoughQuantityForSale(int saleQty, int orderQty)
        {
            if (orderQty > saleQty)
                throw new HttpException("Not enough quantity for sale!", HttpStatusCode.BadRequest);
        }

        public static void ThrowExceptionWhenOrderIsNotPending(string status)
        {
            if (status != "Pending")
                throw new HttpException("Order is not pending!", HttpStatusCode.BadRequest);
        }

        public static void ThrowExceptionWhenOrderIsPending(string status)
        {
            if (status == "Pending")
                throw new HttpException("Order is pending!", HttpStatusCode.BadRequest);
        }

        public static void ThrowExceptionWhenEmailNotTheSame(string orderEmail, string userEmail)
        {
            if (orderEmail != userEmail)
                throw new HttpException("Sorry!", HttpStatusCode.BadRequest);
        }
    }
}
