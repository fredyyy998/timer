import { Component, OnInit } from '@angular/core';
import { concatWith, mergeMap, Observable, of, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramService } from '../../chore/services/program.service';
import { Program } from '../../models/Program';
import { faClock, faPen } from '@fortawesome/free-solid-svg-icons';
import { TimerTypes } from '../../models/Timer';
import { ToasterService } from '../../chore/services/toaster.service';

@Component({
  selector: 'app-timer-edit',
  templateUrl: './timer-edit.component.html',
  styleUrls: ['./timer-edit.component.scss']
})
export class TimerEditComponent implements OnInit {
  faPencil = faPen;

  program!: Program;
  selectedTimer!: number;
  count: number = 3;
  index: any;

  constructor(private readonly route: ActivatedRoute,
              private readonly programService: ProgramService,
              private readonly router: Router,
              private readonly toaster: ToasterService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      tap(({index}) => this.index = index),
      mergeMap(({id}) => {
        return this.programService.get(id)
      })
    ).subscribe(program => {
      this.program = program;
      this.setSelectedTimer();
    });
  }

  private setSelectedTimer() {
    if (this.index === 'add') {
      this.program.timers.push({
        type: TimerTypes.training,
        time: 20,
      });
      this.selectedTimer = this.program.timers.length - 1;
    } else {
      this.selectedTimer = this.index;
    }
  }

  onSubmit() {
    this.programService.updateEntity(this.program);
    this.toaster.open('Saved Successfully');
    this.router.navigate(['/']);
  }
}
