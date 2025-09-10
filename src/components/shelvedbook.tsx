import { Book as BookModel } from "@/models/books";
import ShelvedBookActions from "./shelvedbookactions";

interface ShelvedBookProps {
  book: BookModel;
}

export default async function ShelvedBook({ book }: ShelvedBookProps) {
  return (
    <div className="border border-gray-800 rounded w-full p-2 flex justify-between">
      {book.title}
      <ShelvedBookActions book={book} />
    </div>
  );
}
