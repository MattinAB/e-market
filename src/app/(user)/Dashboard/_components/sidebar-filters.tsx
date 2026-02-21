"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { useCallback, useState, useMemo } from "react";
import { useTranslations } from "@/lib/locale-provider";

const PRODUCT_PATHS = ["/Dashboard/mens", "/Dashboard/womans", "/Dashboard/kids"];

export function SidebarFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations().filters;
  const [priceOpen, setPriceOpen] = useState(true);
  const [sortOpen, setSortOpen] = useState(true);

  const SORT_OPTIONS = useMemo(
    () => [
      { value: "relevance", label: t.relevance },
      { value: "price_asc", label: t.priceLowHigh },
      { value: "price_desc", label: t.priceHighLow },
      { value: "newest", label: t.newest },
    ],
    [t],
  );

  const PRICE_RANGES = useMemo(
    () => [
      { label: t.allPrices, min: undefined as number | undefined, max: undefined as number | undefined },
      { label: t.under25, min: 0, max: 25 },
      { label: t.price25to50, min: 25, max: 50 },
      { label: t.price50to100, min: 50, max: 100 },
      { label: t.price100Plus, min: 100, max: undefined },
    ],
    [t],
  );

  const isProductPage = PRODUCT_PATHS.includes(pathname);

  const updateParams = useCallback(
    (updates: Record<string, string | number | undefined>) => {
      const next = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === "") {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      }
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const sort = searchParams.get("sort") ?? "relevance";
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const hasActiveFilters =
    (sort && sort !== "relevance") || minPrice !== null || maxPrice !== null;

  const clearFilters = () => {
    router.replace(pathname, { scroll: false });
  };

  if (!isProductPage) return null;

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <SlidersHorizontal className="size-4" />
            {t.filters}
          </span>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
              onClick={clearFilters}
            >
              <X className="size-3 mr-1" />
              {t.clear}
            </Button>
          )}
        </SidebarGroupLabel>
        <SidebarSeparator className="bg-border/50" />
        <SidebarGroupContent className="space-y-2">
          <Collapsible open={sortOpen} onOpenChange={setSortOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between font-normal text-sidebar-foreground"
              >
                {t.sortBy}
                <ChevronDown
                  className={`size-4 transition-transform ${sortOpen ? "rotate-180" : ""}`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <Select
                value={sort}
                onValueChange={(value) =>
                  updateParams({ sort: value === "relevance" ? undefined : value })
                }
              >
                <SelectTrigger className="mt-1 w-full h-8">
                  <SelectValue placeholder={t.relevance} />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={priceOpen} onOpenChange={setPriceOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-between font-normal text-sidebar-foreground"
              >
                {t.price}
                <ChevronDown
                  className={`size-4 transition-transform ${priceOpen ? "rotate-180" : ""}`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-2 space-y-1.5 pl-1">
                {PRICE_RANGES.map((range) => {
                  const isActive =
                    (minPrice === undefined || minPrice === String(range.min)) &&
                    (maxPrice === undefined || maxPrice === String(range.max));
                  return (
                    <button
                      key={range.label}
                      type="button"
                      onClick={() =>
                        updateParams({
                          minPrice: range.min,
                          maxPrice: range.max,
                        })
                      }
                      className={`block w-full rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      {range.label}
                    </button>
                  );
                })}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
