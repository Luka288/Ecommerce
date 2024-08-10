import { nav } from "../interface/navigation"

export const NavBar: nav[] = [
    {
        title: 'Login',
        path: 'auth'
    },

    {
        title: 'Register',
        path: 'auth',
    },
    {
        title: "Cart",
        path: 'cart'
    },
    {
        title: 'Wishlist',
        path: 'wishlist',
    },
]

export const AfterAuth: nav[] = [
    {
        title: "Cart",
        path: 'cart',
    },
    {
        title: "Wishlist",
        path: 'wishlist',
    },
]

export const BeforeAuth: nav[] = [
    {
        title: 'Login',
        path: 'auth'
    },

    {
        title: 'Register',
        path: 'auth',
    },
]

