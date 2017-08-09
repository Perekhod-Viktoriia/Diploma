import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { ProjectMaterialModule } from '../../app/project-material.module';
import { LoadPageComponent } from './load-page.component';

@NgModule({
  imports: [
    BrowserModule,
    ProjectMaterialModule,
    MdIconModule,
    FormsModule
  ],
  exports: [],
  declarations: [
    LoadPageComponent
  ],
  providers: []
})
export class LoadPageModule {
}
