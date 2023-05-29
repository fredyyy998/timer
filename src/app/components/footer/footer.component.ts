import { Component, Input } from '@angular/core';
import { Timer } from '../../models/Timer';
import { Program } from '../../models/Program';
import { ProgramService } from '../../chore/services/program.service';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  faPlus = faPlus;

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
