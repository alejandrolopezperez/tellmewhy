import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Ng2TelInputModule } from 'ng2-tel-input';
import {
  NgcCookieConsentConfig,
  NgcCookieConsentModule
} from 'ngx-cookieconsent';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderComponent } from './core/header/header.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ContactModule } from './pages/contact/contact.module';
import { EmotionsModule } from './pages/emotions/emotions.module';
import { HomeModule } from './pages/home/home.module';
import { PaymentFormModule } from './pages/payment-form/payment-form.module';
import { PrivacyPolicyModule } from './pages/privacy-policy/privacy-policy.module';
import { TermsConditionsModule } from './pages/terms-conditions/terms-conditions.module';
import { SharedModule } from './shared/shared.module';

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: environment.domain
  },
  position: 'bottom-right',
  palette: {
    popup: {
      text: '#252e39',
      background: 'white'
    },
    button: {
      background: '#252e39'
    }
  },
  content: {
    message:
      'Este sitio web utiliza cookies para mejorar tu experiencia de navegación y ofrecerte contenido personalizado',
    href: '/politica-de-privacidad',
    link: 'Leer más',
    allow: 'Permitir cookies',
    deny: 'Rechazar'
  },
  theme: 'classic',
  type: 'opt-in'
};

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SharedModule,
    PaymentFormModule,
    EmotionsModule,
    TermsConditionsModule,
    PrivacyPolicyModule,
    ContactModule,
    HttpClientModule,
    Ng2TelInputModule,
    NgcCookieConsentModule.forRoot(cookieConfig)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
