import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Query } from "src/archimedes-angular/query.decorator";
import { GetTodosQry } from "../../application/get-todos-qry";
import { Todo } from "../../domain/todo";

@Component({
  selector: "app-todos-list",
  template: `
    <ul>
      <li *ngFor="let todo of todos | async">
        <span>{{ todo.text }}</span>
      </li>
    </ul>
  `
})
export class TodosListComponent {
  @Query(GetTodosQry)
  todos!: Observable<Todo[]>;
}
