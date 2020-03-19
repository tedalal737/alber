import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { OrphansListComponent } from './orphans-list/orphans-list.component';
import { OrphanComponent } from './orphan/orphan.component';
import { AdoptionComponent } from './adoption/adoption.component';
import { AdopterComponent } from './adopter/adopter.component';
import { AdoptersListComponent } from './adopters-list/adopters-list.component';
import { MarwaEkfalniComponent } from './marwa-ekfalni/marwa-ekfalni.component';
import { MarwaOrphansListComponent } from './marwa-orphans-list/marwa-orphans-list.component';
import { AdoptionMessageComponent } from './adoption-message/adoption-message.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'orphans-list/male', data: { 'sex' : 'male' }, component: OrphansListComponent},
  { path: 'orphans-list/female', data: { 'sex' : 'female' }, component: OrphansListComponent},
  { path: 'orphan/male', component: OrphanComponent, data: { 'sex' : 'male' }},
  { path: 'orphan/female', component: OrphanComponent, data: { 'sex' : 'female' }},
  { path: 'edit-orphan/:orphanId', component: OrphanComponent},
  { path: 'adopters-list', component: AdoptersListComponent},
  { path: 'adopter', component: AdopterComponent},
  { path: 'edit-adopter/:adopterId', component: AdopterComponent},
  { path: 'adoption/:orphanId', component: AdoptionComponent},

  { path: 'marwa', component: MarwaEkfalniComponent},
  { path: 'marwa-orphans-list/male', data: { 'sex' : 'male', 'adopted' : false }, component: MarwaOrphansListComponent},
  { path: 'marwa-orphans-list/female', data: { 'sex' : 'female', 'adopted' : false }, component: MarwaOrphansListComponent},
  { path: 'marwa-orphans-list/adopted-male', data: { 'sex' : 'male', 'adopted' : true }, component: MarwaOrphansListComponent},
  { path: 'marwa-orphans-list/adopted-female', data: { 'sex' : 'female', 'adopted' : true }, component: MarwaOrphansListComponent},

  { path: 'adoption-message', component: AdoptionMessageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
