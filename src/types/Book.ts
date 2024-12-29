export interface Book {
  id?: number | string;
  title: string;
  author: string;
  dateFinished: string;
  coverUrl?: string;
  genre?: string;
  pages?: number;
}
