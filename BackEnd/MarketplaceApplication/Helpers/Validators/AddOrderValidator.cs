using FluentValidation;
using MarketplaceApplication.Models.OrderModels.DTOs;

namespace MarketplaceApplication.Helpers.Validators
{
    public class AddOrderValidator : AbstractValidator<AddOrderModel>
    {
        public AddOrderValidator()
        {
            RuleFor(c => c.Quantity)
                .NotNull().WithMessage("Quantity can't be null")
                .GreaterThan(-1).WithMessage("Quantity must be positive number!");

            RuleFor(c => c.ProductId)
                .NotNull().WithMessage("ProductId can't be null")
                .GreaterThan(-1).WithMessage("ProductId must be positive number!");

            RuleFor(c => c.Email)
                .NotNull().WithMessage("Email can't be null!")
                .Length(3, 255);
        }
    }
}
