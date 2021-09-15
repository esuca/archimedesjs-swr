import { Component } from "@angular/core";
import { AddTodoCmd } from "../../application/add-todo-cmd";

@Component({
  selector: "app-add-todo",
  template: `
    <form>
      <label for="todo-text">Write a new text</label>
      <br />
      <input type="text" id="todo-text" name="text" [(ngModel)]="text" />
    </form>
    <button (click)="addTodo()">
      Add todo
    </button>
  `
})
export class AddTodoComponent {
  text: string = "";

  constructor(private readonly addTodoCmd: AddTodoCmd) {}

  async addTodo() {
    await this.addTodoCmd.execute(this.text);
    this.text = "";
  }
}
