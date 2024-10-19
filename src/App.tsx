import './App.css';
import { useState } from 'react';
import { Board } from './Board';
import { BoardData, Player } from './types';
import { checkForWinner } from './utils';

function getDefaultBoard(): BoardData {
  return [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
}

const FIRST_PLAYER: Player = 'X';

function App() {
  const [turn, setTurn] = useState<Player>(FIRST_PLAYER);
  const [boardState, setBoardState] = useState<BoardData>(getDefaultBoard());
  const [winner, setWinner] = useState<Player | null>(null);

  const toggleTurn = () => {
    setTurn(turn === 'X' ? 'O' : 'X');
  };

  const handleResetGame = () => {
    setBoardState(getDefaultBoard());
    setTurn(FIRST_PLAYER);
    setWinner(null);
  };

  const handleCheckForWin = () => {
    const winData = checkForWinner(boardState);
    if (winData) {
      // TODO cross through winning cells using index & type
      setWinner(turn);
      console.log(winData);
    } else {
      toggleTurn();
    }
  };

  const setCell = (row: number, col: number) => {
    const updatedState = boardState;
    const openCell = boardState[row][col] === '';
    if (!winner && openCell) {
      boardState[row][col] = turn;
      setBoardState(updatedState);
      handleCheckForWin();
    }
  };

  return (
    <div>
      {winner ? <h1>{turn} wins!</h1> : <h2>Turn: Player {turn}</h2>}
      <Board boardState={boardState} setCell={setCell} />
      <button className='reset' onClick={handleResetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default App;
