import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { OrdersPageComponent } from './orders-page.component';
import { OrderComponent } from './order.component/order.component';
import {MdIconModule} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ProjectMaterialModule } from '../../app/project-material.module';

@NgModule({
  imports: [
    BrowserModule,
    ProjectMaterialModule,
    MdIconModule,
    FormsModule
  ],
  exports: [
  ],
  declarations: [
    OrdersPageComponent,
    OrderComponent
  ],
  providers: []
})
export class OrdersPageModule {
}
