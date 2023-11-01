import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emotions',
  templateUrl: './emotions.component.html',
  styleUrls: ['./emotions.component.scss']
})
export class EmtionsComponent implements OnInit {
  title?: string;
  text = '';
  icon = '';
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.route.params.subscribe((params) => {
      this.title = params['title'];
    });

    switch (this.title) {
      case 'comunicación':
        this.text = ` ¡Comunicarse bien es una habilidad que se mejora con la práctica! Aprende a comunicarte con Tell Me Why. ¡Hablemos!`;
        this.icon = 'comunication';
        break;
      case 'sexualidad y género':
        this.text = `Desde Tell Me Why te ayudaremos a gestionar tus sentimientos hacia tu sexualidad e identidad de género. ¡Te escuchamos!`;
        this.icon = 'sexuality';
        break;
      case 'autoestima':
        this.text = `¡Tener una autoestima alta es clave para sentirte genial contigo mismx! Desde Tell Me Why, te ayudamos a conseguirlo. ¡A por ello!`;
        this.icon = 'autoestima';
        break;
      case 'insomnio':
        this.text = `¡No dejes que el insomnio te quite el sueño! Aprende técnicas para dormir mejor desde Tell Me Why. ¡A dormir se ha dicho!`;
        this.icon = 'insomnio';
        break;
      case 'tristeza':
        this.text = `¡No dejes que la tristeza te impida disfrutar de la vida! Desde Tell Me Why, te ayudamos a gestionar esta y muchas más emociones. ¡Vamos a por ello!`;
        this.icon = 'tristeza';
        break;
      case 'atención':
        this.text = `Si te cuesta concentrarte ¡no te preocupes!  Desde Tell Me Why te ayudamos a identificar los motivos y soluciones ¡Vamos allá!`;
        this.icon = 'atencion';
        break;
      default:
        break;
    }
  }
}
