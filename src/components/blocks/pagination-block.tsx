import { ChevronFirstIcon, ChevronLastIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "~/components/ui/pagination";
import { usePagination } from "~/hooks/use-pagination";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
  onPageChange: (page: number) => void;
};

export function PaginationBlock({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
  onPageChange,
}: PaginationProps) {
  const t = useTranslations("payments.pagination");
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  });

  return (
    <Pagination>
      <PaginationContent>
        {/* First page button */}
        <PaginationItem>
          <PaginationLink
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-label={t("goToFirstPage")}
            aria-disabled={currentPage === 1 ? true : undefined}
            role={currentPage === 1 ? "button" : undefined}
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            <ChevronFirstIcon aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>

        {/* Previous page button */}
        <PaginationItem>
          <PaginationLink
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-label={t("goToPreviousPage")}
            aria-disabled={currentPage === 1 ? true : undefined}
            role={currentPage === 1 ? "button" : undefined}
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>

        {/* Left ellipsis (...) */}
        {showLeftEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Page number links */}
        {pages.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink isActive={page === currentPage} onClick={() => onPageChange(page)}>
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Right ellipsis (...) */}
        {showRightEllipsis && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next page button */}
        <PaginationItem>
          <PaginationLink
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-label={t("goToNextPage")}
            aria-disabled={currentPage === totalPages ? true : undefined}
            role={currentPage === totalPages ? "button" : undefined}
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>

        {/* Last page button */}
        <PaginationItem>
          <PaginationLink
            className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
            aria-label={t("goToLastPage")}
            aria-disabled={currentPage === totalPages ? true : undefined}
            role={currentPage === totalPages ? "button" : undefined}
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronLastIcon aria-hidden="true" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
