import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo';
import { TodoService } from '../todo.service';
import { sortWith, ascend, prop } from 'ramda';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.less']
})
export class TodoListComponent implements OnInit {
  filter = {
    hideCompleted: false,
    title: ''
  };
  editingTodo: Todo | null = null;
  todos: Todo[] = [];

  constructor(private todoService: TodoService) {}

  getTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
      this.sortTodos();
    });
  }

  sortTodos() {
    this.todos = sortWith([ascend(prop('completed')), ascend(prop('id'))])(
      this.todos
    );
  }

  ngOnInit() {
    this.getTodos();
  }

  onEdit(todo) {
    this.editingTodo = todo;
  }

  onClose() {
    this.editingTodo = null;
  }

  onSave(todo) {
    if (todo.id) {
      // update
      this.todoService.updateTodo(todo).subscribe(updatedTodo => {
        this.todos = this.todos.map(t =>
          t.id === updatedTodo.id ? updatedTodo : t
        );
        this.sortTodos();
      });
    } else {
      // new
      this.todoService.createTodo(todo).subscribe(newTodo => {
        this.todos = [newTodo, ...this.todos];
        this.sortTodos();
      });
    }
  }

  newTodo() {
    this.editingTodo = {
      title: null,
      description: null,
      completed: false,
      id: null
    };
  }

  onDelete(todo) {
    this.todoService.deleteTodo(todo).subscribe(deletedTodo => {
      this.todos = this.todos.filter(t => t.id !== deletedTodo.id);
      this.sortTodos();
    });
  }

  handleSearchChange(ev) {
    this.filter = { ...this.filter, title: ev.target.value };
  }

  toggleHideCompleted() {
    this.filter = { ...this.filter, hideCompleted: !this.filter.hideCompleted };
  }
}
