import SingleBookPage from "@/components/singlebookpage";
import { Book as BookModel } from "@/models/books";
import { GoogleVolume, toBook } from "@/models/googlevolumes";

async function fetchBook(bookId: string) {
  const url = new URL(`https://www.googleapis.com/books/v1/volumes/${bookId}`);

  const searchResponse = await fetch(url);

  if (!searchResponse.ok) {
    console.error(
      `Google FetchBook failed with status: ${searchResponse.statusText}`
    );
    throw new Error("fetch failed");
  }

  const volume = (await searchResponse.json()) as GoogleVolume;
  return toBook(volume);
}

export default async function SingleBook({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;

  let book: BookModel;
  try {
    book = await fetchBook(bookId);
  } catch {
    return <div>Oops something went wrong</div>;
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <SingleBookPage info={book} />
    </div>
  );
}
