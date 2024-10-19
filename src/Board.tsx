import { BoardData } from './types';

interface BoardProps {
  boardState: BoardData;
  setCell: (row: number, col: number) => void;
}

function Board({ setCell, boardState }: BoardProps) {
  console.log('board state: ', boardState);
  return (
    <div className='board'>
      {boardState.map((row, rowIndex) => (
        <div className='row' key={rowIndex}>
          {row.map((cell, colIndex) => (
            <span
              className='cell'
              key={colIndex}
              onClick={() => setCell(rowIndex, colIndex)}
            >
              {cell}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export { Board };
