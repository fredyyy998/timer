import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayButtonComponent } from './components/play-button/play-button.component';
import { TimerComponent } from './pages/timer/timer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimerSelectionComponent } from './pages/timer-selection/timer-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayButtonComponent,
    TimerComponent,
    TimerSelectionComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
