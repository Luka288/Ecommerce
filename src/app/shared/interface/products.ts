
export interface Products {
    limit: number;
    page: number;
    products: Product[];
    skip: number;
    total: number;
}
export interface Product {
        _id: string
        title: string;
        brand: string;
        category: { 
            id: string; 
            name: string 
        };
        description: string;
        price: { 
            current: number; 
            currency: string; 
            beforeDiscount: number; 
            discountPercentage: number 
        };
        rating: number;
        stock: number;
        warranty: number;
        issueDate: string;
        thumbnail: string;
        images: string[];
        image: string;
}