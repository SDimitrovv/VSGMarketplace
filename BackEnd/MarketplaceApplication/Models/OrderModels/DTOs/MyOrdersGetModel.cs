﻿namespace MarketplaceApplication.Models.OrderModels.DTOs
{
    public class MyOrdersGetModel
    {
        public int Id { get; set; }

        public int Quantity { get; set; }

        public string Date { get; set; }

        public string Status { get; set; }

        public string ProductFullName { get; set; }

        public decimal Price { get; set; }
    }
}
