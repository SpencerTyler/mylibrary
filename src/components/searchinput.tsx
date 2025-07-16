"use client";

interface SearchInputProps {
  value?: string;
  onSearch?: (term: string) => void;
}

export default function SearchInput({ value, onSearch }: SearchInputProps) {
  return (
    <input
      className="bg-slate-200 border border-slate-400 rounded-sm text-emerald-600 p-2 focus:border-slate-900 outline-0"
      type="text"
      value={value}
      placeholder="Enter Search Term"
      onChange={(e) => {
        onSearch?.(e.target.value);
      }}
    />
  );
}
