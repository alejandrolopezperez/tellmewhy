import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  NgcCookieConsentService,
  NgcInitializationErrorEvent,
  NgcInitializingEvent,
  NgcNoCookieLawEvent,
  NgcStatusChangeEvent
} from 'ngx-cookieconsent';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnalyticsService } from './core/services/analytics.service';
import { AuthService } from './core/services/auth.service';
import { GoogleTagService } from './core/services/google-tag.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Tell Me Why';
  googleAnalyticsLoaded = false;
  googleAnalyticsScript?: HTMLScriptElement;

  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;

  constructor(
    router: Router,
    googleTagService: GoogleTagService,
    authService: AuthService,
    analyticsService: AnalyticsService,
    private cookieService: NgcCookieConsentService
  ) {
    router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        googleTagService.afterChangeRoute(evt);
      }
    });

    authService.check().subscribe();
  }

  private setupGoogleAnalytics() {
    if (this.googleAnalyticsLoaded) return;
    this.googleAnalyticsLoaded = true;

    const srcGoogleAnalytics =
      'https://www.googletagmanager.com/gtag/js?id=' + environment.google;
    this.googleAnalyticsScript = document.createElement('script');
    this.googleAnalyticsScript.setAttribute('src', srcGoogleAnalytics);
    this.googleAnalyticsScript.setAttribute('async', '');
    document.head.appendChild(this.googleAnalyticsScript);
  }

  private removeGoogleAnalytics() {
    if (!this.googleAnalyticsLoaded) return;
    this.googleAnalyticsLoaded = false;
    this.googleAnalyticsScript?.remove();
  }

  ngOnInit() {
    this.popupOpenSubscription = this.cookieService.popupOpen$.subscribe(() => {
      // you can use this.cookieService.getConfig() to do stuff...
    });

    this.popupCloseSubscription = this.cookieService.popupClose$.subscribe(
      () => {
        // you can use this.cookieService.getConfig() to do stuff...
      }
    );

    this.initializingSubscription = this.cookieService.initializing$.subscribe(
      (event: NgcInitializingEvent) => {
        // the cookieconsent is initilializing... Not yet safe to call methods like `NgcCookieConsentService.hasAnswered()`
        console.log(`initializing: ${JSON.stringify(event)}`);
      }
    );

    this.initializedSubscription = this.cookieService.initialized$.subscribe(
      () => {
        // the cookieconsent has been successfully initialized.
        // It's now safe to use methods on NgcCookieConsentService that require it, like `hasAnswered()` for eg...
        console.log(`initialized: ${JSON.stringify(event)}`);
      }
    );

    this.initializationErrorSubscription =
      this.cookieService.initializationError$.subscribe(
        (event: NgcInitializationErrorEvent) => {
          console.log(
            `initializationError: ${JSON.stringify(event.error?.message)}`
          );
        }
      );

    this.statusChangeSubscription = this.cookieService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.cookieService.getConfig() to do stuff...
        localStorage.setItem(
          'canUseCookies',
          event.status === 'allow' ? 'true' : 'false'
        );
        if (event.status === 'allow') {
          this.setupGoogleAnalytics();
        } else {
          this.removeGoogleAnalytics();
        }
      }
    );

    this.revokeChoiceSubscription = this.cookieService.revokeChoice$.subscribe(
      () => {
        localStorage.setItem('canUseCookies', 'false');
      }
    );

    this.noCookieLawSubscription = this.cookieService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        localStorage.setItem('canUseCookies', 'false');
      }
    );
  }

  ngOnDestroy() {
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializingSubscription.unsubscribe();
    this.initializedSubscription.unsubscribe();
    this.initializationErrorSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }
}
