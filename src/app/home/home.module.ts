import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { CommonModule } from '@angular/common';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';

import { HomeRoutingModule } from './home-routing.module';

import { HomePageComponent } from './pages/home-page/home-page.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LogInComponent } from './components/log-in/log-in.component';

import {ReactiveErrorStateMatcherService} from './services/reactive-error-state-matcher.service';
import { InitialComponent } from './components/initial/initial.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatDividerModule
  ],
  providers: [
    {
      provide: ErrorStateMatcher, 
      useClass: ShowOnDirtyErrorStateMatcher
    },
    ReactiveErrorStateMatcherService,
  ],
  declarations: [
    HomePageComponent, 
    SignInComponent, 
    LogInComponent, InitialComponent
  ]
})
export class HomeModule { }
