export type TodoCategory =  'Work' | 'Home' | 'Groceries'

export interface Todo {
  id: number;
  text: string;
  isComplete: boolean;
  category: TodoCategory
}
