import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";
import { Todo } from "../domain/todo";

let todos: Todo[] = [
  { id: 1, text: "Task A", isComplete: true },
  { id: 2, text: "Task B", isComplete: false }
];

@Injectable({
  providedIn: "root"
})
export class TodoHttpRepository {
  getTodos(): Observable<Todo[]> {
    return of(todos).pipe(delay(500));
  }

  createTodo(name: string) {
    const newTodo: Todo = {
      id: Math.random(),
      text: name,
      isComplete: true
    };

    todos = [...todos, newTodo];

    return of(todos).pipe(delay(500));
  }
}
