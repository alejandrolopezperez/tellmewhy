import {
  Component,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { GoogleTagService } from 'src/app/core/services/google-tag.service';

type FrequentQuestion = {
  id: number;
  pregunta: string;
  respuesta: string;
  isOpen: boolean;
};
type SliderCustomer = {
  image: string;
  nombre: string;
  descripcion: string;
  valoracion: number;
  opinion: string;
};
type SliderPsicologos = {
  image: string;
  aresas: string[];
  nombre: string;
  valoracion: number;
  views: string;
  descripcion: string;
};

type ComparacionTerapiaPresencial = {
  titulo: string;
  descripcion: string;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  myInterval = 15000;
  activeSlideIndex = 0;
  slideIndexTablet = 0;
  customerInterval = 15000;
  activeSlideIndexCustomer = 0;
  activeSlideIndexCustomerTablet = 0;
  frequentQuestions = [
    // {
    //   id: 1,
    //   pregunta: '¿Quiénes son los psicólogos y las psicólogas?',
    //   respuesta:
    //     'En Tell Me Why ofrecemos acceso únicamente a profesionales con el Grado en Psicología, y el Máster en Psicología General Sanitaria o certificación PIR, colegiados en su respectivo Colegio Profesional y que cuenten con el Seguro de Responsabilidad Civil.',
    //   isOpen: false
    // },
    {
      id: 2,
      pregunta: '¿Podré cambiar de psicólogo o psicóloga?',
      respuesta:
        'Sí. Es habitual cambiar de terapeuta hasta encontrar al psicólogo o psicóloga con la que sientas que tienes una buena conexión terapéutica. Avisando en un plazo de tiempo superior a 48h hasta la sesión que quieras modificar, siempre podrás cambiar de terapeuta.',
      isOpen: false
    },
    {
      id: 3,
      pregunta: '¿Cómo sé que Tell Me Why es adecuado para mí?',
      respuesta:
        'Somos tu lugar seguro para acompañarte a conocer las herramientas con las que construyas la vida que quieras tener. Es importante mencionar que en Tell Me Why no tratamos los siguientes temas: Agresiones sexuales recientes, Violencia de género, Ideación suicida o intentos de suicidio, Consumo abusivo de sustancias y Trastornos de la conducta alimentaria avanzados.',
      isOpen: false
    },
    // {
    //   id: 4,
    //   pregunta: '¿Cuánto cuesta ir a terapia?',
    //   respuesta:
    //     'Sabemos que el precio de ir a terapia no hace justicia a la inmensa necesidad de apoyo psicológico que tiene nuestra sociedad a día de hoy en día. En Tell Me Why, con nuestro pack más asequible, la sesión cuesta 33,99€. Y con nuestro pack más completo, tu sesión costará solamente 27,99€. ',
    //   isOpen: falseeee
    // },
    {
      id: 5,
      pregunta: '¿Cuántas sesiones suelen ser necesarias?',
      respuesta:
        'Lo habitual es que dure entre 5 a 6 meses. Va a depender de lo que quieras trabajar y de el plan de acción que acuerdes con tu terapeuta.',
      isOpen: false
    },
    {
      id: 6,
      pregunta: '¿Cómo me comunicaré con mi psicólogo o psicóloga?',
      respuesta:
        'Tu sesión se confirmará por email y se añadirá a tu calendario. A partir de aquí, puedes contactar por chat, desde la plataforma, con tu psicólogo o psicóloga, y viceversa. Cuando tu sesión vaya a comenzar, podrás iniciar la videollamada y dar comienzo a tu sesión de terapia. Recuerda que, si lo prefieres, puedes apagar la cámara y tener la sesión por audio.',
      isOpen: false
    }
  ];
  touchStartX = 0;
  touchEndX = 0;
  sliderCustomer = [
    {
      image: 'assets/ilustrations/opiniones/gloria.jpeg',
      nombre: 'Gloria M.',
      descripcion: ' Estudiante de Ingeniería Industrial ',
      valoracion: 4.5,
      opinion:
        'Ana ha sido clave para centrarme en mis estudios. Con sus estrategias he mejorado mi enfoque y he dejado de procrastinar tanto. ¡Gracias, Ana!'
    },
    {
      image: 'assets/ilustrations/opiniones/david.jpeg',
      nombre: 'David E.',
      descripcion: 'Account Manager',
      valoracion: 4,
      opinion:
        'Carlos, mi psicólogo, ha sido increíble para superar mi insomnio. Con su apoyo finalmente puedo dormir como un bebé. ¡Gracias, Carlos, eres un rockstar de la psicología!'
    },
    {
      image: 'assets/ilustrations/opiniones/belen.jpeg',
      nombre: 'Belén R.',
      descripcion: 'Estudiante de Pedagogía',
      valoracion: 3,
      opinion:
        'Me siento más conectada con mis emociones y estoy más alineada con mis metas. María ha sido una guía invaluable en mi crecimiento personal.'
    },
    {
      image: 'assets/ilustrations/opiniones/opinion-1.jpg',
      nombre: 'Laura G.',
      descripcion: 'Estudiante de Marketing',
      valoracion: 4,
      opinion:
        '¡Carlos ha cambiado mi vida! Es un terapeuta increíblemente amable y empático. También comentar que Tell Me Why es súper fácil de usar. ¡Gracias, Carlos! Recomendación absoluta.'
    },
    {
      image: 'assets/ilustrations/opiniones/opinion-2.jpg',
      nombre: 'Nuria P.',
      descripcion: 'Monitora de ocio',
      valoracion: 3,
      opinion:
        'Con Ana mi autoestima ha crecido mucho y estoy aprendiendo a tratarme mejor. Si quieres a una psicóloga que de verdad te escuche y trabaje contigo, Ana es la mejor!'
    },
    {
      image: 'assets/ilustrations/opiniones/opinion-3.jpg',
      nombre: 'Luis M.',
      descripcion: 'Barista',
      valoracion: 4,
      opinion:
        'He aprendido muchísimo gracias a Carlos. Ahora me comunico bastante mejor con mis hermanos y compañeros de trabajo. Carlos es un super psicólogo! ¡Con ganas de nuestra próxima sesión!'
    }
  ];

  sliderCustomerDesktop: SliderCustomer[][] = [];
  sliderCustomerTablet: SliderCustomer[][] = [];

  sliderPsicologos: SliderPsicologos[] = [
    {
      image: 'assets/ilustrations/psicologos/Maria_Tejedor.jpg',
      aresas: ['Atención', 'Autoestima', 'Tristeza'],
      nombre: 'Maria T.',
      valoracion: 4.5,
      views: '93 reviews',
      descripcion:
        'Mi enfoque terapéutico se basa en la empatía, el respeto y la colaboración. Creo en la importancia de crear un ambiente bastante seguro y además confidencial con posibilidad de expresarte libremente y explorar tus pensamientos, sentimientos y las valiosas experiencias.'
    },
    {
      image: 'assets/ilustrations/psicologos/Ana_Jimenez.jpg',
      aresas: ['Atención', 'Autoestima', 'Tristeza'],
      nombre: 'Ana J.',
      valoracion: 4.7,
      views: '237 reviews',
      descripcion:
        'Trabajaremos juntos para fomentar tu autoaceptación, autoestima y tu crecimiento personal hacia donde tu desees. Considero que cada persona es única y tiene la capacidad de dirigir su vida hacia un mayor bienestar y autorrealización. Hablemos! '
    },
    {
      image: 'assets/ilustrations/psicologos/Carlos_Fania.jpg',
      aresas: ['Atención', 'Autoestima', 'Tristeza'],
      nombre: 'Carlos F.',
      valoracion: 4.8,
      views: '150 reviews',
      descripcion:
        'Nuestros desafíos individuales no existen en un vacío, sino que están influenciados por nuestro entorno. Trabajaré contigo para explorar todos los posibles patrones de comunicación y otros sistemas sociales para potenciar tu bienestar.'
    }
  ];

  sliderPsicologosDesktop: SliderPsicologos[][] = [];
  sliderPsicologosTablet: SliderPsicologos[][] = [];

  modalRef?: BsModalRef;
  comparacionTerapiaPresencial: ComparacionTerapiaPresencial[] = [
    {
      titulo: 'Proporcionado por terapeutas colegiados',
      descripcion:
        'Solo encontrarás psicólogos y psicólogas graduados en psicología y colegiados en su respectivo colegio profesional autonómico.'
    },
    {
      titulo: 'Sesiones presenciales',
      descripcion:
        'No tendrás que preocuparte de desplazarte a ninguna consulta.'
    },
    {
      titulo: 'Chatea en cualquier momento y lugar',
      descripcion:
        'Planea las siguientes sesiones con tu terapeuta a través del chat de Tell Me Why. Todas las sesiones se realizan online desde donde tu prefieras.'
    },
    {
      titulo: 'Sesiones telefónicas',
      descripcion:
        'Si prefieres tener la sesión sin cámara, puedes hacerlo y hablar con tu terapeuta como si fuese una llamada telefónica.'
    },
    {
      titulo: 'Sesiones por videollamada',
      descripcion:
        'Ten tus sesiones de terapia desde tu dispositivo preferido siempre que tengas acceso a micrófono, cámara y conexión a internet.'
    },
    {
      titulo: 'Facilidad para programar cita',
      descripcion:
        'Desde el calendario de Tell Me Why puedes solicitar tu siguiente sesión de terapia cuando tu terapeuta y tú estéis disponibles.'
    },
    {
      titulo: 'Facilidad para cambiar de terapeuta',
      descripcion:
        'Si lo prefieres, con un mínimo de 24 horas de antelación, puedes cancelar tu sesión y escoger a otro u otra terapéuta.'
    }
  ];
  tituloModalComparacion = '';
  descripcionModalComparacion = '';

  constructor(
    private modalService: BsModalService,
    private googleTagService: GoogleTagService
  ) {}

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.formatSliderDesktopt();
    this.formatSliderTablet();
  }

  isOpenChange(event: boolean, id: number): void {
    for (const key in this.frequentQuestions) {
      if (Object.prototype.hasOwnProperty.call(this.frequentQuestions, key)) {
        const elem = this.frequentQuestions[key];
        if (elem.id === id) {
          this.frequentQuestions[key].isOpen = event;
          break;
        }
      }
    }
  }

  touchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  touchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.changeSliderCustomer();
  }

  changeSliderCustomer(): void {
    if (this.touchStartX > this.touchEndX) {
      if (this.activeSlideIndexCustomer == this.sliderCustomer.length - 1) {
        this.activeSlideIndexCustomer = 0;
      } else {
        this.activeSlideIndexCustomer++;
      }
    } else {
      if (this.activeSlideIndexCustomer == 0) {
        this.activeSlideIndexCustomer = this.sliderCustomer.length - 1;
      } else {
        this.activeSlideIndexCustomer--;
      }
    }
  }

  touchStartSliderOne(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  touchEndSliderOne(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.changeSliderCustomerOne();
  }

  changeSliderCustomerOne(): void {
    if (this.touchStartX > this.touchEndX) {
      if (this.activeSlideIndex == this.sliderPsicologos.length - 1) {
        this.activeSlideIndex = 0;
      } else {
        this.activeSlideIndex++;
      }
    } else {
      if (this.activeSlideIndex == 0) {
        this.activeSlideIndex = this.sliderPsicologos.length - 1;
      } else {
        this.activeSlideIndex--;
      }
    }
  }

  openModal(template: TemplateRef<unknown>, index: number) {
    this.tituloModalComparacion =
      this.comparacionTerapiaPresencial[index].titulo;
    this.descripcionModalComparacion =
      this.comparacionTerapiaPresencial[index].descripcion;
    this.modalRef = this.modalService.show(
      template,
      Object.assign(
        {},
        {
          class: 'modal-dialog-centered modal-comparacion',
          animated: true
        }
      )
    );
  }

  formatSliderDesktopt() {
    let iteracionCust = 0;
    let itCust = 0;
    let iteracionPsic = 0;
    let itPsic = 0;
    for (const key in this.sliderCustomer) {
      if (Object.prototype.hasOwnProperty.call(this.sliderCustomer, key)) {
        const elem = this.sliderCustomer[key];
        if (this.sliderCustomerDesktop[itCust] === undefined) {
          this.sliderCustomerDesktop[itCust] = [elem];
        } else {
          this.sliderCustomerDesktop[itCust].push(elem);
        }
        iteracionCust++;
        if (iteracionCust == 3) {
          iteracionCust = 0;
          itCust++;
        }
      }
    }

    for (const key in this.sliderPsicologos) {
      if (Object.prototype.hasOwnProperty.call(this.sliderPsicologos, key)) {
        const elem = this.sliderPsicologos[key];
        if (this.sliderPsicologosDesktop[itPsic] === undefined) {
          this.sliderPsicologosDesktop[itPsic] = [elem];
        } else {
          this.sliderPsicologosDesktop[itPsic].push(elem);
        }
        iteracionPsic++;
        if (iteracionPsic == 3) {
          iteracionPsic = 0;
          itPsic++;
        }
      }
    }
  }

  formatSliderTablet() {
    let iteracionCust = 0;
    let itCust = 0;
    let iteracionPsic = 0;
    let itPsic = 0;
    for (const key in this.sliderCustomer) {
      if (Object.prototype.hasOwnProperty.call(this.sliderCustomer, key)) {
        const elem = this.sliderCustomer[key];
        if (this.sliderCustomerTablet[itCust] === undefined) {
          this.sliderCustomerTablet[itCust] = [elem];
        } else {
          this.sliderCustomerTablet[itCust].push(elem);
        }
        iteracionCust++;
        if (iteracionCust == 2) {
          iteracionCust = 0;
          itCust++;
        }
      }
    }

    for (const key in this.sliderPsicologos) {
      if (Object.prototype.hasOwnProperty.call(this.sliderPsicologos, key)) {
        const elem = this.sliderPsicologos[key];
        if (this.sliderPsicologosTablet[itPsic] === undefined) {
          this.sliderPsicologosTablet[itPsic] = [elem];
        } else {
          this.sliderPsicologosTablet[itPsic].push(elem);
        }
        iteracionPsic++;
        if (iteracionPsic == 2) {
          iteracionPsic = 0;
          itPsic++;
        }
      }
    }
  }

  touchStartSliderOneTablet(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  touchEndSliderOneTablet(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.changeSliderCustomerOneTablet();
  }

  changeSliderCustomerOneTablet(): void {
    if (this.touchStartX > this.touchEndX) {
      if (this.slideIndexTablet == this.sliderPsicologosTablet.length - 1) {
        this.slideIndexTablet = 0;
      } else {
        this.slideIndexTablet++;
      }
    } else {
      if (this.slideIndexTablet == 0) {
        this.slideIndexTablet = this.sliderPsicologosTablet.length - 1;
      } else {
        this.slideIndexTablet--;
      }
    }
  }

  touchStartTablet(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  touchEndTablet(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.changeSliderCustomer();
  }

  changeSliderCustomerTablet(): void {
    if (this.touchStartX > this.touchEndX) {
      if (
        this.activeSlideIndexCustomerTablet ==
        this.sliderCustomerTablet.length - 1
      ) {
        this.activeSlideIndexCustomerTablet = 0;
      } else {
        this.activeSlideIndexCustomerTablet++;
      }
    } else {
      if (this.activeSlideIndexCustomerTablet == 0) {
        this.activeSlideIndexCustomerTablet =
          this.sliderCustomerTablet.length - 1;
      } else {
        this.activeSlideIndexCustomerTablet--;
      }
    }
  }

  goToPayment(id: string) {
    this.googleTagService.addEvent({
      action: `click in payment button ${id}`,
      category: 'buttons',
      label: 'user clicks in go to payment button',
      non_interaction: false
    });
  }

  goToEmotion(id: string) {
    this.googleTagService.addEvent({
      action: `click in emotion button ${id}`,
      category: 'buttons',
      label: 'user clicks in emotion button',
      non_interaction: false
    });
  }
}
