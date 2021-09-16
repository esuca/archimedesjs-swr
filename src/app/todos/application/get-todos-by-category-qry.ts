import { Injectable } from "@angular/core";
import { Query } from "@archimedes/arch"
import { Todo, TodoCategory } from "../domain/todo"
import { InvalidateQueriesCache } from "src/archimedes-angular/invalidate-queries-cache"
import { GetTodosQry } from "src/app/todos/application/get-todos-qry"

@InvalidateQueriesCache()
@Injectable({
  providedIn: "root"
})
export class GetTodosByCategory extends Query<Todo[], TodoCategory> {
  constructor(private readonly getTodosQry: GetTodosQry) {
    super();
  }

  async internalExecute(category: TodoCategory) {
    const todos = await this.getTodosQry.execute()
    return todos.filter(t => t.category === category)
  }
}
