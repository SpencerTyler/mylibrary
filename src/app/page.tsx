import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Link
        href="/books"
        className="self-center border border-gray-800 rounded py-5 md:px-15 w-full md:w-auto text-center bg-cyan-100 hover:bg-cyan-200 cursor-pointer"
      >
        Add Book
      </Link>
    </div>
  );
}

//add new books at top
