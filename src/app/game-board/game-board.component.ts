import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  tiles = Array(9).fill(null); // tiles array to calculate move and return winner
  player = 'X'; // Initial player name
  winnersName = null; // Initial winner name
  constructor() {
  }

  ngOnInit(): void {
    if (localStorage.getItem('history')) {
      this.tiles = JSON.parse(localStorage.getItem('history'));
    } // check if any preserved history to resume the game when the browser refreshes
    if (localStorage.getItem('winner')) {
      this.winnersName = localStorage.getItem('winner');
    } // check if any preserved history to resume the game when the browser refreshes
  }

  get gameStatus(): string {
    return this.winnersName ? `Congrats 🌹! ${this.winnersName === 'X'? '👵 Player Two' : '👴 Player One'} is winner! 🎉 🎈 🎊 🎇` : this.tiles.includes(null) ? `${this.player === 'X' ? '👴 Player One' : '👵 Player Two'}'s turn 👺` : `👵=👴 It's a draw! 😵`;
  } // this function returns the actions/status of the game

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
  } // this function track the users move and calculate

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
    ]; // winner sequence to compare with
    for (const ws of winSequences) {
      if (this.tiles[ws[0]]
        && this.tiles[ws[0]] === this.tiles[ws[1]]
        && this.tiles[ws[1]] === this.tiles[ws[2]]) {
        return true;
      }
    }
    return false;
  } // this function returns the winner of the game

  restartGame(): void {
    this.tiles = Array(9).fill(null);
    this.player = 'X';
    this.winnersName = null;
    localStorage.clear(); // clearing localstorage
  } // this function resets the game
}
