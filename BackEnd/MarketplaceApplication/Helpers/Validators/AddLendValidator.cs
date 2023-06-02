using FluentValidation;
using MarketplaceApplication.Models.LendModels.DTOs;

namespace MarketplaceApplication.Helpers.Validators
{
    public class AddLendValidator : AbstractValidator<AddLendModel>
    {
        public AddLendValidator()
        {
            RuleFor(c => c.Quantity)
                .NotNull().WithMessage("Quantity can't be null")
                .GreaterThan(0).WithMessage("Quantity must be positive number!");

            RuleFor(c => c.ProductId)
                .NotNull().WithMessage("ProductId can't be null")
                .GreaterThan(-1).WithMessage("ProductId must be positive number!");
        }
    }
}
