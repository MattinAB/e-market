"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type SearchBarProps = {
  placeholder?: string;
};

export function SearchBar({ placeholder = "Search products..." }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (trimmed) {
        router.push(`/Dashboard/mens?q=${encodeURIComponent(trimmed)}`);
      } else {
        router.push("/Dashboard/mens");
      }
    },
    [query, router]
  );

  return (
    <form onSubmit={handleSearch} className="relative flex w-full gap-1">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-9 pl-9 pr-4"
          aria-label="Search products"
        />
      </div>
      <Button type="submit" size="sm" className="shrink-0">
        Search
      </Button>
    </form>
  );
}
