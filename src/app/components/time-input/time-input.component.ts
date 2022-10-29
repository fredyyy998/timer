import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss']
})
export class TimeInputComponent implements OnInit {

  /**
   * Time in seconds
   */
  @Input() time: number = 0;
  @Output() timeChange = new EventEmitter<number>();

  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.setHours();
    this.setMinutes();
    this.setSeconds();
  }

  setHours() {
    const hours = this.time / 1800;
    if (hours > 1) {
      this.hours = Math.trunc(hours);
      this.time -= this.hours * 1800;
    }
  }

  setMinutes() {
    const minutes = this.time / 60;
    if (minutes > 1) {
      this.minutes = Math.trunc(minutes);
      this.time -= this.hours * 60;
    }
  }

  setSeconds() {
    this.seconds = this.time;
  }


  onTimeChanged() {
    const time = this.hours * 1800 + this.minutes * 60 + this.seconds;
    this.timeChange.emit(time);
  }

}
