import { Routes } from '@angular/router';
import { Cart } from './components/cart/cart';
import { ProductList } from './components/product-list/product-list';
import { ProductItemDetail } from './components/product-item-detail/product-item-detail';
import { Confirmation } from './components/confirmation/confirmation';

// Routes components
export const routes: Routes = [
  { path: '', component: ProductList },
  { path: 'cart', component: Cart },
  { path: 'product/:id', component: ProductItemDetail },
  { path: 'confirmation', component: Confirmation },
];
