import { Component, Input } from '@angular/core';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-message',
  templateUrl: './contact-message.component.html',
  styleUrls: ['./contact-message.component.scss']
})
export class ContactMessageComponent {
  @Input() show = false;
  faEnvelope = faEnvelope;
}
