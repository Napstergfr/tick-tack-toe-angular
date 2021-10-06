import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-board-tile',
  templateUrl: './board-tile.component.html',
  styleUrls: ['./board-tile.component.scss']
})
export class BoardTileComponent implements OnInit {
  @Input() state;
  constructor() { }

  ngOnInit(): void {
  }

}
