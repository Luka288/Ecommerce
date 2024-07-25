interface SingleProductInter {
    price: {
      current: number;
      currency: string;
      beforeDiscount: number;
      discountPercentage: number;
    };
    category: {
      id: string;
      name: string;
      image: string;
    };
    _id: string;
    title: string;
    description: string;
    issueDate: string;
    thumbnail: string;
    stock: number;
    rating: number;
    brand: string;
    warranty: number;
    images: string[];
    ratings: {
      userId: string;
      value: number;
      createdAt: string; 
    }[]; 
  }