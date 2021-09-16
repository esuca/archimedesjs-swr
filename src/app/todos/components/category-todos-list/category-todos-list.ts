import { ChangeDetectionStrategy, Component, Input, Query } from "@angular/core"
import { Observable } from "rxjs";
import { GetTodosQry } from "../../application/get-todos-qry";
import { Todo, TodoCategory } from "../../domain/todo"
import { UseQuery } from "src/archimedes-angular/use-query.decorator"

@Component({
  selector: "app-category-todos-list",
  template: `
    <h4>{{ category }}</h4>
    <ul>
      <li *ngFor="let todo of todos | async">
        <span>{{ todo.text }}</span>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryTodosListComponent {
  @Input()
  category!: TodoCategory

  @UseQuery(GetTodosQry)
  todos!: Observable<Todo[]>;
}
