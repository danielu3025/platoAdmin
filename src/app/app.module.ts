import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';



import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RightcontentComponent } from './rightcontent/rightcontent.component';
import { TopbarComponent } from './rightcontent/topbar/topbar.component';
import { StaffComponent } from './rightcontent/staff/staff.component';
import { EmployFormComponent } from './rightcontent/forms/employ-form/employ-form.component';
import { StaffOptionsComponent } from './rightcontent/nav-options/staff-options/staff-options.component';
import { StockComponent } from './rightcontent/stock/stock.component';
import { LayoutComponent } from './rightcontent/layout/layout.component';
import { KitchenComponent } from './rightcontent/kitchen/kitchen.component';
import { ManuComponent } from './rightcontent/manu/manu.component';
import {Router, RouterModule, Routes} from '@angular/router';
import { LayoutOptionsComponent } from './rightcontent/nav-options/layout-options/layout-options.component';
import { MenuOptionsComponent } from './rightcontent/nav-options/menu-options/menu-options.component';
import { StockOptionsComponent } from './rightcontent/nav-options/stock-options/stock-options.component';
import { KitchenOptionsComponent } from './rightcontent/nav-options/kitchen-options/kitchen-options.component';
import { GroceryFormComponent } from './rightcontent/forms/menu-form/grocery-form/grocery-form.component';
import { ProductFromComponent } from './rightcontent/forms/menu-form/product-from/product-from.component';
import { DishFormComponent } from './rightcontent/forms/menu-form/dish-form/dish-form.component';
import { MealFormComponent } from './rightcontent/forms/menu-form/meal-form/meal-form.component';
import { FinalMenuFormComponent } from './rightcontent/forms/menu-form/final-menu-form/final-menu-form.component';



const appRouts: Routes = [
    { path : 'staff', component: StaffComponent },
    { path : 'stock', component: StockComponent },
    { path : 'kitchen', component: KitchenComponent },
    { path : 'layout', component: LayoutComponent },
    { path : 'menu', component: ManuComponent },
    { path : 'grocery', component: GroceryFormComponent },
    { path : 'product', component: ProductFromComponent },
    { path : 'dish', component: DishFormComponent },
    { path : 'meal', component: MealFormComponent },
    { path : 'finalMenu', component: FinalMenuFormComponent }
] ;


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    RightcontentComponent,
    TopbarComponent,
    StaffComponent,
    EmployFormComponent,
    StaffOptionsComponent,
    StockComponent,
    LayoutComponent,
    KitchenComponent,
    ManuComponent,
    LayoutOptionsComponent,
    MenuOptionsComponent,
    StockOptionsComponent,
    KitchenOptionsComponent,
    GroceryFormComponent,
    ProductFromComponent,
    DishFormComponent,
    MealFormComponent,
    FinalMenuFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRouts)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
