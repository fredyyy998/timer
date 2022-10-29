import { Injectable } from '@angular/core';
import { Program } from '../../models/Program';
import { liveQuery, Observable } from 'dexie';
import * as Rx from 'rxjs';
import { combineLatest, concatMap, first, map, mergeMap, of, toArray } from 'rxjs';
import { db, ProgramEntity, TimerListEntity } from './db';
import { TimerTypes } from '../../models/Timer';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  protected db = db;

  constructor() { }

  public listData(): Rx.Observable<Program[]> {
    return this.prepareProgram(
      this.dexieToRx<ProgramEntity[]>(
      liveQuery(() => this.db.programs.toArray())
    ).pipe(
      first(),
      concatMap(e => e),
    )).pipe(toArray());
  }

  public get(id: number) {
    return this.prepareProgram(
      this.dexieToRx<ProgramEntity>(
        liveQuery(() => this.db.programs.where({
          id: 1,
        }).first())
      )
    )
  }

  private listTimers(programId: number | undefined) {
    if (!programId) {
      return of([]);
    }
    return this.dexieToRx<TimerListEntity[]>(
      liveQuery(() => this.db.timers.where({programId}).toArray())
    ).pipe(first());
  }

  private prepareProgram(observable: Rx.Observable<ProgramEntity>): Rx.Observable<Program> {
    return observable.pipe(
      mergeMap((e: ProgramEntity) => combineLatest(of(e), this.listTimers(e.id))),
      map(([resultA, resultB]) => {
        return {
          id: resultA.id,
          name: resultA.name,
          timers: resultB.map(e => {
            return {
              time: e.time,
              type: e.type
            }
          })
        } as Program
      }),
    );
  }

  updateEntity(program: Program): void {
    if (program.id) {
      this.db.programs.update(program.id, program);
      this.updateTimers(program);
    }
  }

  private async updateTimers(program: Program) {
    await this.db.timers.where({programId: program.id}).delete();
    const timers: TimerListEntity[] = program.timers.map(timer => {
      return {
        programId: program.id,
        time: timer.time,
        type: timer.type
      } as TimerListEntity
    })
    this.db.timers.bulkAdd(timers)
  }


  deleteEntity(program: Program, timerIndex: number): void {
    program.timers.splice(timerIndex, 1);
    this.updateTimers(program);
  }


  private dexieToRx<T>(o: Observable): Rx.Observable<T> {
    return new Rx.Observable<T>(observer => {
      const subscription = o.subscribe({
        next: value => observer.next(value),
        error: error => observer.error(error),
      });
      return () => subscription.unsubscribe();
    });
  }
}
