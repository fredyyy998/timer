import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayButtonComponent } from './components/play-button/play-button.component';
import { TimerComponent } from './pages/timer/timer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TimerSelectionComponent } from './pages/timer-selection/timer-selection.component';
import { TimerEditComponent } from './pages/timer-edit/timer-edit.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { TimeInputComponent } from './components/time-input/time-input.component';
import { TrainingTypeRadioGroupComponent } from './components/training-type-radio-group/training-type-radio-group.component';
import { HoldDirective } from './components/hold.directive';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    PlayButtonComponent,
    TimerComponent,
    TimerSelectionComponent,
    TimerEditComponent,
    FooterComponent,
    TimeInputComponent,
    TrainingTypeRadioGroupComponent,
    HoldDirective,
    SnackbarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        FormsModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
