"use client";
import { Book as BookModel } from "@/models/books";
import ShelvedBookActions from "./shelvedbookactions";
import { useState } from "react";

interface ShelvedBookProps {
  book: BookModel;
}

export default function ShelvedBook({ book }: ShelvedBookProps) {
  const [isDeleted, setIsDeleted] = useState(false);

  if (isDeleted) {
    return null;
  }

  return (
    <div className="border border-gray-800 rounded w-full p-2 flex justify-between">
      {book.title}
      <ShelvedBookActions book={book} onDelete={() => setIsDeleted(true)} />
    </div>
  );
}
