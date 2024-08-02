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
        path: ''
    },
    {
        title: 'Wishlist',
        path: '',
    },
]

export const AfterAuth: nav[] = [
    {
        title: "Cart",
        path: '',
    },
    {
        title: "Wishlist",
        path: '',
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
    {
        title: "Cart",
        path: ''
    },
    {
        title: 'Wishlist',
        path: '',
    },
]

