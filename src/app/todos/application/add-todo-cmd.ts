import { Injectable } from "@angular/core"
import { Command } from "@archimedes/arch"
import { TodoHttpRepository } from "../infrastructure/todo-http-repository"
import { InvalidateQueriesCache } from "src/archimedes-angular/invalidate-queries-cache"
import { GetTodosQry } from "src/app/todos/application/get-todos-qry"

@InvalidateQueriesCache([GetTodosQry.name])
@Injectable({
  providedIn: "root"
})
export class AddTodoCmd extends Command<string> {
  constructor(private readonly todoHttpRepository: TodoHttpRepository) {
    super()
  }

  async internalExecute(text: string) {
    await this.todoHttpRepository.createTodo(text).toPromise()
  }
}
