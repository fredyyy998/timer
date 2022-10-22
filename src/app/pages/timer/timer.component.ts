import { Component, OnInit } from '@angular/core';
import { Program } from "../../models/Program";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {

  program!: Program;

  remainingTime!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
