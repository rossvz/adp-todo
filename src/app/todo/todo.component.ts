import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.less']
})
export class TodoComponent implements OnInit {
  @Input()
  todo: Todo;

  @Output() editing = new EventEmitter<Todo>();
  @Output() saved = new EventEmitter<Todo>();
  @Output() deleted = new EventEmitter<Todo>();

  edit() {
    this.editing.emit(this.todo);
  }

  delete() {
    this.deleted.emit(this.todo);
  }

  constructor() {}

  ngOnInit() {}

  toggleTodo(todo) {
    this.todo = { ...todo, completed: !todo.completed };
    this.saved.emit(this.todo);
  }
}
