import { BrowserModule } from "@angular/platform-browser"
import { Injector, NgModule } from "@angular/core"
import { AppComponent } from "./app.component"
import {
  LoggerLink,
  ExecutorLink,
  CacheManager,
  CacheLink,
  Runner, CacheInvalidations
} from "@archimedes/arch"
import { setGlobalInjector } from "./global-injector"
import { TodosListComponent } from "./todos/components/todos-list/todos-list"
import { TotalCompletedTodosComponent } from "./todos/components/total-completed-todos/total-completed-todos"
import { AddTodoComponent } from "./todos/components/add-todo/add-todo"
import { FormsModule } from "@angular/forms"
import { NewCacheLink } from "../archimedes-angular/new-cache-link"
import { AddTodoCmd } from "src/app/todos/application/add-todo-cmd"
import { GetTodosQry } from "src/app/todos/application/get-todos-qry"
import { ObsWithStatusPipe } from "src/archimedes-angular/obs-with-status.pipe"
import { RevalidateQueriesLink } from "src/archimedes-angular/revalidate-queries-link"
import { LoadingLink } from "src/archimedes-angular/loading-link"
import { CategoryTodosListComponent } from "src/app/todos/components/category-todos-list/category-todos-list"

const ARCHIMEDES_PROVIDERS = [
  { provide: LoggerLink, useFactory: () => new LoggerLink(console) },
  { provide: ExecutorLink, useClass: ExecutorLink },
  { provide: CacheManager, useClass: CacheManager },
  {
    provide: CacheLink,
    useClass: CacheLink,
    deps: [CacheManager]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent,
    TodosListComponent,
    TotalCompletedTodosComponent,
    CategoryTodosListComponent,
    ObsWithStatusPipe
  ],
  imports: [BrowserModule, FormsModule],
  providers: [...ARCHIMEDES_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    setGlobalInjector(this.injector)
    const newCacheLink = this.injector.get(NewCacheLink)
    const executorLink = this.injector.get(ExecutorLink)
    const notifyCacheChanges = this.injector.get(RevalidateQueriesLink)
    const loadingLink = this.injector.get(LoadingLink)

    // CacheInvalidations.set(AddTodoCmd.name, [GetTodosQry.name])
    Runner.createChain([newCacheLink, loadingLink, executorLink, notifyCacheChanges])
  }
}
