import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmtionsComponent } from './emotions.component';

describe('EmtionsComponent', () => {
  let component: EmtionsComponent;
  let fixture: ComponentFixture<EmtionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmtionsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmtionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
