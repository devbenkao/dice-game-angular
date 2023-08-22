import { Component } from '@angular/core';
import { RollService } from 'src/app/roll.service';

@Component({
  selector: 'app-dice-game',
  templateUrl: './dice-game.component.html',
  styleUrls: ['./dice-game.component.scss'],
})
export class DiceGameComponent {
  constructor(private service: RollService) {}

  playerDiceList: number[] = [];
  gameStarted = false;

  ngOnInit() {}

  isGameStarted(): boolean {
    return this.gameStarted;
  }

  startGame() {
    this.gameStarted = true;
  }

  playerRoll() {
    this.service.roll().subscribe((num: number) => {
      this.playerDiceList.push(num);
    });
  }

  isGameLost(): boolean {
    // reduce() iterates over the elements of the this.playerDiceList array and calculate a cumulative total
    const playerCount = this.playerDiceList.reduce(
      (total, currentVal) => total + currentVal,
      0
    );
    return playerCount > 12;
  }
}
