import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './Todo';

interface Filter {
  title: string;
  hideCompleted: boolean;
}

@Pipe({
  name: 'todoSearch'
})
export class TodoSearchPipe implements PipeTransform {
  transform(todos: Todo[], filter: Filter): any {
    return todos.filter(todo => {
      console.log(filter);
      return filter.hideCompleted
        ? !todo.completed
        : filter.title !== ''
        ? todo.title.includes(filter.title)
        : todo;
    });
  }
}
