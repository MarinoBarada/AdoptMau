export interface Cat {
  id: number;
  name: string;
  age: number;
  color: string;
  picture: string;
  adopted: boolean
}

export interface SortBy {
  name: string;
  value: true | false;
}