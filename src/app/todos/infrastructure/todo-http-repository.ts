import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { delay, map, switchMap, tap } from "rxjs/operators"
import { Todo } from "../domain/todo"

let todos: Todo[] = [
  { id: 1, text: "Task A", isComplete: true, category: 'Work' },
  { id: 2, text: "Task B", isComplete: false, category: "Work" }
]

@Injectable({
  providedIn: "root"
})
export class TodoHttpRepository {
  getTodos(): Observable<Todo[]> {
    console.log('todos', todos)
    return of(todos).pipe(delay(1000))
  }

  createTodo(name: string) {
    return of(todos).pipe(delay(500), tap(() => {
      const newTodo: Todo = {
        id: Math.random(),
        text: name,
        isComplete: true,
        category: "Home"
      }

      todos = [...todos, newTodo]
    }), switchMap(() => {
      return of(todos)
    }))
  }
}
