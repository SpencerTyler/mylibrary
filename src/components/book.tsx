import { Book as BookModel } from "@/models/books";

interface BookProps {
  info: BookModel;
}

export default function Book({ info }: BookProps) {
  return (
    <div className="bg-slate-100 p-4 rounded flex flex-row gap-4">
      <div className="hidden md:block min-w-[128px]">
        {info.thumbnail && <img src={info.thumbnail} alt="Book Cover" />}
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-semibold text-lg md:text-xl">{info.title}</h3>
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
