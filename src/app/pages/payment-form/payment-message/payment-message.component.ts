import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payment-message',
  templateUrl: './payment-message.component.html',
  styleUrls: ['./payment-message.component.scss']
})
export class PaymentMessageComponent {
  @Input() show = false;
}
