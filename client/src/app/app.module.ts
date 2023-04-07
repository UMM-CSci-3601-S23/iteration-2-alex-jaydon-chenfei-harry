import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { RequestDonorComponent } from './views/donor/request-donor.component';
import { RequestVolunteerComponent } from './views/volunteer/request-volunteer.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { RequestCardComponent } from './requests/request-card/request-card.component';

import { EditCardComponent } from './requests/edit-card/edit-card.component';

//import { RequestEditComponent } from './requests/request-edit/request-edit/request-edit.component';
import { DonorInfoComponent } from './views/donor/donor-info/donor-info.component';



const MATERIAL_MODULES: any[] = [
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatOptionModule,
  MatRadioModule,
  MatSidenavModule,
  MatSelectModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewRequestComponent,
    RequestDonorComponent,
    RequestVolunteerComponent,
    RequestCardComponent,
    EditCardComponent,
    //RequestEditComponent,
    DonorInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatBadgeModule,
    ReactiveFormsModule,
    HttpClientModule,
    MATERIAL_MODULES,
    LayoutModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
