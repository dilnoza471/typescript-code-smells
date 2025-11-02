import { Game } from "./Game";

describe("TicTacToe Game", () => {
  let game: Game;

  const playMoves = (moves: [string, number, number][]) => {
    moves.forEach(([player, row, col]) => game.Play(player, row, col));
  };

  beforeEach(() => {
    game = new Game();
  });

  describe("invalid moves", () => {
    it("should not allow player O to play first", () => {
      expect(() => game.Play("O", 0, 0)).toThrow();
    });

    it("should not allow the same player to play twice in a row", () => {
      playMoves([["X", 0, 0]]);
      expect(() => game.Play("X", 1, 0)).toThrow();
    });

    it("should not allow a move on an occupied position", () => {
      playMoves([
        ["X", 0, 0],
        ["O", 1, 0],
      ]);
      expect(() => game.Play("X", 0, 0)).toThrow();
    });
  });

  describe("winning conditions", () => {
    const expectWinner = (
      moves: [string, number, number][],
      winner: string
    ) => {
      playMoves(moves);
      expect(game.Winner()).toBe(winner);
    };

    it("declares X as winner when filling the top row", () => {
      expectWinner(
        [
          ["X", 0, 0],
          ["O", 1, 0],
          ["X", 0, 1],
          ["O", 1, 1],
          ["X", 0, 2],
        ],
        "X"
      );
    });

    it("declares O as winner when filling the top row", () => {
      expectWinner(
        [
          ["X", 1, 0],
          ["O", 0, 0],
          ["X", 1, 1],
          ["O", 0, 1],
          ["X", 2, 2],
          ["O", 0, 2],
        ],
        "O"
      );
    });

    it("declares X as winner when filling the middle row", () => {
      expectWinner(
        [
          ["X", 1, 0],
          ["O", 0, 0],
          ["X", 1, 1],
          ["O", 0, 1],
          ["X", 1, 2],
        ],
        "X"
      );
    });

    it("declares O as winner when filling the middle row", () => {
      expectWinner(
        [
          ["X", 0, 0],
          ["O", 1, 0],
          ["X", 2, 1],
          ["O", 1, 1],
          ["X", 2, 2],
          ["O", 1, 2],
        ],
        "O"
      );
    });

    it("declares X as winner when filling the bottom row", () => {
      expectWinner(
        [
          ["X", 2, 0],
          ["O", 0, 0],
          ["X", 2, 1],
          ["O", 0, 1],
          ["X", 2, 2],
        ],
        "X"
      );
    });

    it("declares O as winner when filling the bottom row", () => {
      expectWinner(
        [
          ["X", 0, 0],
          ["O", 2, 0],
          ["X", 1, 1],
          ["O", 2, 1],
          ["X", 0, 1],
          ["O", 2, 2],
        ],
        "O"
      );
    });
  });
});
