export interface IProduct {
    id: number;
    code: string;
    fullName: string;
    price?: number;
    quantity: number;
    quantityForSale?: number;
    quantityForLend?: number;
    description?: string;
    categoryId: number;
    locationId: number;
    type: string;
    city: string;
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

export interface ILendItem {
    id: number;
    email: string;
    startDate: string;
    endDate: string;
    quantity: number;
    productId: number;
    productCode: string;
    productFullName: string;
}

export interface IUserLentItems {
    email: string;
    lentItems: ILendItem[];
}

export interface IFormInputs {
    code: string;
    fullName: string;
    description: string;
    categoryId: number | string;
    locationId: number | string;
    quantityForSale: number | null;
    quantityForLend: number | null;
    price: number | null;
    quantity: number | null;
    image: FileList | null;
}

export interface ILendInputs {
    email: { label: string, value: string } | null;
    quantity: number | null;
}

export interface ICategory {
    type: string;
    id: number;
}

export interface ILocation {
    city: string;
    id: number;
}

export interface IErrorResponse {
    status: number;
    data: {
        Code: number;
        ErrorMessage: string;
    }[];
}

export interface IUser {
    email: string;
    token: string;
    name: string;
    memberType: string;
}

export interface IEmployee {
    avatar: string;
    name: string;
    email: string;
}

export interface IEmployeesResponse {
    employees: IEmployee[]
}