import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  OVERLAY_PROVIDERS,
  MdIconRegistry,
  InteractivityChecker
} from '@angular/material';
import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { AuthComponent } from '../components/auth/auth.component';
import { OrdersPageModule } from '../pages/orders-page/orders-page.module';
import { CookieModule } from 'ngx-cookie';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkTimePageModule } from '../pages/work-time/work-time.page.module';
import { ProjectMaterialModule } from 'app/project-material.module';
import { LoadPageModule } from '../pages/load/load-page.module';
import { FormYPageModule } from '../pages/form-y401/form-y401-page.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    ProjectMaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CookieModule.forRoot(),
    OrdersPageModule,
    WorkTimePageModule,
    LoadPageModule,
    FormYPageModule
  ],
  providers: [
    OVERLAY_PROVIDERS,
    MdIconRegistry,
    InteractivityChecker
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
