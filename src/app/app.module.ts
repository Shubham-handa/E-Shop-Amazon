import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { FooterComponent } from './Components/footer/footer.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './Components/about/about.component';
import { ProductsComponent } from './Components/products/products.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent,children:[
    {path:'',component:ProductsComponent},
    { path: 'orders', component: OrdersComponent},
    { path: 'footer', component: FooterComponent},
    { path: 'profile', component: ProfileComponent},
    {path:'about',component:AboutComponent},
  ]},


];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrdersComponent,
    ProfileComponent,
    FooterComponent,
    LoginComponent,
    AboutComponent,
    ProductsComponent
  ],
  imports: [
    BrowserModule,
    Ng2SearchPipeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
