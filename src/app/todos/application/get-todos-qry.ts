import { Injectable } from "@angular/core";
import { TodoHttpRepository } from "../infrastructure/todo-http-repository";
import { Query } from "@archimedes/arch";
import { Todo } from "../domain/todo";

@Injectable({
  providedIn: "root"
})
export class GetTodosQry extends Query<Todo[]> {
  constructor(private readonly todoHttpRepository: TodoHttpRepository) {
    super();
  }

  async internalExecute() {
    return await this.todoHttpRepository.getTodos().toPromise();
  }
}
