import { Injectable } from "@angular/core";
import { Command } from "@archimedes/arch";
import { TodoHttpRepository } from "../infrastructure/todo-http-repository";

@Injectable({
  providedIn: "root"
})
export class AddTodoCmd extends Command<string> {
  constructor(private readonly todoHttpRepository: TodoHttpRepository) {
    super();
  }

  async internalExecute(text: string) {
    await this.todoHttpRepository.createTodo(text).toPromise();
  }
}
