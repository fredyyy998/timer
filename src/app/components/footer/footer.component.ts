import { Component, Input, OnInit } from '@angular/core';
import { Timer } from '../../models/Timer';
import { Program } from '../../models/Program';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Input() program!: Program;

  @Input() selected: Timer | undefined;

}
