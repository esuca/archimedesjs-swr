import { from, Observable } from "rxjs"
import { Query as ArchimedesQuery } from "@archimedes/arch"
import { globalInjector } from "../app/global-injector"
import { distinctUntilChanged, shareReplay, switchMap } from "rxjs/operators"
import { NewCacheManager } from "src/archimedes-angular/new-cache-manager"
import { RevalidateQueries } from "src/archimedes-angular/revalidate-queries"

/**
 * Decorator for running the query
 */
export function UseQuery<T>(queryClazz: T): PropertyDecorator {
  return function(target, key): void {
    // variable name
    const name: string = key.toString()

    Object.defineProperties(target, {
      [name]: {
        enumerable: true,
        configurable: true,
        get(): any {
          const invalidateQueries = globalInjector?.get(RevalidateQueries) as RevalidateQueries
          const cacheManager = globalInjector?.get(NewCacheManager) as NewCacheManager
          const queryInstance = globalInjector?.get(queryClazz) as ArchimedesQuery<any>

          const queryKey = queryInstance.constructor.name
          return invalidateQueries.invalidate$.pipe(
            switchMap(() => {
              if (!cacheManager.has(queryKey)) {
                const query = from(queryInstance.execute()).pipe(shareReplay())
                cacheManager.set(queryKey, query)
                return query
              } else {
                return cacheManager.get(queryKey)
              }
            }),
            distinctUntilChanged()
          )
        }
      }
    })
  }
}

export type PropertyType<T> = T extends (...args: any[]) => any
  ? Observable<ReturnType<T>>
  : any;


// Loading https://nils-mehlhorn.de/posts/indicating-loading-the-right-way-in-angular
