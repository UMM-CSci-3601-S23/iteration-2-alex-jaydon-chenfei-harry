import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { RequestDonorComponent } from './views/donor/request-donor.component';
import { RequestVolunteerComponent } from './views/volunteer/request-volunteer.component';

import { EditCardComponent } from './requests/edit-card/edit-card.component';

import { DonorInfoComponent } from './views/donor/donor-info/donor-info.component';


// Note that the 'users/new' route needs to come before 'users/:id'.
// If 'users/:id' came first, it would accidentally catch requests to
// 'users/new'; the router would just think that the string 'new' is a user ID.
const routes: Routes = [
  {path: '', component: HomeComponent, title: 'Home'},
  {path: 'requests/donor', component: RequestDonorComponent, title: 'Donor View'},
  {path: 'requests/volunteer', component: RequestVolunteerComponent, title: 'Volunteer View'},
  {path: 'requests/client', component: NewRequestComponent, title: 'New Request'},

  {path: 'edit-card/:id', component: EditCardComponent, title: 'Edit Card'},
  {path: 'requests/donorInfo', component: DonorInfoComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
