import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarDesktopComponent } from './components/navbar-desktop/navbar-desktop.component';
import { NavbarMobileComponent } from './components/navbar-mobile/navbar-mobile.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from "primeng/api";
import { UserSettingsComponent } from './views/user-settings/user-settings.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarDesktopComponent,
        NavbarMobileComponent,
        LoginComponent,
        RegisterComponent,
        UserSettingsComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        InputTextModule,
        CheckboxModule,
        ButtonModule,
        PasswordModule,
        ToastModule,
        MessagesModule,
        ReactiveFormsModule
    ],
    providers: [MessageService],
    bootstrap: [AppComponent],
})
export class AppModule {}
