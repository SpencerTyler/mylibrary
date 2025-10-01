"use client";
import { Book as BookModel } from "@/models/books";
import { removeBook } from "@/lib/actions";
import ActionButton from "./actionbutton";

interface ShelvedBookActionsProps {
  book: BookModel;
  onDelete?: () => void;
}

export default function ShelvedBookActions({
  book,
  onDelete,
}: ShelvedBookActionsProps) {
  return (
    <ActionButton
      variant="danger"
      action={() => removeBook(book.googleId)}
      onSuccess={onDelete}
    >
      Delete
    </ActionButton>
  );
}
