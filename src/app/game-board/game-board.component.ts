import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  tiles = Array(9).fill(null);
  player = 'X';
  winnersName = null;
  constructor() {
  }

  ngOnInit(): void {
    if (localStorage.getItem('history')) {
      this.tiles = JSON.parse(localStorage.getItem('history'));
    }
    if (localStorage.getItem('winner')) {
      this.winnersName = localStorage.getItem('winner');
    }
  }

  get gameStatus(): string {
    return this.winnersName ? `Congrats 🌹! ${this.winnersName === 'X'? '👵 Player Two' : '👴 Player One'} is winner! 🎉 🎈 🎊 🎇` : this.tiles.includes(null) ? `${this.player === 'X' ? '👴 Player One' : '👵 Player Two'}'s turn 👺` : `👵=👴 It's a draw! 😵`;
  }

  makeMove(event, position: number): void {
    if (!this.winnersName && !this.tiles[position]) {
      this.player = (this.player === 'X') ? '0' : 'X';
      this.tiles[position] = this.player;
      if (this.winner()) {
        this.winnersName = this.player;
        localStorage.setItem('winner', this.winnersName);
      }
    }
    localStorage.setItem('history', JSON.stringify(this.tiles));
  }

  winner(): boolean {
    const winSequences = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const ws of winSequences) {
      if (this.tiles[ws[0]]
        && this.tiles[ws[0]] === this.tiles[ws[1]]
        && this.tiles[ws[1]] === this.tiles[ws[2]]) {
        console.log(this.tiles);
        return true;
      }
    }
    return false;
  }

  restartGame(): void {
    this.tiles = Array(9).fill(null);
    this.player = 'X';
    this.winnersName = null;
    localStorage.clear();
  }
}
