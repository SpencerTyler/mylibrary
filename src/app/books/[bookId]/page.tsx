import SingleBookPage from "@/components/singlebookpage";
import { fetchBook } from "@/lib/googleapi";
import { Book as BookModel } from "@/models/books";
import { enforceLogin } from "@/Utils/session";

export default async function SingleBook({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  await enforceLogin();
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
