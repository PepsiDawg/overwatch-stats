import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

//Components
import { AppComponent } from './app.component';
import { OwIconComponent } from './shared/components/ow-icon/ow-icon.component';

//Services
import { OverwatchServices } from './shared/services/overwatch.service';
import { FirebaseService } from './shared/services/firebase.service';

@NgModule({
  declarations: [
    AppComponent,
    OwIconComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    OverwatchServices,
    FirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
