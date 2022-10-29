import { Component, OnInit } from '@angular/core';
import { mergeMap, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProgramService } from '../../chore/services/program.service';
import { Program } from '../../models/Program';
import { faClock, faPen } from '@fortawesome/free-solid-svg-icons';
import { TimerTypes } from '../../models/Timer';

@Component({
  selector: 'app-timer-edit',
  templateUrl: './timer-edit.component.html',
  styleUrls: ['./timer-edit.component.scss']
})
export class TimerEditComponent implements OnInit {
  faPencil = faPen;
  faTime = faClock;

  program!: Program;
  selectedTimer!: number;
  count: number = 3;

  constructor(private readonly route: ActivatedRoute,
              private readonly programService: ProgramService) { }

  ngOnInit(): void {
    this.route.params.pipe(
      tap(({index}) => this.setIndex(index)),
      mergeMap(({id}) => this.programService.get(id)),
    ).subscribe(program => {
      this.program = program;
    });
  }

  private setIndex(index: any) {
    if (index === 'add') {
      this.program.timers.push({
        type: TimerTypes.training,
        time: 20,
      });
      this.selectedTimer = this.program.timers.length - 1;
    } else {
      this.selectedTimer = index;
    }
  }

  onSubmit() {
    this.programService.updateEntity(this.program)
  }
}
