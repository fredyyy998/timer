import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Program } from '../../models/Program';
import { mergeMap, Observable, tap, timer } from 'rxjs';
import { ProgramService } from '../../chore/services/program.service';
import { Timer, TimerTypes } from '../../models/Timer';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  private myAudioContext = new AudioContext();

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
        const calc = (Date.now() - startTime) / -1000
        this.remainingTime = Math.round(calc);
        if (this.remainingTime < 5 && calc % 1 === 0) {
          this.playSound();
        }
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

  timerTypeToString(type: number): string {
    switch (type) {
      case TimerTypes.break:
        return 'Break';
      case TimerTypes.training:
        return 'Training';
      default:
        throw new Error('Invalid Type');
    }
  }

  playSound(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Set default duration if not provided
      const duration = 50;
      const frequency = 400;
      const volume = 10;

      try{
        let oscillatorNode = this.myAudioContext.createOscillator();
        let gainNode = this.myAudioContext.createGain();
        oscillatorNode.connect(gainNode);

        // Set the oscillator frequency in hertz
        oscillatorNode.frequency.value = frequency;

        // Set the type of oscillator
        oscillatorNode.type= "square";
        gainNode.connect(this.myAudioContext.destination);

        // Set the gain to the volume
        gainNode.gain.value = volume * 0.01;

        // Start audio with the desired duration
        oscillatorNode.start(this.myAudioContext.currentTime);
        oscillatorNode.stop(this.myAudioContext.currentTime + duration * 0.001);

        // Resolve the promise when the sound is finished
        oscillatorNode.onended = () => {
          resolve();
        };
      }catch(error){
        reject(error);
      }
    });
  }
}
