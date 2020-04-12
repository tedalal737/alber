import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

import { NgxSpinnerModule } from "ngx-spinner";

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { DemoMaterialModule } from './shared/material'
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrphansListComponent } from './orphans-list/orphans-list.component';

import { CdkTableModule } from '@angular/cdk/table';
import { OrphanComponent } from './orphan/orphan.component';
import { AdoptionComponent } from './adoption/adoption.component';
import { FooterComponent } from './footer/footer.component';
import { AdopterComponent } from './adopter/adopter.component';
import { AdoptersListComponent } from './adopters-list/adopters-list.component';
import { MarwaEkfalniComponent } from './marwa-ekfalni/marwa-ekfalni.component';
import { MarwaOrphansListComponent } from './marwa-orphans-list/marwa-orphans-list.component';
import { HttpClientModule } from '@angular/common/http';
import { AdoptionMessageComponent } from './adoption-message/adoption-message.component';
import { Megzi3EkfalniComponent } from './megzi3-ekfalni/megzi3-ekfalni.component';
import { Megzi3OrphansListComponent } from './megzi3-orphans-list/megzi3-orphans-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrphansListComponent,
    OrphanComponent,
    AdoptionComponent,
    FooterComponent,
    AdopterComponent,
    AdoptersListComponent,
    MarwaEkfalniComponent,
    MarwaOrphansListComponent,
    AdoptionMessageComponent,
    Megzi3EkfalniComponent,
    Megzi3OrphansListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    DemoMaterialModule,
    FormsModule, ReactiveFormsModule,
    CdkTableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
