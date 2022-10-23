import { Injectable } from '@angular/core';
import { Program } from '../../models/Program';
import { liveQuery, Observable } from 'dexie';
import * as Rx from 'rxjs';
import { db, ProgramEntity, TimerListEntity } from './db';
import { combineLatest, concatMap, first, map, mergeMap, of, tap, toArray } from 'rxjs';

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

  // addEntity(program: Program): void {
  //   this.db.programs.add(todo.toTodoEntity());
  // }
//
  // deleteEntity(program: Program): void {
  //     this.db.programs.delete(todo.localId);
  // }
//
  // updateEntity(program: Program): void {
  //     this.db.programs.update(todo.localId, todo.toTodoEntity());
  // }
//
  // updateEntityById(id: number, todo: Program) {
  //   this.db.programs.update(id, todo.toTodoEntity());
  // }

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
