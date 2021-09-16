Stale while revalidate en Archimedes

Objetivos:

- Decorador @UseQuery que ejecuta la query cuando el componente se monta o cuando la caché de esa qry se invalida
- Loading status local a esa query y no global.

AddTodoCmd invalida la query GetTodosQry al ejecutarse.

TodoListComponent:

```ts
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
```

1. [x] @UseQuery(GetTodosQry) sin argumentos
2. [] @UseQuery(GetFilteredTodos, { isCompleted: true }) con argumentos
3. [] @UseQuery(GetFilteredTodos, obs) con un observable

Problemas:

- Al ejecutar `AddTodoCmd` pasa por el CacheLink que invalida las Queries definidas en CacheInvalidations manualmente o
  automáticamente con el decorador @InvalidateQueriesCache. Esto esta bien ya que dentro del método execute del cmd
  puede que usemos una de esas queries y no queremos que esté cacheada. El problema está en que se notifica la
  invalidación antes de ejecutar el método execute y no después. La notificación debería ser después de ejecutar el cmd.

Se me ocurre crear un Link que detecte si el caso de uso es un CMD, y de ser así notificar después de ejecutar el execute para que los componentes se actualicen.
NotifyQueryInvalidationsLink.
