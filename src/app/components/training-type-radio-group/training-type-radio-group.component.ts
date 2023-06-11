import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TimerTypes} from "../../models/Timer";

@Component({
  selector: 'app-training-type-radio-group',
  templateUrl: './training-type-radio-group.component.html',
  styleUrls: ['./training-type-radio-group.component.scss']
})
export class TrainingTypeRadioGroupComponent {

  @Input() activeType: TimerTypes = TimerTypes.training;
  @Output() activeTypeChange = new EventEmitter<TimerTypes>();

  onActiveTypeChange() {
    this.activeTypeChange.emit(this.activeType);
  }

}
