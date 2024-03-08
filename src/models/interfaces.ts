export interface Item {
  id: number;
  added_at: string;
  name: string;
  rate: number;
  edit?: boolean;
}
export interface Response{
  items: Item[];
  count: number;
}
