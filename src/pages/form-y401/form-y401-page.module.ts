import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ProjectMaterialModule } from '../../app/project-material.module';
import { FormYPageComponent } from './form-y401-page.component';

@NgModule({
  imports: [
    BrowserModule,
    ProjectMaterialModule,
    MdIconModule,
    FormsModule
  ],
  exports: [],
  declarations: [
    FormYPageComponent
  ],
  providers: []
})
export class FormYPageModule {
}
