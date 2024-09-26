import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import {ProductsComponent} from "./products/products.component";

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Home',
      urls: [
        { title: 'Home', url: '/home' },
      ],
    },
  },
];
