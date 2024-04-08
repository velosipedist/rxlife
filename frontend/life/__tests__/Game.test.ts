import { describe, expect, it, vi } from "vitest";
import { Board, COLOR_EMPTY } from "../Board";
import { Game } from "../Game";
import { Window } from 'happy-dom';

const window = new Window();
const connectionMock = { startGame: vi.fn() };

describe("Game", () => {
  it("Able to start with a basic DOM setup", () => {
    const board = new Board(30, 30, 10);
    board.mount(window.document.body);
    const game = new Game(board, connectionMock, 30, 30);
    game.start();

    expect(game.state).toEqual("started");
  });

  it("Will crash if the board is not mounted", () => {
    const board = new Board(30, 30, 10);
    const game = new Game(board, connectionMock, 30, 30);

    expect(() => game.start()).toThrowError(expect.anything());
  });

});

describe("Tick and click sequences", () => {
  function createAndStartGame(cellsX, cellsY) {
    const board = new Board(cellsX, cellsY, 1);
    board.mount(window.document.body);
    const game = new Game(board, connectionMock, cellsX, cellsY);
    game.start();
    return { board, game };
  }

  it("Contains initial colors", () => {
    const { game } = createAndStartGame(2, 2);

    expect(game.colors).toEqual([
      { coords: [0, 0], color: COLOR_EMPTY },
      { coords: [0, 1], color: COLOR_EMPTY },
      { coords: [1, 0], color: COLOR_EMPTY },
      { coords: [1, 1], color: COLOR_EMPTY },
    ]);
  });

  it("Updates colors on next click", () => {
    const { board, game } = createAndStartGame(8, 8);
    const repaintSpy = vi.spyOn(board, "repaint");
    game.click([0, 0]);

    expect(game.colors.slice(0, 1)).toEqual([
      { coords: [0, 0], color: game.userColor },
    ]);

    expect(repaintSpy).toHaveBeenCalledWith([]);
  });
});