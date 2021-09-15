import { concat, EMPTY, from, Observable, Subject, combineLatest } from "rxjs";
import { Query as ArchimedesQuery } from "@archimedes/arch";
import { globalInjector } from "../app/global-injector";
import { NewCacheManager } from "./new-cache-manager";

/**
 * Decorator for running the query
 */
export function Query<T>(queryClazz: T): PropertyDecorator {
  const revalidate = new Subject<number>();
  const revalidate$ = revalidate.asObservable();
  let prevResult: Observable<any> = EMPTY;

  return function (target, key): void {
    // variable name
    const name: string = key.toString();

    Object.defineProperties(target, {
      [name]: {
        enumerable: true,
        configurable: true,
        get(): any {
          const cacheInstance = globalInjector?.get(
            NewCacheManager
          ) as NewCacheManager;
          const queryInstance = globalInjector?.get(
            queryClazz
          ) as ArchimedesQuery<any>;
          const cacheKey = queryInstance.constructor.name;

          cacheInstance.subscribe(() => {
            console.count("trigger a refresh");
            // trigger a refresh
            revalidate.next();
          });

          const getQueryObs = (): Observable<any> => {
            if (cacheInstance.has(cacheKey)) {
              console.count("hasCacheKey");
              return cacheInstance.get(cacheKey);
            } else {
              console.count("setCacheKey");
              const obs = concat(prevResult, from(queryInstance.execute()));
              cacheInstance.set(cacheKey, obs);
              prevResult = obs;
              return obs;
            }
          };

          const foo = getQueryObs();

          return combineLatest([revalidate$, foo]);
        }
      }
    });
  };
}

export type PropertyType<T> = T extends (...args: any[]) => any
  ? Observable<ReturnType<T>>
  : any;
