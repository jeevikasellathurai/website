import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { BuynowComponent } from './buynow/buynow.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';

const routes: Routes = [
 {path:'',redirectTo:'products',pathMatch:'full'},
 {path:'products',component:ProductComponent},
 {path:'cart',component:CartComponent},
 {path:'buynow',component:BuynowComponent},
 {path:'login',component:LoginComponent},
 {path:'signup',component:SignupComponent},
 {path:'header',component:HeaderComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
