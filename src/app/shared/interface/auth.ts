export interface AuthInterface {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    password: string;
    address: string;
    phone: string;
    zipcode: string;
    avatar: string;
    gender: UserGenders;
    _id: string;
}

export type UserGenders = "MALE" | "FEMALE" | "OTHER"