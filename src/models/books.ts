export interface Book {
  googleId: string;
  title: string;
  authors: string[];
  thumbnail?: string;
  pageCount: number;
  publisher: string;
  publishedDate: Date;
  description: string;
  categories: string[];
}
