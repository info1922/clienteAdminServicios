import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosnegocioComponent } from './todosnegocio.component';

describe('TodosnegocioComponent', () => {
  let component: TodosnegocioComponent;
  let fixture: ComponentFixture<TodosnegocioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosnegocioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosnegocioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
