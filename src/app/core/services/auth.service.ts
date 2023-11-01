import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { catchError, of, tap } from 'rxjs';
import { HttpService } from './http.service';

type AuthResponse = {
  authenticated: boolean;
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpService) {}

  private handleRequest(url: string, body?: unknown) {
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((res) => this.storeIsAuthenticated(res.body?.authenticated ?? false)),
      catchError(() => {
        this.storeIsAuthenticated(false);
        return of(null);
      })
    );
  }

  login(form: FormGroup) {
    return this.handleRequest('/auth/login', form.value);
  }

  signup(form: FormGroup) {
    return this.handleRequest('/auth/signup', form.value);
  }

  private guest() {
    return this.http
      .get<AuthResponse>('/guest')
      .pipe(
        tap((res) => this.storeIsGuested(res.body?.authenticated ?? false)),
        catchError(() => {
          this.storeIsGuested(false);
          return of(null);
        })
      )
      .subscribe();
  }

  check() {
    if (this.isAuthenticated) {
      return this.http.get<AuthResponse>('/auth/check').pipe(
        tap((res) =>
          this.storeIsAuthenticated(res.body?.authenticated ?? false)
        ),
        catchError(() => {
          this.storeIsAuthenticated(false);
          return of(null);
        })
      );
    } else {
      return this.http.get<AuthResponse>('/guest/check').pipe(
        tap((res) => this.storeIsGuested(res.body?.authenticated ?? false)),
        catchError(() => {
          this.storeIsGuested(false);
          return of(null);
        })
      );
    }
  }

  logout() {
    return this.http.post('/auth/logout', {}).pipe(
      tap(() => this.storeIsAuthenticated(false)),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }

  private storeIsAuthenticated(isAuthenticated: boolean) {
    localStorage.setItem('IsAuth', isAuthenticated.toString());
  }

  private storeIsGuested(isGuested: boolean) {
    localStorage.setItem('IsGuest', isGuested.toString());
  }

  get isAuthenticated(): boolean {
    const isAuthenticated = localStorage.getItem('IsAuth');
    return isAuthenticated === 'true';
  }

  get isGuested(): boolean {
    const isGuested = localStorage.getItem('IsGuest');
    return isGuested === 'true';
  }
}
