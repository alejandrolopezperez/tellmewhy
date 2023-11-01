import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contact!: FormGroup;
  showForm = true;
  show = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    window.scrollTo({
      top: 200,
      left: 0,
      behavior: 'smooth'
    });

    this.contact = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      correo: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      ],
      asunto: ['', Validators.required]
    });
  }

  get contact_form() {
    return this.contact.controls;
  }

  sendData() {
    this.show = true;
    this.showForm = false;
    console.log('VALUES 1: ', this.contact.value);
  }
}
