import { Routes } from '@angular/router';

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
        path: '**',
        loadComponent: () => import('./components/not-found/not-found.component'),
        title: 'Page Not Found'
    },

];
