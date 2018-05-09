import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RightcontentComponent } from './rightcontent/rightcontent.component';
import { TopbarComponent } from './rightcontent/topbar/topbar.component';
import { StaffComponent } from './rightcontent/staff/staff.component';
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
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { CreateStaffFormComponent } from './rightcontent/staff/create-staff-form/create-staff-form.component';
import { ManageWorkerComponent } from './rightcontent/staff/manage-worker/manage-worker.component';
import { ManageRestComponent } from './rightcontent/rest/manage-rest/manage-rest.component';
import { ManageStockComponent } from './rightcontent/stock/manage-stock/manage-stock.component';
import { RestsOptionsComponent } from './rightcontent/nav-options/rests-options/rests-options.component';
import { ManageTablesComponent } from './rightcontent/tables/manage-tables/manage-tables.component';
import { CreateMealComponent } from './rightcontent/menu/create-meal/create-meal.component';
import { RestGridComponent } from './rightcontent/rest-grid/rest-grid.component';
import { DropZoneDirective } from './drop-zone.directive';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AgmCoreModule } from '@agm/core';
import { LoginWindowComponent } from './side-menu/login-window/login-window.component';
import {AuthService} from './auth.service';
import {AngularFireAuthModule} from 'angularfire2/auth';



const appRouts: Routes = [
  { path: 'login', component: LoginWindowComponent },
    { path : 'rests', component: RestsOptionsComponent },
    { path : 'staff', component: StaffComponent },
    { path : 'stock', component: StockComponent },
    { path : 'kitchen', component: KitchenComponent },
    { path : 'layout', component: LayoutComponent },
    { path : 'menu', component: ManuComponent },
    { path : 'creatstaffform', component: CreateStaffFormComponent },
    { path : 'manageWorkers', component: ManageWorkerComponent },
    { path : 'manageRests', component: ManageRestComponent },
    { path : 'manageStock', component: ManageStockComponent },
    { path : 'manageTables', component: ManageTablesComponent },
    { path : 'createMeal', component: CreateMealComponent }
] ;


@NgModule({
  declarations: [
    AppComponent,
    SideMenuComponent,
    RightcontentComponent,
    TopbarComponent,
    StaffComponent,
    StaffOptionsComponent,
    StockComponent,
    LayoutComponent,
    KitchenComponent,
    ManuComponent,
    LayoutOptionsComponent,
    MenuOptionsComponent,
    StockOptionsComponent,
    KitchenOptionsComponent,
    CreateStaffFormComponent,
    ManageWorkerComponent,
    ManageRestComponent,
    ManageStockComponent,
    RestsOptionsComponent,
    ManageTablesComponent,
    CreateMealComponent,
    RestGridComponent,
    DropZoneDirective,
    FileUploadComponent,
    LoginWindowComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRouts),
    AngularFireModule.initializeApp(environment.config, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
