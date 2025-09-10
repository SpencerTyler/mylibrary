import ShelvedBook from "@/components/shelvedbook";
import { getBooks } from "@/lib/actions";
import Link from "next/link";

export default async function Home() {
  const booksInCollection = await getBooks();

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/books"
        className="self-center border border-gray-800 rounded py-5 md:px-15 w-full md:w-auto text-center bg-cyan-100 hover:bg-cyan-200 cursor-pointer"
      >
        Add Book
      </Link>
      <div className="flex flex-col gap-2">
        {booksInCollection.data?.map((book) => (
          <ShelvedBook book={book} key={book.googleId} />
        ))}
      </div>
    </div>
  );
}

//add new books at top
