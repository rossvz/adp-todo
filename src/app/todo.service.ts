import { Injectable } from '@angular/core';
import { Todo } from './Todo';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8383/todos';
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${todo.id}`;
    return this.http.put<Todo>(url, todo);
  }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, todo);
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const url = `${this.apiUrl}/${todo.id}`;

    return this.http.delete<Todo>(url);
  }
}

// [
//   {
//     title: 'Do The Thing',
//     description: 'here is the description',
//     complete: false,
//     id: 1
//   },
//   {
//     title: 'Do Another Thing',
//     description:
//       'here is the description. This one is a little longer obviously.',
//     complete: false,
//     id: 2
//   },
//   {
//     title: 'Do Another Thing',
//     description:
//       'here is the description. This one is a little longer obviously.',
//     complete: false,
//     id: 3
//   },
//   {
//     title: 'Do Another Thing',
//     description:
//       'here is the description. This one is a little longer obviously.',
//     complete: false,
//     id: 3
//   }
// ]
