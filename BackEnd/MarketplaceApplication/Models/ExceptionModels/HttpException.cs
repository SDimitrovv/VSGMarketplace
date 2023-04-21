using System.Net;

namespace MarketplaceApplication.Models.ExceptionModels
{
    public class HttpException : Exception
    {
        public HttpException(string message, HttpStatusCode httpStatusCode) : base(message)
        {
            HttpStatusCode = httpStatusCode;
        }

        public HttpStatusCode HttpStatusCode { get; }
    }
}
