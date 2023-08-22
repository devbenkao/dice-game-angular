import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceGameComponent } from './dice-game.component';
import { RollService } from 'src/app/roll.service';
import { Observable, of } from 'rxjs';

describe('DiceGameComponent', () => {
  let component: DiceGameComponent;
  let fixture: ComponentFixture<DiceGameComponent>;
  let service: RollService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiceGameComponent],
    });
    fixture = TestBed.createComponent(DiceGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(RollService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isGameStarted()', () => {
    it('should return false initially', () => {
      expect(component.isGameStarted()).toBe(false);
    });

    it('should return true after startGame() is called', () => {
      expect(component.isGameStarted()).toBe(false);
      component.startGame();
      expect(component.isGameStarted()).toBe(true);
    });
  });

  describe('playerRoll()', () => {
    it('should add a rnadom number to playerDiceList between 1 and 6', () => {
      spyOn(service, 'roll').and.returnValues(of(1), of(3), of(6));
      expect(component.playerDiceList).toEqual([]);

      component.playerRoll();
      expect(component.playerDiceList).toEqual([1]);

      component.playerRoll();
      expect(component.playerDiceList).toEqual([1, 3]);

      component.playerRoll();
      expect(component.playerDiceList).toEqual([1, 3, 6]);
    });
  });

  describe('isGameLost()', () => {
    it('should lose the game if the player rolls over 12', () => {
      spyOn(service, 'roll').and.returnValues(of(4), of(3), of(6));
      expect(component.playerDiceList).toEqual([]);

      component.playerRoll(); // die add up to 4
      expect(component.isGameLost()).toBe(false);

      component.playerRoll(); // die add up to 7
      expect(component.isGameLost()).toBe(false);

      component.playerRoll(); // die add up to 13
      expect(component.isGameLost()).toBe(true);
    });
  });
});
