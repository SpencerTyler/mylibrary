export default async function SingleBook({
  params,
}: {
  params: Promise<{ bookId: string }>;
}) {
  const { bookId } = await params;
  return <div>I am a book! {bookId}</div>;
}
