import { Injectable } from '@angular/core';
import { Todo } from './Todo';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    const url = `${this.apiUrl}/todos`;
    return this.http.get<Todo[]>(url);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/todos/${todo.id}`;
    return this.http.put<Todo>(url, todo);
  }

  createTodo(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/todos`;
    return this.http.post<Todo>(url, todo);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/todos/${todo.id}`;

    return this.http.delete<Todo>(url);
  }
}
