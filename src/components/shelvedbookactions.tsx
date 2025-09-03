"use client";
import { Book as BookModel } from "@/models/books";
import Button from "./button";
import { removeBook } from "@/lib/actions";
import { Toast } from "@base-ui-components/react";

interface ShelvedBookActionsProps {
  book: BookModel;
}

export default function ShelvedBookActions({ book }: ShelvedBookActionsProps) {
  const toastManager = Toast.useToastManager();
  const handleRemove = async () => {
    const result = await removeBook(book.googleId);
    if (result.error) {
      toastManager.add({
        title: "Error",
        description: result.error,
        type: "danger",
      });
    }
  };

  return (
    <Button variant="danger" onClick={handleRemove}>
      Delete
    </Button>
  );
}
