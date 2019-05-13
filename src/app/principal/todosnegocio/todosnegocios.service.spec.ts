import { TestBed } from '@angular/core/testing';

import { TodosnegociosService } from './todosnegocios.service';

describe('TodosnegociosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodosnegociosService = TestBed.get(TodosnegociosService);
    expect(service).toBeTruthy();
  });
});
