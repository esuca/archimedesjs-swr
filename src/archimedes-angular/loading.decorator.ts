import { LoadingLink } from "src/archimedes-angular/loading-link"
import { distinctUntilChanged, map, shareReplay, tap } from "rxjs/operators"
import { globalInjector } from "src/app/global-injector"

/**
 * Decorator for showing a loading
 */
export function Loading<T>(useCase: string | string[]): PropertyDecorator {
  return function(target, key): void {
    // variable name
    const name: string = key.toString()

    Object.defineProperties(target, {
      [name]: {
        enumerable: true,
        configurable: true,
        get(): any {
          const loadingLink = globalInjector?.get(LoadingLink) as LoadingLink
          return loadingLink.loadingObs
            .pipe(
              map(obj => {
                // @ts-ignore
                return obj[useCase] ?? false
              }),
              distinctUntilChanged(),
              shareReplay()
            )
        }
      }
    })
  }
}
