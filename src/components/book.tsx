"use client";
import { Book as BookModel } from "@/models/books";
import Link from "next/link";
import { useState } from "react";
import { addBook } from "@/lib/actions";
import ActionButton from "./actionbutton";

interface BookProps {
  info: BookModel;
  inCollection: boolean;
}

export default function Book({ info, inCollection }: BookProps) {
  const [isInCollection, setIsInCollection] = useState(inCollection);

  return (
    <div className="bg-slate-100 p-4 rounded-sm flex flex-row gap-4">
      <div className="hidden md:block min-w-[128px]">
        {info.thumbnail && <img src={info.thumbnail} alt="Book Cover" />}
      </div>
      <div className="flex flex-col gap-3 grow">
        <div className="flex flex-row gap-3 items-center justify-between">
          <Link href={`/books/${info.googleId}`}>
            <h3 className="font-semibold text-lg md:text-xl">{info.title}</h3>
          </Link>
          <ActionButton
            variant="primary"
            action={() => addBook(info.googleId)}
            onSuccess={() => setIsInCollection(true)}
            disabled={isInCollection}
          >
            {!isInCollection ? "Add to Collection" : "In Collection"}
          </ActionButton>
        </div>
        <div className="flex flex-row gap-2">
          <div className="md:hidden">
            {info.thumbnail && <img src={info.thumbnail} alt="Book Cover" />}
          </div>
          <div className="bg-violet-100 size-full grow rounded-sm p-4 flex flex-col gap-1">
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
              <b>Date Publish:</b> {info.publishedDate?.toDateString() ?? "-"}
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
