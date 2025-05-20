import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface SenderParams<T = any> {
  url: string;
  data?: T;
  token?: string | null;
  method?: HttpMethod;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http : HttpClient) { }

  sender<T = any>({url, data, token = null, method = "POST"} : SenderParams) : Observable<T | null>
  {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }


    const options = {headers};

    let request$: Observable<any>;

    switch (method) {
      case 'GET':
        request$ = this.http.get(url, options);
        break;
      case 'POST':
        request$ = this.http.post(url, data, options);
        break;
      case 'PUT':
        request$ = this.http.put(url, data, options);
        break;
      case 'DELETE':
        request$ = this.http.delete(url, options);
        break;
      case 'PATCH':
        request$ = this.http.patch(url, data, options);
        break;
      default:
        return of(null);
    }

    return request$.pipe(
      map(res => (res?.data ?? null) as T),
      catchError(err => {
        if (err.status === 401) {
          //localStorage.removeItem('auth');
          //window.location.href = '/';
          return of(null);
        }
        return of(null);
      })
    );

  }

}
