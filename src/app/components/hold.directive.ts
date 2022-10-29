import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appHold]'
})
export class HoldDirective {

  @Output('hold') onHold = new EventEmitter();

  timeoutHandler!: any;

  @HostListener('mouseup')
  public mouseup() {
    this.stopTimeOut();
  }

  @HostListener('mousedown')
  public mousedown() {
    this.startTimeout();
  }

  @HostListener('pointerdown')
  public pointerDown() {
    this.startTimeout();
  }

  @HostListener('pointerup')
  public pointerUp() {
    this.stopTimeOut();
  }

  public startTimeout() {
    this.timeoutHandler = setTimeout(() => {
      this.onHold.emit();
      this.timeoutHandler = null;
    }, 500);
  }

  public stopTimeOut() {
    if (this.timeoutHandler) {
      clearTimeout(this.timeoutHandler);
      this.timeoutHandler = null;
    }
  }
}
