"use client";
import { addBook } from "@/lib/actions";
import { Book as BookModel } from "@/models/books";
import Link from "next/link";
import { useState } from "react";
import { Toast } from "@base-ui-components/react";
import Button from "./button";

interface BookProps {
  info: BookModel;
  inCollection: boolean;
}

type BookAddState = "In Collection" | "Saving" | "Not in Collection";

export default function Book({ info, inCollection }: BookProps) {
  const toastManager = Toast.useToastManager();
  const [state, setState] = useState<BookAddState>(
    inCollection ? "In Collection" : "Not in Collection"
  );

  const handleAdd = async () => {
    if (state !== "Not in Collection") {
      return;
    }
    setState("Saving");
    const result = await addBook(info.googleId);
    if (result.error) {
      toastManager.add({
        title: "Error",
        description: result.error,
        type: "danger",
      });
      setState("Not in Collection");
    } else {
      setState("In Collection");
    }
  };

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
          <Button
            variant="primary"
            onClick={handleAdd}
            disabled={state !== "Not in Collection"}
          >
            {state === "Not in Collection" && "Add to Collection"}
            {state === "Saving" && "Saving..."}
            {state === "In Collection" && "In Collection"}
          </Button>
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
