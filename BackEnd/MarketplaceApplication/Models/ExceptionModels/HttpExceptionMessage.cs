using System.Net;

namespace MarketplaceApplication.Models.ExceptionModels
{
    public class HttpExceptionMessage : Exception
    {
        public HttpExceptionMessage(string message, HttpStatusCode httpStatusCode) : base(message)
        {
            HttpStatusCode = httpStatusCode;
        }

        public HttpStatusCode HttpStatusCode { get; }
    }
}
