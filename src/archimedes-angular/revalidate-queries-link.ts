import { Injectable } from "@angular/core";
import { BaseLink, Context } from "@archimedes/arch";
import { NewCacheManager } from "./new-cache-manager";
import { RevalidateQueries } from "src/archimedes-angular/revalidate-queries"

@Injectable({ providedIn: "root" })
export class RevalidateQueriesLink extends BaseLink {
  constructor(private readonly newCacheManager: NewCacheManager, private readonly revalidateQueries: RevalidateQueries) {
    super();
  }

  // If is a command notify cache subscribers about a change in the cache
  next(context: Context): void {
    if (!context.useCase.readonly) {
      context.result?.finally(() => {
        this.revalidateQueries.revalidate()
      })
    }
    this.nextLink.next(context)
  }
}
