import { Component, Input } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

enum BUTTON_STATES {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

// all the html button types
export type BUTTON_TYPES = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() success?: string;
  @Input() error?: string;
  @Input() type?: BUTTON_TYPES = 'button';

  @Input() disabled = false;
  showMessage = true;
  state: BUTTON_STATES = BUTTON_STATES.IDLE;

  BUTTON_STATES = BUTTON_STATES;

  setRequest<T>(request: Observable<T>) {
    this.state = BUTTON_STATES.LOADING;
    return request.pipe(
      tap((res) => {
        this.state = BUTTON_STATES.SUCCESS;
        setTimeout(() => {
          this.state = BUTTON_STATES.IDLE;
        }, 2000);
        return res;
      }),
      catchError((error) => {
        this.error = error.message;
        if (this.showMessage) this.state = BUTTON_STATES.ERROR;
        setTimeout(() => {
          this.state = BUTTON_STATES.IDLE;
        }, 3000);
        return throwError(() => error);
      })
    );
  }
}
