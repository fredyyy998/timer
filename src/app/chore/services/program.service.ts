import { Injectable } from '@angular/core';
import { Program } from '../../models/Program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  constructor() { }

  getProgram(): Program {
    return { id: 1, name: 'test', timers: [] }
  }
}
