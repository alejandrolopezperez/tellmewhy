import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { EmtionsComponent } from './emotions.component';

@NgModule({
  declarations: [EmtionsComponent],
  imports: [CommonModule, RouterModule, AppRoutingModule]
})
export class EmotionsModule {}
