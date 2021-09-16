import { Component } from "@angular/core";
import { TodoCategory } from "src/app/todos/domain/todo"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  todoCategory: TodoCategory = "Work";
}
