import { Injectable } from "@angular/core";
import { BaseLink, CacheInvalidations, Context } from "@archimedes/arch";
import { NewCacheManager } from "./new-cache-manager";

@Injectable({ providedIn: "root" })
export class NewCacheLink extends BaseLink {
  constructor(private readonly newCacheManager: NewCacheManager) {
    super();
  }

  next(context: Context): void {
    const name = context.useCase.constructor.name;

    // only check the cache if it is a query
    if (context.useCase.readonly) {
      console.log('is query')
      if (this.newCacheManager.has(name)) {
        console.log('query is cached')
        context.result = this.newCacheManager.get(name);
      } else {
        console.log('query is not cached')
        this.newCacheManager.set(name, context.result);
        this.nextLink.next(context);
      }
    }

    // TODO: Invalidate the cache, a qry can invalidate the cache?
    this.invalidateCache(name);
    this.nextLink.next(context);
  }

  private invalidateCache(cacheKey: string) {
    console.log('invalidate queries cache', CacheInvalidations.invalidations)
    CacheInvalidations.invalidations.get(cacheKey)?.forEach((invalidation) => {
      switch (invalidation) {
        default:
          // queriestoinvalidate
          console.log("invalidate qry:", invalidation);
          // @ts-ignore
          this.newCacheManager.delete(invalidation)
      }
    });
  }
}
