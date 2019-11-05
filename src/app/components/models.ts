export interface Coordinate {
  x: number;
  y: number;
}

export interface IShape {
  id: string;
  startCordinate: Coordinate;
  lines: Coordinate[];
  closed: boolean;
}
