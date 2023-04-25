export interface MarketplaceProduct {
    categoryId: number;
    code: string;
    description: string;
    fullName: string;
    id: number;
    imageUrl: string;
    price: number;
    quantity: number;
    quantityForSale: number;
    type: string;
};

export interface ErrorResponse {
    Code: number;
    ErrorMessage: string;
}

export interface Response<T> {
    Product: T,
    Error: ErrorResponse
}

export interface InventoryProduct {
    categoryId: number;
    code: string;
    description: string;
    fullName: string;
    id: number;
    imageUrl: string;
    price: number;
    quantity: number;
    quantityForSale: number;
    type: string;
};
