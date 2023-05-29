import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-end-slider',
  standalone: true,
    imports: [CommonModule, FontAwesomeModule],
  templateUrl: './end-slider.component.html',
  styleUrls: ['./end-slider.component.scss']
})
export class EndSliderComponent implements OnInit {
  faTimes = faTimesCircle;

  @Output() onEnd = new EventEmitter();

  @ViewChild('sliderContainer') sliderContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('slideElement') slideElement?: ElementRef<HTMLElement>;

  constructor() { }

  ngOnInit(): void {
  }

  isDragging = false;
  initialX = 0;

  defaultStart = '1em';

  startDrag() {
    this.isDragging = true;
    this.initialX = this.slideElement?.nativeElement.clientWidth || 0;
  }

  handleDrag(event: any) {
    if (this.isDragging) {
     const sliderContainerWidth = this.sliderContainer?.nativeElement.clientWidth || 0;
     const sliderButton = this.slideElement?.nativeElement as HTMLElement;
     const buttonWidth = sliderButton.clientWidth;
     const buttonPosition = parseFloat(sliderButton.style.left) || 0;
     const deltaX = event.center.x - this.initialX;
     const newButtonPosition = buttonPosition + deltaX;
     const maxTranslateX = sliderContainerWidth - buttonWidth;

     if (newButtonPosition >= 0 && newButtonPosition <= maxTranslateX) {
       sliderButton.style.left = newButtonPosition + 'px';
     }

     if (newButtonPosition >= maxTranslateX) {
       this.onEnd.emit();
     }

     this.initialX = event.center.x;
   }
  }

  handleDragEnd() {
    this.isDragging = false;
    this.initialX = 0;
    const sliderButton = this.slideElement?.nativeElement as HTMLElement;
    sliderButton.style.left = this.defaultStart;
  }

}
