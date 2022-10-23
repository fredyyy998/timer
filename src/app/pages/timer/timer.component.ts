import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Program } from '../../models/Program';
import { mergeMap, Observable, tap } from 'rxjs';
import { ProgramService } from '../../chore/services/program.service';
import { Timer } from '../../models/Timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  remainingTime!: number;

  activeTimer!: Timer;
  activeIndex: number = 0;

  program!: Program;

  constructor(private readonly route: ActivatedRoute,
              private readonly programService: ProgramService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      mergeMap(({id}) => this.programService.get(id)),
    ).subscribe(program => {
      this.program = program;
      this.setTimer(0);
    });
  }

  private setTimer(timerIndex: number): boolean {
    this.activeIndex = timerIndex;
    if (this.activeIndex > this.program.timers.length) {
      return false;
    }
    this.activeTimer = this.program.timers[timerIndex];
    this.remainingTime = this.program.timers[timerIndex].time;
    return true;
  }

  public onTimerStart() {
    if (this.running) {
      this.clearTimer();
    } else {
      this.startTimer();
    }
  }

  timerRef!: NodeJS.Timer;
  running: boolean = false;

  startTimer() {
    this.running = true;
      const startTime = Date.now() - (this.remainingTime * -1000);
      this.timerRef = setInterval(() => {
        this.remainingTime = Math.round ((Date.now() - startTime) / -1000);
        if (this.remainingTime === 0) {
          if(this.setTimer(this.activeIndex+1)) {
            this.clearTimer();
            this.startTimer();
          } else {
            this.clearTimer();
          }
        }
      });
  }

  clearTimer() {
    this.running = false;
    clearInterval(this.timerRef);
  }
}
