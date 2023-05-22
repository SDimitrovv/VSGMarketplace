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
    productFullName: string;
    email: string;
    productCode: string;
    price: number;
}

export interface IErrorResponse {
    Code: number;
    ErrorMessage: string;
}

export interface IFormInputs {
    code: string;
    fullName: string;
    description: string;
    categoryId: number | null;
    quantityForSale: number | null;
    price: number | null;
    quantity: number | null;
    image: FileList | null;
}

export interface IResponse<T> {
    Product: T;
    Error: IErrorResponse;
}

export interface ICategory {
    type: string;
    id: number;
}

export interface IUser {
    email: string;
    token: string;
    name: string;
    memberType: string;
}