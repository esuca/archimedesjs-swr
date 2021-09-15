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
      if (this.newCacheManager.has(name)) {
        context.result = this.newCacheManager.get(name);
      } else {
        this.newCacheManager.set(name, context.result);
        this.nextLink.next(context);
      }
    }

    // TODO: Invalidate the cache, a qry can invalidate the cache?
    this.invalidateCache(name);
  }

  private invalidateCache(cacheKey: string) {
    CacheInvalidations.invalidations.get(cacheKey)?.forEach((invalidation) => {
      switch (invalidation) {
        default:
          console.log("invalidation", invalidation);
      }
    });
  }
}
