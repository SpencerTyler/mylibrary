"use client";
import { addBook } from "@/lib/actions";
import { Book as BookModel } from "@/models/books";
import Link from "next/link";
import { useState } from "react";

interface BookProps {
  info: BookModel;
}

type BookAddState = "In Collection" | "Saving" | "Not in Collection";

export default function Book({ info }: BookProps) {
  const [state, setState] = useState<BookAddState>("Not in Collection");

  const handleAdd = async () => {
    if (state !== "Not in Collection") {
      return;
    }
    setState("Saving");
    const result = await addBook(info.googleId);
    console.log(result);
    setState("In Collection");
  };

  return (
    <div className="bg-slate-100 p-4 rounded flex flex-row gap-4">
      <div className="hidden md:block min-w-[128px]">
        {info.thumbnail && <img src={info.thumbnail} alt="Book Cover" />}
      </div>
      <div className="flex flex-col gap-3 grow">
        <div className="flex flex-row gap-3 items-center justify-between">
          <Link href={`/books/${info.googleId}`}>
            <h3 className="font-semibold text-lg md:text-xl">{info.title}</h3>
          </Link>
          <button
            className="bg-sky-800 px-3 py-1 rounded text-neutral-100"
            onClick={handleAdd}
          >
            {state === "Not in Collection" && "Add to Collection"}
            {state === "Saving" && "Saving..."}
            {state === "In Collection" && "In Collection"}
          </button>
        </div>
        <div className="flex flex-row gap-2">
          <div className="md:hidden">
            {info.thumbnail && <img src={info.thumbnail} alt="Book Cover" />}
          </div>
          <div className="bg-violet-100 size-full grow rounded p-4 flex flex-col gap-1">
            <div>
              <b>Author:</b> {info.authors}
            </div>
            <div>
              <b>Page Count:</b> {info.pageCount}
            </div>
            <div>
              <b>Publisher:</b> {info.publisher}
            </div>
            <div>
              <b>Date Publish:</b> {info.publishedDate.toDateString()}
            </div>
            <div>
              <b>Categories:</b> {info.categories}
            </div>
            <div>
              <b>Description:</b> {info.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
