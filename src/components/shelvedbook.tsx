import { fetchBook } from "@/lib/googleapi";
import { Book as BookModel } from "@/models/books";
import ShelvedBookActions from "./shelvedbookactions";

interface ShelvedBookProps {
  bookId: string;
}

export default async function ShelvedBook({ bookId }: ShelvedBookProps) {
  let book: BookModel;
  try {
    book = await fetchBook(bookId);
  } catch {
    return <div>Oops something went wrong</div>;
  }

  return (
    <div className="border border-gray-800 rounded w-full p-2 flex justify-between">
      {book.title}
      <ShelvedBookActions book={book} />
    </div>
  );
}
