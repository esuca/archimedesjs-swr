import { BehaviorSubject, Observable, Subject } from "rxjs"
import { Injectable } from "@angular/core"
import { shareReplay } from "rxjs/operators"

@Injectable({ providedIn: "root" })
export class RevalidateQueries {
  private queriesInvalidated: BehaviorSubject<boolean>
  public invalidate$: Observable<boolean>

  constructor() {
    // Can't be a Subject because the @Query decorator does not have time to listen the first execution
    this.queriesInvalidated = new BehaviorSubject<boolean>(false)
    this.invalidate$ = this.queriesInvalidated.asObservable().pipe(shareReplay())
  }

  revalidate() {
    this.queriesInvalidated.next(true)
  }
}
