using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MarketplaceApplication.Models.GenericRepository;
using Microsoft.Extensions.Logging;

namespace MarketplaceApplication.Helpers.Middleware
{
    public class GlobalErrorHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalErrorHandlingMiddleware> _logger;
        public GlobalErrorHandlingMiddleware(RequestDelegate next, ILogger<GlobalErrorHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context, IUnitOfWork unitOfWork)
        {
            try
            {
                await _next(context);
                unitOfWork.Transaction.Commit();

            }
            catch (Exception ex)
            {
                unitOfWork.Transaction.Rollback();

                //await HandleExceptionAsync(context, ex);
            }
        }
    }
}
