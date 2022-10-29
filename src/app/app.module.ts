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

@NgModule({
  declarations: [
    AppComponent,
    PlayButtonComponent,
    TimerComponent,
    TimerSelectionComponent,
    TimerEditComponent,
    FooterComponent,
    TimeInputComponent,
    TrainingTypeRadioGroupComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
