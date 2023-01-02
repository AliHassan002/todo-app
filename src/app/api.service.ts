import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Http, Response } from '@angular/http';
import { Todo } from './todo';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import { catchError, map, retry } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';  // debug
import 'rxjs/add/operator/catch';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';



const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(
    private http: Http
  ) {
  }

  //public getAllTodos(): Observable<Todo[]> {
  // return this.http
  //   .get(API_URL + '/todos')
  //   .pipe(
  //     map(response => {
  //       const todos = response.json();
  //       return todos.map((todo) => new Todo(todo));
  //     })
  //   )
  //   .catchError(this.handleError('',));

  //}


  getConfig() {
    return this.http.get<Todo[]>(this.'/todos')
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  public createTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post(API_URL + '/todos', todo)
      .pipe(
        map(response => {
          return new Todo(response.json());
        })
      )
      .catch(this.handleError);

  }

  public getTodoById(todoId: number): Observable<Todo> {
    return this.http
      .get(API_URL + '/todos/' + todoId)
      .pipe(
        map(response => {
          return new Todo(response.json());
        })
      )
      .catch(this.handleError);

  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return this.http
      .put(API_URL + '/todos/' + todo.id, todo)
      .pipe(
        map(response => {
          return new Todo(response.json());
        })
      )

      .catch(this.handleError);
  }

  public deleteTodoById(todoId: number): Observable<null> {
    return this.http
      .delete(API_URL + '/todos/' + todoId)
      .pipe(map(response => null))

      .catch(this.handleError);

  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return throwError("Your error");
  }


}
