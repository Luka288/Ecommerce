import { JwtResponse } from "./tokens";

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

export type excludeUser = 'password'

export interface user extends Omit<AuthInterface, excludeUser>, JwtResponse{
    _id: string;
    role: role;
    verified: boolean;
}

export type role = 'default' | 'moderator' | 'admin'