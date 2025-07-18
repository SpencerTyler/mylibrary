import Book from "@/components/book";
import { Book as BookModel } from "@/models/books";
import BookSearch from "./BookSearch";
import { GoogleVolumeListResponse, toBook } from "@/models/googlevolumes";

async function searchBooks(searchTerm: string): Promise<BookModel[]> {
  const url = new URL("https://www.googleapis.com/books/v1/volumes");
  url.searchParams.append("q", searchTerm);

  const searchResponse = await fetch(url);

  if (!searchResponse.ok) {
    console.error(
      `Google Search failed with status: ${searchResponse.statusText}`
    );
    throw new Error("search failed");
  }

  const { items } = (await searchResponse.json()) as GoogleVolumeListResponse;

  return items?.map(toBook) ?? [];
}

export default async function Books({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search = (await searchParams).search;

  const searchTerm = Array.isArray(search) ? search.join(" ") : search;
  let books: BookModel[] = [];

  const trimmedSearchTerm = searchTerm?.trim();

  if (trimmedSearchTerm) {
    try {
      books = await searchBooks(trimmedSearchTerm);
    } catch {
      return <div>Oops something went wrong</div>;
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <BookSearch initialSearchTerm={searchTerm} />

      {books.length === 0 && trimmedSearchTerm && (
        <div className="bg-red-100 rounded-sm p-4 ">
          No Results found for {searchTerm}
        </div>
      )}

      {books.map((book) => (
        <Book key={book.googleId} info={book} />
      ))}
    </div>
  );
}

// style input
// Load individual book pages with info and styling
