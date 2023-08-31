import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './page/navbar/navbar.component';
import { LoginComponent } from './page/login/login.component';
import { SignInComponent } from './page/sign-in/sign-in.component';
import { ContactComponent } from './page/contact/contact.component';
import { TicketComponent } from './page/ticket/ticket.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { AddTicketComponent } from './page/add-ticket/add-ticket.component';
import {MatDialogModule} from '@angular/material/dialog';

import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { ListAdminComponent } from './page/list-admin/list-admin.component';
import { ProfileComponent } from './page/profile/profile.component';
import { AccueilComponent } from './page/accueil/accueil.component';
import { DetailsTicketComponent } from './page/details-ticket/details-ticket.component';
import { FooterComponent } from './page/footer/footer.component';
import { DetailsComponent } from './page/details/details.component';
import { ReparationComponent } from './page/reparation/reparation.component';
import { ConfirmComponent } from './dialog/confirm/confirm.component';
import { AddTechnicienComponent } from './page/admin/add-technicien/add-technicien.component';
import { EditUserComponent } from './page/edit-user/edit-user.component';
import { MessageComponent } from './dialog/message/message.component';
import { RejectSolutionComponent } from './dialog/reject-solution/reject-solution.component';
import { ListenerComponent } from './spinner/listener/listener.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ListenerCircularComponent } from './spinner/listener-circular/listener-circular.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DashboardComponent } from './page/admin/dashboard/dashboard.component';
import { ListTechnicienComponent } from './page/admin/list-technicien/list-technicien.component';
import { AdminLoginComponent } from './page/admin/admin-login/admin-login.component';
import { ModalDeleteComponent } from './page/admin/modal-delete/modal-delete.component';
import { DetailsTechnicienComponent } from './page/admin/details-technicien/details-technicien.component';
import { NavbarAdminComponent } from './page/admin/navbar-admin/navbar-admin.component';
import { StatComponent } from './page/admin/stat/stat.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignInComponent,
    ContactComponent,
    TicketComponent,
    AddTicketComponent,
    ListAdminComponent,
    ProfileComponent,
    AccueilComponent,
    DetailsTicketComponent,
    FooterComponent,
    DetailsComponent,
    ReparationComponent,
    ConfirmComponent,
    AddTechnicienComponent,
    EditUserComponent,
    MessageComponent,
    RejectSolutionComponent,
    ListenerComponent,
    ListenerCircularComponent,
    DashboardComponent,
    ListTechnicienComponent,
    AdminLoginComponent,
    ModalDeleteComponent,
    DetailsTechnicienComponent,
    NavbarAdminComponent,
    StatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
