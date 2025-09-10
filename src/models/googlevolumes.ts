import { Book as BookModel } from "./books";

export interface GoogleVolumeListResponse {
  totalItems: number;
  items?: GoogleVolume[];
}

export interface GoogleVolume {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    categories?: string[];
    description?: string;
    pageCount: number;
    publisher: string;
    imageLinks?: {
      thumbnail: string;
    };
    publishedDate: string;
  };
}

export function toBook(volume: GoogleVolume): BookModel {
  try {
    return {
      googleId: volume.id,
      authors: volume.volumeInfo.authors,
      categories: volume.volumeInfo.categories ?? [],
      description: volume.volumeInfo.description ?? "",
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
