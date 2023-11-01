import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { AnalyticsService } from './../../core/services/analytics.service';
import { GoogleTagService } from './../../core/services/google-tag.service';

enum STEPS {
  'BASIC',
  'PERSONAL',
  'PAYMENT'
}

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.scss']
})
export class PaymentFormComponent implements OnInit {
  genres: string[] = ['Masculino', 'Femenino', 'No binario', 'Otros'];
  sesiones: string[] = ['1 sesión', '2 sesiones', '3 sesiones', '4 sesiones'];

  basicForm!: FormGroup;
  basicFormDone!: boolean;
  personalForm!: FormGroup;
  paymentForm!: FormGroup;

  step: STEPS = STEPS.BASIC;
  STEPS = STEPS;

  @ViewChild('basicButton') basicButton!: ButtonComponent;
  @ViewChild('personalButton') personalButton!: ButtonComponent;
  @ViewChild('paymentButton') paymentButton!: ButtonComponent;

  password_mismatch = false;
  young = false;
  show = false;
  dateNow: string | null = null;
  showForm = true;
  session = '';
  price = 0;
  plan = '';
  hasPlan = false;
  ahorro = '';
  totalPagar = '';

  get basicFormControls() {
    return this.basicForm.controls;
  }
  get personalFormControls() {
    return this.personalForm.controls;
  }
  get paymentFormControls() {
    return this.paymentForm.controls;
  }

  public get isBasic(): boolean {
    return this.step == STEPS.BASIC;
  }
  public get isPersonal(): boolean {
    return this.step == STEPS.PERSONAL;
  }
  public get isPayment(): boolean {
    return this.step == STEPS.PAYMENT;
  }

  constructor(
    private formBuilder: FormBuilder,
    private _router: ActivatedRoute,
    private analyticsService: AnalyticsService,
    private googleTagService: GoogleTagService
  ) {
    analyticsService.get().subscribe((res) => {
      if (res.body) {
        const data = res.body;

        const basic = data.basic;
        if (basic != null && Object.keys(basic).length > 0) {
          this.basicForm.patchValue({
            name: basic.name,
            lastname: basic.lastname,
            phone: basic.phone,
            email: basic.email
          });
          this.basicForm.markAllAsTouched();
          this.basicFormDone = true;
        }

        const personal = data.personal;
        if (personal != null && Object.keys(personal).length > 0) {
          const birthday = data.personal.birthday.split('T')[0];
          this.personalForm.patchValue({
            birthday: birthday,
            genre: personal.genre,
            session: personal.session
          });
          this.session = personal.session;
          this.personalForm.markAllAsTouched();
        }

        if (data.isPaymentDone) {
          this.show = true;
          this.showForm = false;
          this.step = 2;
        } else if (data.isPersonalDone) {
          this.step = 2;
        } else if (data.isBasicDone) {
          this.step = 1;
        }
      }
    });
  }

  ngOnInit() {
    const datePite = new DatePipe('en-US');
    this.dateNow = datePite.transform(new Date(), 'yyyy-MM-dd');

    window.scrollTo({
      top: 200,
      left: 0,
      behavior: 'smooth'
    });

    this.plan = this._router.snapshot.params['plan'];

    if (this.plan !== undefined) {
      this.hasPlan = true;
      switch (this.plan) {
        case '':
          this.session = '1 sesión';
          break;
        case '1':
          this.session = '1 sesión';
          break;
        case '2':
          this.session = '2 sesiones';
          break;
        case '3':
          this.session = '3 sesiones';
          break;
        case '4':
          this.session = '4 sesiones';
          break;
        default:
          break;
      }
    } else {
      this.session = '1 sesión';
    }

    this.basicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      ],
      terms: ['', [Validators.required, Validators.requiredTrue]]
    });
    this.personalForm = this.formBuilder.group({
      session: ['', Validators.required],
      birthday: ['', Validators.required],
      genre: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
    this.paymentForm = this.formBuilder.group({
      card: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/
          )
        ]
      ],
      holder: ['', [Validators.required, Validators.minLength(2)]],
      expiration: ['', Validators.required],
      code: [
        '',
        [
          Validators.required,
          Validators.maxLength(3),
          Validators.pattern('^[0-9]*$')
        ]
      ]
    });
  }

  // TODO: load from server
  priceSelected(session: string) {
    let price = 0;
    let getSesion = 1;
    this.personalForm.get('session')?.setValue(session);
    switch (session) {
      case '1 sesión':
        price = 35.99;
        break;
      case '2 sesiones':
        getSesion = 2;
        price = 32.99;
        break;
      case '3 sesiones':
        getSesion = 3;
        price = 29.99;
        break;
      case '4 sesiones':
        getSesion = 4;
        price = 27.99;
        break;
      default:
        break;
    }
    if (price === 35.99) {
      this.ahorro = '';
    } else {
      this.ahorro = String(35.99 * getSesion);
      this.totalPagar = String(price * getSesion);
    }
    return price;
  }

  previous() {
    this.step--;
  }

  // if the user change the session, use the personal form to update on server side
  sessionChanged() {
    this.step = 1;
  }

  basic() {
    if (this.step == STEPS.BASIC) {
      if (this.basicForm.invalid) {
        return;
      }
      this.basicButton.showMessage = false;
      if (this.basicFormDone) {
        this.step++;
      } else {
        this.basicButton
          .setRequest(this.analyticsService.submitBasic(this.basicForm))
          .subscribe({
            next: () => {
              this.step++;
              this.googleTagService.addEvent({
                action: `save basic information`,
                category: 'payment',
                label: 'user clicks in payment button',
                non_interaction: false
              });
            },
            error: (error) => {
              if (error.message === 'El email ya esta registrado') {
                this.basicForm.get('email')?.setErrors({ email: true });
              }
            }
          });
      }
    }
  }

  personal() {
    if (this.step == STEPS.PERSONAL) {
      const birthday = new Date(this.personalForm.get('birthday')?.value);
      const dateDiff = Math.abs(Date.now() - birthday.getTime());
      if (Math.floor(dateDiff / (1000 * 3600 * 24) / 365) <= 18) {
        this.young = true;
        return;
      } else {
        this.young = false;
      }
      if (
        this.personalForm.get('password')?.value !==
        this.personalForm.get('confirm_password')?.value
      ) {
        this.password_mismatch = true;
        return;
      } else {
        this.password_mismatch = false;
      }
      if (this.personalForm.invalid) {
        return;
      }

      this.personalButton
        .setRequest(this.analyticsService.submitPersonal(this.personalForm))
        .subscribe(() => {
          this.step++;
          this.googleTagService.addEvent({
            action: `save personal information`,
            category: 'payment',
            label: 'user clicks in payment button',
            non_interaction: false
          });
        });
    }
  }

  payment() {
    if (this.step == STEPS.PAYMENT) {
      if (this.paymentForm.invalid) {
        return;
      } else {
        this.paymentButton
          .setRequest(this.analyticsService.submitPayment())
          .subscribe(() => {
            this.show = true;
            this.showForm = false;
            this.googleTagService.addEvent({
              action: `save card information`,
              category: 'payment',
              label: 'user clicks in payment button',
              non_interaction: false
            });
          });
      }
    }
  }
}
