import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../Todo';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.less']
})
export class EditTodoComponent implements OnInit {
  editingTodo: Todo;

  @Input()
  todo: Todo;
  @Output() closed = new EventEmitter<Todo>();
  @Output() saved = new EventEmitter<Todo>();

  close() {
    this.closed.emit();
  }

  save() {
    this.saved.emit(this.editingTodo);
    this.close();
  }
  constructor() {}

  ngOnInit() {
    this.editingTodo = { ...this.todo };
  }
}
