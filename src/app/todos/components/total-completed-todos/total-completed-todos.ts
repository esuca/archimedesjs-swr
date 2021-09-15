import { ChangeDetectionStrategy, Component } from "@angular/core";
import { GetTodosQry } from "../../application/get-todos-qry";
import { Observable } from "rxjs";
import { Todo } from "../../domain/todo";
import { map, tap } from "rxjs/operators";
import { Query } from "src/archimedes-angular/query.decorator";

@Component({
  selector: "app-total-completed-todos",
  template: ` <p>Completed todos: {{ totalCompletedTodos$ | async }}</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalCompletedTodosComponent {
  @Query(GetTodosQry)
  todos!: Observable<Todo[]>;

  totalCompletedTodos$ = this.todos.pipe(
    map((todos) => todos.filter((t) => t.isComplete).length),
    tap((v) => console.log("completed", v))
  );
}
