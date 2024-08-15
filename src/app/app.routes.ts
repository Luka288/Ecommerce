import { Routes } from '@angular/router';
import { canActivate, canUserAuth } from './shared/services/auth.service';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/main/main.component'),
        title: 'Shop | Main Page'
    },
    {
        path: 'product/id/:id',
        loadComponent: () => import('./components/product-page/product-page.component'),
        title: 'Product Page'
    },
    {
        path: 'auth',
        loadComponent: () => import('./components/auth-page/auth-page.component'),
        title: 'Auth Page',
        canActivate: [canUserAuth],
    },
    {
        path: 'cart',
        loadComponent: () => import('./components/cart-page/cart-page.component'),
        title: 'Cart Page',
        canActivate: [canActivate]
    },
    {
        path: 'wishlist',
        loadComponent: () => import('./components/wishlist-page/wishlist-page.component'),
        title: 'Wishlist Page',
        canActivate: [canActivate]
    },
    {
        path: 'profile',
        loadComponent: () => import('./components/profile/profile.component'),
        title: 'Profile Page',
        canActivate: [canActivate]
    },

    {
        path: '**',
        loadComponent: () => import('./components/not-found/not-found.component'),
        title: 'Page Not Found'
    },

];
