export class Game {
  private _lastSymbol: string = " ";
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    //if first move
    if (this._lastSymbol == " ") {
      //if player is X
      if (symbol == "O") {
        throw new Error("Invalid first player");
      }
    }
    //if not first move but player repeated
    else if (symbol == this._lastSymbol) {
      throw new Error("Invalid next player");
    }
    //if not first move but play on an already played tile
    else if (this._board.TileAt(x, y).Symbol != " ") {
      throw new Error("Invalid position");
    }

    // update game state
    this._lastSymbol = symbol;
    this._board.AddTileAt({ X: x, Y: y, Symbol: symbol });
  }

  public Winner(): string {
    //check rows and columns
    for (let index = 0; index < 3; index++) {
      //check rows
      if (
        this.checkPattern(
          { X: index, Y: 0 },
          { X: index, Y: 1 },
          { X: index, Y: 2 }
        )
      ) {
        return this._board.TileAt(index, 0)!.Symbol;
      }
      //check columns
      if (
        this.checkPattern(
          { X: 0, Y: index },
          { X: 1, Y: index },
          { X: 2, Y: index }
        )
      ) {
        return this._board.TileAt(0, index)!.Symbol;
      }
    } //check diagonals
    if (this.checkPattern({ X: 0, Y: 0 }, { X: 1, Y: 1 }, { X: 2, Y: 2 })) {
      return this._board.TileAt(0, 0)!.Symbol;
    }
    if (this.checkPattern({ X: 0, Y: 2 }, { X: 1, Y: 1 }, { X: 2, Y: 0 })) {
      return this._board.TileAt(0, 2)!.Symbol;
    }
    return " ";
  }
  public checkPattern(pos1: Position, pos2: Position, pos3: Position): boolean {
    if (this._board.TileAt(pos1.X, pos1.Y)!.Symbol != " ") {
      return (
        this._board.TileAt(pos1.X, pos1.Y)!.Symbol ==
          this._board.TileAt(pos2.X, pos2.Y)!.Symbol &&
        this._board.TileAt(pos3.X, pos3.Y)!.Symbol ==
          this._board.TileAt(pos2.X, pos2.Y)!.Symbol
      );
    }
    return false;
  }
}
interface Position {
  X: number;
  Y: number;
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: " " };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(tile: Tile): void {
    this._plays.find((t: Tile) => t.X == tile.X && t.Y == tile.Y)!.Symbol =
      tile.Symbol;
  }
}
