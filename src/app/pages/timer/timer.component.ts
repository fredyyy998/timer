import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Program } from '../../models/Program';
import { filter, interval, map, mergeMap, Observable, Subject, Subscription, tap, timer } from 'rxjs';
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
  displayTime!:number;

  activeTimer!: Timer;
  activeIndex: number = 0;

  program!: Program;

  private currentInterval!: Subscription;

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
    if (this.activeIndex >= this.program.timers.length) {
      return false;
    }
    this.activeTimer = this.program.timers[timerIndex];
    this.remainingTime = this.program.timers[timerIndex].time;
    this.displayTime = this.remainingTime;
    return true;
  }

  public onTimerStart() {
    if (this.running) {
      this.stopSub()
    } else {
      this.startSub();
    }
  }

  stopSub() {
    this.running = false;
    this.currentInterval.unsubscribe();
  }

  startSub() {
    this.running = true;
    this.currentInterval = timer(0, 1000).pipe(
      map(_ => this.remainingTime--),
      tap(_ => this.setDisplayTime()),
      filter(remainingTime => remainingTime <= 5),
      tap( _ => this.playSound()),
      filter(remainingTime => remainingTime <= 0),
      tap(_ => this.nextTimer())
    ).subscribe();
  }

  setDisplayTime() {
    this.displayTime = this.remainingTime;
    if (this.displayTime < 0) {
      this.displayTime = 0;
    }
  }

  playSound() {
    // the remaining time can be lower than 0 for a clean swap between timers, but we don't want a sound then
    if (this.remainingTime > 0) {
      this.getSound();
    }
    // play a specific sound at the end
    if (this.remainingTime === 0) {
      this.getSound(200);
      setTimeout(() => this.getSound(200), 400);
    }
  }

  nextTimer() {
    if (!this.setTimer(this.activeIndex + 1)) {
      this.stopSub();
    }
  }

  running: boolean = false;

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

  getSound(duration: number = 50): Promise<void> {
    return new Promise((resolve, reject) => {
      // Set default duration if not provided
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
