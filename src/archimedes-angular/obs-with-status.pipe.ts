import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, tap } from "rxjs/operators"

export interface ObsWithStatusResult<T> {
  loading?: boolean;
  value?: T;
  error?: string;
}

const defaultError = 'Something went wrong';

@Pipe({
  name: 'obsWithStatus',
})
export class ObsWithStatusPipe implements PipeTransform {
  transform<T = any>(val: Observable<T>): Observable<ObsWithStatusResult<T>> {
    return val.pipe(
      map((value: any) => ({
        loading: value.type === 'start',
        value: value.type ? value.value : value
      })),
      startWith({ loading: true }),
      catchError(error => of({ loading: false, error }))
    );
  }
}
