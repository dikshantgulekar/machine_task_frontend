import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { ShowcategoryComponent } from './showcategory/showcategory.component';
import { ShowproductComponent } from './showproduct/showproduct.component';
import { EditcategoryComponent } from './editcategory/editcategory.component';
import { EditproductComponent } from './editproduct/editproduct.component';

export const routes: Routes = [
    {path: 'add-category', component: AddcategoryComponent},
    {path: 'add-product', component: AddproductComponent},
    {path: 'show-category', component: ShowcategoryComponent},
    {path: 'show-product', component: ShowproductComponent},
    {path: '', component: HomeComponent},
    {path: 'edit-category/:catid', component: EditcategoryComponent},
    {path: 'edit-product/:proid', component: EditproductComponent},
    {path: '**', component: PagenotfoundComponent},
];
