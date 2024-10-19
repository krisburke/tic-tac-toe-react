export type Player = 'X' | 'O';

export type CellData = Player | '';

export type RowData = CellData[];

export type BoardData = RowData[];

export type WinType =
  | 'horizontal'
  | 'vertical'
  | 'main-diagonal'
  | 'anti-diagonal';

export interface WinData {
  type: WinType;
  index?: number;
}
