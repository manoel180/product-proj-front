import { Routes } from '@angular/router';
import {FullComponent} from "./layouts/full/full.component";
import {ProductsComponent} from "./pages/products/products.component";
import { BlankComponent } from './layouts/blank/blank.component';
import { authGuard } from './core/auth/auth.guard';
import {ProductDetailComponent} from "./pages/products/product-detail/product-detail.component";


export const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '',
    component: FullComponent,
    // canActivate: [authGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'products',
        component:  ProductsComponent,
        // canActivate: [authGuard],
        runGuardsAndResolvers: 'always',
      },
      {
        path: 'product',
        component:  ProductDetailComponent
      },



    ]
  }

];
