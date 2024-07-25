export interface SingleProduct {
  _id: string;
  brand: string;
  category: {
    id: string;
    name: string;
    image: string;
  };
  description: string;
  images: string[];
  issueDate: string;
  price: {
    current: number;
    currency: string;
    beforeDiscount: number;
    discountPercentage?: number; 
  };
  rating: number;
  ratings: Array<{
    userId: string;
    score: number;
    comment?: string;
  }>;
  stock: number;
  thumbnail: string;
  title: string;
  warranty: number;
}