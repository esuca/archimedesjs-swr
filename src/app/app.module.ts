import { BrowserModule } from "@angular/platform-browser";
import { Injector, NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import {
  LoggerLink,
  ExecutorLink,
  CacheManager,
  CacheLink,
  Runner
} from "@archimedes/arch";
import { setGlobalInjector } from "./global-injector";
import { TodosListComponent } from "./todos/components/todos-list/todos-list";
import { TotalCompletedTodosComponent } from "./todos/components/total-completed-todos/total-completed-todos";
import { AddTodoComponent } from "./todos/components/add-todo/add-todo";
import { FormsModule } from "@angular/forms";
import { NewCacheLink } from "../archimedes-angular/new-cache-link";

const ARCHIMEDES_PROVIDERS = [
  { provide: LoggerLink, useFactory: () => new LoggerLink(console) },
  { provide: ExecutorLink, useClass: ExecutorLink },
  { provide: CacheManager, useClass: CacheManager },
  {
    provide: CacheLink,
    useClass: CacheLink,
    deps: [CacheManager]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AddTodoComponent,
    TodosListComponent,
    TotalCompletedTodosComponent
  ],
  imports: [BrowserModule, FormsModule],
  providers: [...ARCHIMEDES_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    setGlobalInjector(this.injector);
    const newCacheLink = this.injector.get(NewCacheLink);
    const executorLink = this.injector.get(ExecutorLink);
    // CacheInvalidations.set(AddTodoCmd.name, [GetTodosQry.name]);
    Runner.createChain([newCacheLink, executorLink]);
  }
}
