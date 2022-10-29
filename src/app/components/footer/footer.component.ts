import { Component, Input, OnInit } from '@angular/core';
import { Timer } from '../../models/Timer';
import { Program } from '../../models/Program';
import { ProgramService } from '../../chore/services/program.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Input() program!: Program;

  @Input() selected: Timer | undefined;

  constructor(private readonly programService: ProgramService) {
  }

  onHold(index: number) {
    if (confirm('Delete the timer?')) {
      this.programService.deleteEntity(this.program, index)
    }
  }
}
