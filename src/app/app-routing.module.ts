import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { LoginComponent } from './component/login/login.component';
import { OrderConfirmationComponent } from './component/order-confirmation/order-confirmation.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { ProductDetailsComponent } from './component/products/product-details/product-details.component';
import { ProductsComponent } from './component/products/products.component';
import { RegisterComponent } from './component/register/register.component';
import { AdminGuard } from './guards/admin.guard';
import { CheckoutGuard } from './guards/checkout.guard';

const routes: Routes = [
  //{path: '', redirectTo: 'products', pathMatch:'full'},
  {path: '',  component: ProductsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:title', component: ProductDetailsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate:[AdminGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate:[CheckoutGuard]},
  {path: 'orderConfirmation', component: OrderConfirmationComponent},
  {path: 'orderHistory', component: OrderHistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
