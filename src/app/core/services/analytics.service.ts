import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpService } from './http.service';

type AnalyticsResponse = {
  isBasicDone: boolean;
  isPersonalDone: boolean;
  isPaymentDone: boolean;

  basic: {
    name: string;
    lastname: string;
    phone: string;
    email: string;
  };

  personal: {
    birthday: string;
    genre: string;
    session: string;
  };
};

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private httpService: HttpService) {}

  canUseCookies() {
    switch (localStorage.getItem('canUseCookies')) {
      case 'true':
        return true;
      case 'false':
        return false;
      default:
        return null;
    }
  }

  submitBasic(form: FormGroup) {
    return this.httpService.post('/analytics/basic', form.value);
  }

  submitPersonal(form: FormGroup) {
    return this.httpService.post('/analytics/personal', form.value);
  }

  submitPayment() {
    return this.httpService.post('/analytics/payment', {});
  }

  get() {
    return this.httpService.get<AnalyticsResponse>('/analytics');
  }
}
