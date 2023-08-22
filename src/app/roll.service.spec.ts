import { TestBed } from '@angular/core/testing';

import { RollService } from './roll.service';

describe('RollService', () => {
  let service: RollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a random number between 1 and 6', () => {
    spyOn(Math, 'random').and.returnValues(0.55, 0.65, 0.75, 0.85);
    service.roll().subscribe((num) => {
      expect(num).toBe(4);
    });
    service.roll().subscribe((num) => {
      expect(num).toBe(4);
    });
    service.roll().subscribe((num) => {
      expect(num).toBe(5);
    });
    service.roll().subscribe((num) => {
      expect(num).toBe(6);
    });
  });
});
