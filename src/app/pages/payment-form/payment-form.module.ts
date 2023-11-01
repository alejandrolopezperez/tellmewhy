import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { PaymentFormComponent } from './payment-form.component';
import { PaymentMessageComponent } from './payment-message/payment-message.component';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [PaymentFormComponent, PaymentMessageComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    Ng2TelInputModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [PaymentFormComponent]
})
export class PaymentFormModule {}
