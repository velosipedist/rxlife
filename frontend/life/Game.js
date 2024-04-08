import { COLOR_EMPTY } from './Board.js';
import { range } from '../util/range.js';

export class Game {
  #state = 'init';
  #board;
  #connection;
  #sessionId;
  #colors;
  #userColor;

  constructor (board, connection, cellsX, cellsY) {
    this.#board = board;
    this.#connection = connection;
    this.#colors = range(cellsX)
      .reduce((acc, x) => {
        for (let y of range(cellsY)) {
          acc.set([x, y], COLOR_EMPTY);
        }
        return acc;
      }, new Map());
  }

  get state () {
    return this.#state;
  }

  start () {
    if (!this.#board.isMounted) {
      throw new Error('Board is not mounted yet');
    }
    this.#userColor = "#ff0000";
    this.#sessionId = Math.random().toString(36).slice(2);
    this.#connection.startGame(this.#sessionId);
    this.#state = 'started';
  }

  get userColor () {
    return this.#userColor;
  }

  get colors () {
    return [...this.#colors.entries()].map(([coords, color]) => ({
      coords, color,
    }));
  }

  click (coords) {
    this.#colors.set(coords, this.#userColor);
    const changeSet = [{ coords, color: this.#userColor }];
    this.#board.repaint(changeSet);
  }
}