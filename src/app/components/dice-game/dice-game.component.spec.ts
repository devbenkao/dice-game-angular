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

    it('should lose the game if the opponent rolls more than the player', () => {
      component.playerDiceList = [4, 4];
      component.opponentDiceList = [5, 5];
      expect(component.isGameLost()).toBe(true);

      component.opponentDiceList = [4, 4];
      expect(component.isGameLost()).toBe(true);
    });

    it('should return false if the player has no dice yet', () => {
      component.playerDiceList = [];
      component.opponentDiceList = [1, 2, 3];

      expect(component.isGameLost()).toBe(false);
    });

    it('should not compare the two scores if the opponent does not have exactly two die', () => {
      component.playerDiceList = [1, 1, 1];
      component.opponentDiceList = [6];
      expect(component.isGameLost()).toBe(false);

      component.opponentDiceList = [5, 5];
      expect(component.isGameLost()).toBe(true);
    });
  });

  describe('opponentRoll()', () => {
    it('should add a random number to opponentDiceList between 1 and 6', () => {
      spyOn(service, 'roll').and.returnValues(of(1), of(3), of(6));
      expect(component.opponentDiceList).toEqual([]);

      component.opponentRoll();
      expect(component.opponentDiceList).toEqual([1]);

      component.opponentRoll();
      expect(component.opponentDiceList).toEqual([1, 3]);

      component.opponentRoll();
      expect(component.opponentDiceList).toEqual([1, 3, 6]);
    });
  });

  describe('startGame()', () => {
    it('should call RollService.roll() and save 1 number in opponentDicelist', () => {
      spyOn(service, 'roll').and.returnValue(of(4));
      component.startGame();

      expect(service.roll).toHaveBeenCalledTimes(1);
      expect(component.opponentDiceList).toEqual([4]);
    });
  });
});
