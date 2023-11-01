import {
  HttpClient,
  HttpErrorResponse,
  HttpParamsOptions,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(
    url: string,
    options?: HttpParamsOptions
  ): Observable<HttpResponse<T>> {
    const ob: { observe: 'response' } = { observe: 'response' };
    const op = { ...options, ...ob };
    return this.http.get<T>(environment.api + url, op).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.customCatchError(error));
      })
    );
  }

  post<T>(
    url: string,
    body: unknown | null,
    options?: HttpParamsOptions
  ): Observable<HttpResponse<T>> {
    const ob: { observe: 'response' } = { observe: 'response' };
    const op = { ...options, ...ob };
    return this.http.post<T>(environment.api + url, body, op).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.customCatchError(error));
      })
    );
  }

  put<T>(
    url: string,
    body: unknown | null,
    options?: HttpParamsOptions
  ): Observable<HttpResponse<T>> {
    const ob: { observe: 'response' } = { observe: 'response' };
    const op = { ...options, ...ob };
    return this.http.put<T>(environment.api + url, body, op).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.customCatchError(error));
      })
    );
  }

  patch<T>(
    url: string,
    body: unknown | null,
    options?: HttpParamsOptions
  ): Observable<HttpResponse<T>> {
    const ob: { observe: 'response' } = { observe: 'response' };
    const op = { ...options, ...ob };
    return this.http.patch<T>(environment.api + url, body, op).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.customCatchError(error));
      })
    );
  }

  delete<T>(
    url: string,
    options?: HttpParamsOptions
  ): Observable<HttpResponse<T>> {
    const ob: { observe: 'response' } = { observe: 'response' };
    const op = { ...options, ...ob };
    return this.http.delete<T>(environment.api + url, op).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => this.customCatchError(error));
      })
    );
  }

  customCatchError(error: HttpErrorResponse) {
    this.handleAndSendError(error);
    return new Error(error.error.message || 'Ocurrió un error');
  }

  private handleAndSendError(error: HttpErrorResponse): void {
    this.http.post(environment.api + '/handler', error).subscribe();
  }
}
