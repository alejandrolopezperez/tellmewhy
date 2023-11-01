import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { EmtionsComponent } from './pages/emotions/emotions.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/home/pages/login/login.component';
import { SignupComponent } from './pages/home/pages/signup/signup.component';
import { PaymentFormComponent } from './pages/payment-form/payment-form.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './pages/terms-conditions/terms-conditions.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'pago',
    component: PaymentFormComponent,
    pathMatch: 'full'
  },
  {
    path: 'emociones/:title',
    component: EmtionsComponent
  },
  {
    path: 'terminos-y-condiciones',
    component: TermsConditionsComponent,
    pathMatch: 'full'
  },
  {
    path: 'politica-de-privacidad',
    component: PrivacyPolicyComponent,
    pathMatch: 'full'
  },
  {
    path: 'contacto',
    component: ContactComponent,
    pathMatch: 'full'
  },
  {
    path: 'inscribirse',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'acceso',
    component: LoginComponent,
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'ignore',
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
