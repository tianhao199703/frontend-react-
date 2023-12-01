import { useState } from 'react';
import style from "../layouts/index.less";

function Square({ value, onSquareClick }) {
  return (
    <button className={style["square"]} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  function isTie(squares: string[]) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] == null) {
        return false;
      }
    }
    return true;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    if (isTie(squares)) {
      status = "It's a tie. Nobody wins";
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  }

  let str = [];
  str.push(<div className={style["status"]}>{status}</div>);
  for (let i = 0; i < 3; i++) {
    let tmp = [];
    for (let j = 0; j < 3; j++) {
      tmp.push(<Square value={squares[i * 3 + j]} onSquareClick={() => handleClick(i * 3 + j)} />);
    }
    str.push(<div className={style["board-row"]}>{tmp}</div>)
  }

  return (
    <div>
      {str}
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function calPos(history: string[][], move: number): [number, number] {
    let cur: string[] = history[move];
    let prev: string[] = history[move - 1];
    for (let i = 0; i < cur.length; i++) {
      if (cur[i] == null && prev[i] == null) {
        continue;
      }
      if (cur[i] == prev[i]) {
        continue;
      }
      return [Math.floor(i / 3), i - Math.floor(i / 3) * 3];
    }
    return [0, 0];
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      let [posi, posj] = calPos(history, move);
      description = (move % 2 === 0 ? 'O' : 'X') + ' Go to (' + posi + "," + posj + ")";
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className={style["game"]}>
      <div className={style["game-board"]}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className={style["game-info"]}>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: number[][]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
