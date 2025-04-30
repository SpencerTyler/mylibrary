"use client";

import SearchInput from "@/components/searchinput";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BookSearchProps {
  initialSearchTerm?: string;
}

export default function BookSearch({
  initialSearchTerm = "",
}: BookSearchProps) {
  const pathname = usePathname();
  const [search, setSearch] = useState(initialSearchTerm);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace(`${pathname}?search=${encodeURIComponent(search)}`);
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [search, router, pathname]);

  return <SearchInput value={search} onSearch={setSearch} />;
}
