import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MdIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkTimePageComponent } from './work-time-page.component';
import { ProjectMaterialModule } from '../../app/project-material.module';

@NgModule({
  imports: [
    BrowserModule,
    ProjectMaterialModule,
    MdIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    WorkTimePageComponent
  ],
  providers: []
})
export class WorkTimePageModule {
}
