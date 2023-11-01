import { Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import {
  GEvent,
  GEventException,
  GEventPurchase,
  GEventTiming,
  GEventUserID,
  GEventViewItem,
  GEventViewPromotion
} from 'src/app/shared/interfaces/analytics';
import { environment } from 'src/environments/environment';
import { AnalyticsService } from './analytics.service';

// eslint-disable-next-line @typescript-eslint/ban-types
declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GoogleTagService {
  constructor(private analyticsService: AnalyticsService) {}

  private canUseCookies() {
    return this.analyticsService.canUseCookies();
  }

  afterChangeRoute(evt: NavigationEnd) {
    if (!this.canUseCookies()) return;
    gtag('config', environment.google, {
      page_path: evt.urlAfterRedirects
    });
    if (!environment.production) console.log(evt.urlAfterRedirects);
  }

  addEvent(event: GEvent = { non_interaction: false }) {
    if (!this.canUseCookies()) return;
    if (!environment.production) console.log(event);

    gtag('event', event.action?.toLocaleLowerCase().replaceAll(' ', '_'), {
      event_category: event.category,
      event_label: event.label,
      non_interaction: event.non_interaction
    });
  }

  addTimingEvent(event: GEventTiming) {
    if (!this.canUseCookies()) return;
    if (!environment.production) console.log(event);

    gtag('event', 'timing_complete', {
      name: event.name,
      value: event.value,
      event_category: event.category,
      event_label: event.label
    });
  }

  addException(event: GEventException) {
    if (!this.canUseCookies()) return;
    if (!environment.production) console.log(event);

    gtag('event', 'exception', {
      description: event.description,
      fatal: event.fatal || false
    });
  }

  setID(event: GEventUserID) {
    if (!this.canUseCookies()) return;
    if (!environment.production) console.log(event);

    gtag('config', environment.google, {
      user_id: 'USER_ID'
    });
  }

  viewPromotion(event: GEventViewPromotion[]) {
    if (!this.canUseCookies()) return;
    if (!environment.production) console.log(event);

    gtag('event', 'view_promotion', {
      promotions: event
    });
  }

  viewItem(event: GEventViewItem[]) {
    if (!this.canUseCookies()) return;
    if (!environment.production) console.log(event);

    gtag('event', 'view_item', {
      items: event
    });
  }

  viewItemList(event: GEventViewItem[]) {
    if (!this.canUseCookies()) return;
    if (!environment.production) console.log(event);

    gtag('event', 'view_item_list', {
      items: event
    });
  }

  beginCheckout(event: GEventViewItem[], coupon?: string) {
    if (!this.canUseCookies()) return;
    if (!environment.production) console.log(event);

    gtag('event', 'begin_checkout', {
      items: event,
      coupon: coupon
    });
  }

  checkoutProgress(event: GEventViewItem[], coupon?: string) {
    if (!this.canUseCookies()) return;
    if (!environment.production) console.log(event);

    gtag('event', 'checkout_progress', {
      items: event,
      coupon: coupon
    });
  }

  purchase(event: GEventPurchase) {
    if (!this.canUseCookies()) return;
    if (!environment.production) console.log(event);

    gtag('event', 'purchase', event);
  }
}
