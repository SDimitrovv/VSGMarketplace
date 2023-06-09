﻿using MarketplaceApplication.Models.ExceptionModels;
using MarketplaceApplication.Models.GenericRepository;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using FluentValidation;

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
                _logger.LogError(ex.ToString());
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception ex)
        {
            var errors = new List<ErrorModel>();

            switch (ex)
            {
                case HttpException httpException:
                    errors.Add(new ErrorModel
                    {
                        Code = (int)httpException.HttpStatusCode,
                        ErrorMessage = httpException.Message
                    });
                    break;
                case ValidationException validationException:
                    errors.AddRange(validationException.Errors.Select(e => new ErrorModel
                    {
                        Code = 400,
                        ErrorMessage = ex.Message
                    }));
                    break;
                default:
                    errors.Add(new ErrorModel
                    {
                        Code = 500,
                        ErrorMessage = ex.Message
                    });
                    break;
            }

            var errorResponce = JsonSerializer.Serialize(errors);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = errors[0].Code;
            await context.Response.WriteAsync(errorResponce);
        }
    }
}
