import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AppComponent} from './app.component';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {RightcontentComponent} from './rightcontent/rightcontent.component';
import {TopbarComponent} from './rightcontent/topbar/topbar.component';
import {StaffOptionsComponent} from './rightcontent/nav-options/staff-options/staff-options.component';
import {StockComponent} from './rightcontent/stock/stock.component';
import {LayoutComponent} from './rightcontent/layout/layout.component';
import {KitchenComponent} from './rightcontent/kitchen/kitchen.component';
import {Router, RouterModule, Routes} from '@angular/router';
import {LayoutOptionsComponent} from './rightcontent/nav-options/layout-options/layout-options.component';
import {MenuOptionsComponent} from './rightcontent/nav-options/menu-options/menu-options.component';
import {StockOptionsComponent} from './rightcontent/nav-options/stock-options/stock-options.component';
import {KitchenOptionsComponent} from './rightcontent/nav-options/kitchen-options/kitchen-options.component';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {CreateRestComponent} from './rightcontent/rest/create-rest/create-rest.component';
import {ManageStockComponent} from './rightcontent/stock/manage-stock/manage-stock.component';
import {RestsOptionsComponent} from './rightcontent/nav-options/rests-options/rests-options.component';
import {CreateMealComponent} from './rightcontent/menu/create-meal/create-meal.component';
import {RestGridComponent} from './rightcontent/rest-grid/rest-grid.component';
import {DropZoneDirective} from './drop-zone.directive';
import {LoginWindowComponent} from './side-menu/login-window/login-window.component';
import {AuthService} from './services/auth.service';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {KitchenStoreService} from './services/kitchen-store.service';
import {CreateGroceryComponent} from './rightcontent/menu/create-grocery/create-grocery.component';
import {CookingTypesService} from './services/cooking-types.service';
import {RawMaterialService} from './services/raw-material.service';
import {CreateGroceryService} from './services/create-grocery.service';
import {HttpClientModule} from '@angular/common/http';
import {DeleteGroceryService} from './services/delete-grocery.service';
import {CreateDishComponent} from './rightcontent/menu/create-dish/create-dish.component';
import {GroceryService} from './services/grocery.service';
import {UpdateGroceryService} from './services/update-grocery.service';
import {CategoryService} from './services/category.service';
import {CreateDishService} from './services/create-dish.service';
import {CreateMealService} from './services/create-meal.service';
import {DishService} from './services/dish.service';
import {SubMenuService} from './services/sub-menu.service';
import {MealTypeService} from './services/meal-type.service';
import {CreateMealPageComponent} from './rightcontent/menu/create-meal-page/create-meal-page.component';
import {RawMaterialForMealComponent} from './rightcontent/menu/create-meal/raw-material-for-meal/raw-material-for-meal.component';
import * as firebase from 'firebase';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AgmCoreModule} from '@agm/core';
import {RawMaterialUnitService} from './services/raw-material-unit.service';
import { CreateTableComponent } from './rightcontent/layout/create-table/create-table.component';
import { GridComponent } from './rightcontent/layout/grid/grid.component';
import { GridCellComponent } from './rightcontent/layout/grid-cell/grid-cell.component';
import { NewTableDetailsComponent } from './rightcontent/layout/new-table-details/new-table-details.component';
import { TableDetailsComponent } from './rightcontent/layout/table-details/table-details.component';
import { ManageRestsComponent } from './rightcontent/rest/manage-rests/manage-rests.component';

firebase.initializeApp(environment.config);

const appRouts: Routes = [
  {path: 'login', component: LoginWindowComponent},
  {path: 'rests', component: RestsOptionsComponent},
  {path: 'stock', component: StockComponent},
  {path: 'kitchen', component: KitchenComponent},
  {path: 'layout', component: LayoutComponent},
  {path: 'manageRests', component: ManageRestsComponent},
  {path: 'manageStock', component: ManageStockComponent},
  {path: 'createMeal', component: CreateMealPageComponent},
  {path: 'createNewRest', component: CreateRestComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    RightcontentComponent,
    TopbarComponent,
    StaffOptionsComponent,
    StockComponent,
    LayoutComponent,
    KitchenComponent,
    LayoutOptionsComponent,
    MenuOptionsComponent,
    StockOptionsComponent,
    KitchenOptionsComponent,
    CreateRestComponent,
    ManageStockComponent,
    RestsOptionsComponent,
    CreateMealComponent,
    RestGridComponent,
    DropZoneDirective,
    LoginWindowComponent,
    CreateGroceryComponent,
    CreateDishComponent,
    CreateMealPageComponent,
    RawMaterialForMealComponent,
    CreateTableComponent,
    GridComponent,
    GridCellComponent,
    NewTableDetailsComponent,
    TableDetailsComponent,
    ManageRestsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRouts),
    AngularFireModule.initializeApp(environment.config, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyC17LboYF2DtS34_J_FCKGEhPL5ozf3CHo'}),
  ],
  providers: [AuthService, KitchenStoreService, CookingTypesService, RawMaterialService,
    CreateGroceryService, HttpClientModule, DeleteGroceryService, UpdateGroceryService,
    GroceryService, CategoryService, CreateDishService, CreateMealService, DishService,
    SubMenuService, MealTypeService, RawMaterialUnitService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
