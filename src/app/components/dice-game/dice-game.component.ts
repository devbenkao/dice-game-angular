import { Component } from '@angular/core';
import { RollService } from 'src/app/roll.service';

function aggregate(arr: any) {
  // reduce() iterates over the elements of the this.playerDiceList array and calculate a cumulative total
  return arr.reduce((total: any, currentVal: any) => total + currentVal, 0);
}

@Component({
  selector: 'app-dice-game',
  templateUrl: './dice-game.component.html',
  styleUrls: ['./dice-game.component.scss'],
})
export class DiceGameComponent {
  constructor(private service: RollService) {}

  playerDiceList: Array<number> = [];
  opponentDiceList: Array<number> = [];
  gameStarted = false;

  ngOnInit() {}

  isGameStarted(): boolean {
    return this.gameStarted;
  }

  startGame() {
    this.gameStarted = true;
    this.service.roll().subscribe((num) => {
      this.opponentDiceList.push(num);
    });
  }

  playerRoll() {
    this.service.roll().subscribe((num) => {
      this.playerDiceList.push(num);
    });
  }

  opponentRoll() {
    this.service.roll().subscribe((num) => {
      this.opponentDiceList.push(num);
    });
  }

  isGameLost(): boolean {
    if (!this.playerDiceList.length) {
      return false;
    }

    const playerCount = aggregate(this.playerDiceList);
    const opponentCount = aggregate(this.opponentDiceList);
    if (this.opponentDiceList.length === 2 && opponentCount >= playerCount) {
      return true;
    }

    return playerCount > 12;
  }
}
