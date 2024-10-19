import { BoardData, WinData } from './types';

function findHorizontalWinIndex(boardState: BoardData): number | null {
  let winIndex = null;
  boardState.forEach((row, idx) => {
    if (
      (row[0] === 'X' || row[0] === 'O') &&
      row.every((val) => val === row[0])
    ) {
      winIndex = idx;
    }
  });
  return winIndex;
}

function findVerticalWinIndex(boardState: BoardData): number | null {
  let winIndex = null;
  for (let colIndex = 0; colIndex < boardState[0].length; colIndex++) {
    const firstVal = boardState[0][colIndex];
    let allEqual = true;
    for (let rowIndex = 1; rowIndex < boardState.length; rowIndex++) {
      if (boardState[rowIndex][colIndex] !== firstVal || firstVal === '') {
        allEqual = false;
        break;
      }
    }
    if (allEqual) {
      winIndex = colIndex;
      break; // Stop as soon as a win is found
    }
  }
  return winIndex;
}

function checkForMainDiagonalWin(boardState: BoardData): boolean {
  const firstVal = boardState[0][0];
  if (firstVal === '') return false;

  let allEqual = true;
  for (let i = 0; i < boardState[0].length; i++) {
    if (boardState[i][i] !== firstVal) {
      allEqual = false;
    }
  }
  return allEqual;
}

function checkForAntiDiagonalWin(boardState: BoardData): boolean {
  const firstVal = boardState[0][boardState.length - 1];
  if (firstVal === '') return false;

  let allEqual = true;
  for (let i = 0; i < boardState[0].length; i++) {
    if (boardState[i][boardState.length - i - 1] !== firstVal) {
      allEqual = false;
    }
  }
  return allEqual;
}

export function checkForWinner(boardState: BoardData): WinData | false {
  const hResult = findHorizontalWinIndex(boardState);
  if (hResult) {
    return { type: 'horizontal', index: hResult };
  }
  const vResult = findVerticalWinIndex(boardState);
  if (vResult) {
    return { type: 'vertical', index: vResult };
  }
  if (checkForMainDiagonalWin(boardState)) {
    return { type: 'main-diagonal' };
  }
  if (checkForAntiDiagonalWin(boardState)) {
    return { type: 'anti-diagonal' };
  }
  return false;
}
