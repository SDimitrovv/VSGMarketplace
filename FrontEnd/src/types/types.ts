export interface IProduct {
    id: number;
    code: string;
    fullName: string;
    price: number;
    quantity: number;
    quantityForSale?: number;
    description?: string;
    categoryId: number;
    type: string;
    imageUrl?: string;
}

export interface IOrder {
    id: number;
    quantity: number;
    date: string;
    status: string;
    fullName: string;
    email: string;
    code: string;
    price: number;
}

export interface IErrorResponse {
    Code: number;
    ErrorMessage: string;
}

export interface IResponse<T> {
    Product: T;
    Error: IErrorResponse;
}

export interface ICategory {
    type: string;
    id: number;
}