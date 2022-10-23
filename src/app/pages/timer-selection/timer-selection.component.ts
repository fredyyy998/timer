import { Component, OnInit } from '@angular/core';
import { Program } from '../../models/Program';
import { ProgramService } from '../../chore/services/program.service';

@Component({
  selector: 'app-timer-selection',
  templateUrl: './timer-selection.component.html',
  styleUrls: ['./timer-selection.component.scss']
})
export class TimerSelectionComponent implements OnInit {

  selectedProgram!: Program;
  programs: Program[] = [];
  constructor(private readonly programService: ProgramService) {
  }

  ngOnInit(): void {
    this.programService.listData().subscribe(res => {
      this.programs = res;
      this.selectedProgram = this.programs[0];
    })
  }
}
