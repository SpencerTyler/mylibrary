import Book from "@/components/book";
import { Book as BookModel } from "@/models/books";

interface GoogleVolumeListResponse {
  totalItems: number;
  items: GoogleVolume[];
}

interface GoogleVolume {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    categories: string[];
    description: string;
    pageCount: number;
    publisher: string;
    imageLinks?: {
      thumbnail: string;
    };
    publishedDate: string;
  };
}

function toBook(volume: GoogleVolume): BookModel {
  try {
    return {
      googleId: volume.id,
      authors: volume.volumeInfo.authors,
      categories: volume.volumeInfo.categories,
      description: volume.volumeInfo.description,
      pageCount: volume.volumeInfo.pageCount,
      publisher: volume.volumeInfo.publisher,
      title: volume.volumeInfo.title,
      thumbnail: volume.volumeInfo.imageLinks?.thumbnail,
      publishedDate: new Date(volume.volumeInfo.publishedDate),
    };
  } catch (error: unknown) {
    console.error(`Failed to map ${volume.id} - ${error}`);
    throw error;
  }
}

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

  return items.map(toBook);
}

export default async function Books({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search = (await searchParams).search;

  if (!search) {
    return <div>Nothing searched for</div>;
  }

  const searchTerm: string = Array.isArray(search) ? search.join(" ") : search;
  let books: BookModel[];
  try {
    books = await searchBooks(searchTerm);
  } catch {
    return <div>Oops something went wrong</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div>You are searching for {searchTerm}.</div>

      {books.map((book) => (
        <Book key={book.googleId} info={book} />
      ))}
    </div>
  );
}

// styling for small verison with added fields (auther, publisher, etc)
