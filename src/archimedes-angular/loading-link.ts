import { Injectable } from "@angular/core"
import { BaseLink, Context } from "@archimedes/arch"
import { BehaviorSubject } from "rxjs"

@Injectable({ providedIn: "root" })
export class LoadingLink extends BaseLink {
  private loadingMap = new BehaviorSubject<Record<string, boolean>>({})
  public loadingObs = this.loadingMap.asObservable()

  constructor() {
    super()
  }

  next(context: Context): void {
    this.loadingMap.next({ ...this.loadingMap.value, [context.useCase.constructor.name]: true })

    this.nextLink.next(context)

    context.result?.finally(() => {
      this.loadingMap.next({ ...this.loadingMap.value, [context.useCase.constructor.name]: false })
    })
  }
}
