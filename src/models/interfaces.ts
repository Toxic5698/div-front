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

export interface Stats {
  movies_count: number;
  highest_rate: number;
  smallest_rate: number;
  median_rate: number;
}
