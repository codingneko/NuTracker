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
import { MessageService } from 'primeng/api';
import { UserSettingsComponent } from './views/user-settings/user-settings.component';
import { FileUploadModule } from 'primeng/fileupload';
import { TooltipModule } from 'primeng/tooltip';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { DialogModule } from 'primeng/dialog';
import { NewNutComponent } from './components/new-nut/new-nut.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { HomeComponent } from './views/home/home.component';
import { Table, TableModule } from 'primeng/table';
import { AvatarComponent } from './components/avatar/avatar.component';
import { UserComponent } from './views/user/user.component';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
    declarations: [
        AppComponent,
        NavbarDesktopComponent,
        NavbarMobileComponent,
        LoginComponent,
        RegisterComponent,
        UserSettingsComponent,
        NotFoundComponent,
        NewNutComponent,
        HomeComponent,
        LeaderboardComponent,
        AvatarComponent,
        UserComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        InputTextareaModule,
        InputTextModule,
        CheckboxModule,
        ButtonModule,
        PasswordModule,
        ToastModule,
        MessagesModule,
        ReactiveFormsModule,
        FileUploadModule,
        TooltipModule,
        DialogModule,
        CalendarModule,
        TableModule,
        InputNumberModule
    ],
    providers: [MessageService],
    bootstrap: [AppComponent],
})
export class AppModule {}
