import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private _text!: string;

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  private _isOpen: boolean = false;


  get isOpen(): boolean {
    return this._isOpen;
  }

  private set isOpen(value: boolean) {
    this._isOpen = value;
  }

  public open(text: string, time: number = 2000) {
    this.text = text;
    this.isOpen = true;
    setTimeout( _=> this.isOpen = false, time);
  }
}
