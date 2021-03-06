import {ChangeDetectionStrategy, Component, Query} from "@angular/core";
import { Observable } from "rxjs";
import { GetTodosQry } from "../../application/get-todos-qry";
import { Todo } from "../../domain/todo";
import { UseQuery } from "src/archimedes-angular/use-query.decorator"

@Component({
  selector: "app-todos-list",
  template: `
    <ul>
      <li *ngFor="let todo of todos | async">
        <span>{{ todo.text }}</span>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListComponent {
  @UseQuery(GetTodosQry)
  todos!: Observable<Todo[]>;
}
