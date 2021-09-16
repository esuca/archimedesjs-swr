import { ChangeDetectionStrategy, Component } from "@angular/core"
import { AddTodoCmd } from "../../application/add-todo-cmd"
import { Observable } from "rxjs"
import { Loading } from "src/archimedes-angular/loading.decorator"

@Component({
  selector: "app-add-todo",
  template: `
    <form>
      <label for="todo-text">Write a new text</label>
      <br />
      <input type="text" id="todo-text" name="text" [(ngModel)]="text" />
    </form>
    <button (click)="addTodo()" [disabled]="loadingAddTodoCmd | async">
      Add todo
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTodoComponent {
  text: string = "";

  @Loading(AddTodoCmd.name)
  loadingAddTodoCmd!: Observable<boolean>

  constructor(private readonly addTodoCmd: AddTodoCmd) {}

  async addTodo() {
    await this.addTodoCmd.execute(this.text);
    this.text = "";
  }
}
