import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Components
import { AppComponent } from './app.component';
import { OwIconComponent } from './shared/components/ow-icon/ow-icon.component';

//Services
import { OverwatchServices } from './shared/services/overwatch.service';

@NgModule({
  declarations: [
    AppComponent,
    OwIconComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
  ],
  providers: [
    OverwatchServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
