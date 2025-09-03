import { GoogleVolume, toBook } from "@/models/googlevolumes";

export async function fetchBook(bookId: string) {
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
