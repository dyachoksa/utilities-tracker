"use client";

import { useId, useState } from "react";

import { ErrorMessage } from "~/components/blocks/error-message";
import { LoadingIndicator } from "~/components/blocks/loading-indicator";
import { PaginationBlock } from "~/components/blocks/pagination-block";
import { AddPaymentButton } from "~/components/elements/add-payment-button";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { usePayments } from "~/hooks/use-payment-queries";

import { PaymentRow } from "./payment-row";

interface Props {
  householdId?: string;
  providerId?: string;
}

export const PaymentsTable = ({ householdId, providerId }: Props) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const { data, isLoading, error } = usePayments({ householdId, providerId, page, perPage });

  const perPageId = useId();

  const showPagination = !!data?.meta && data.meta.total > perPage;

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead>Period</TableHead>
          <TableHead>Household</TableHead>
          <TableHead>Provider</TableHead>
          <TableHead>Latest readings</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Paid amount</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <tbody aria-hidden="true" className="table-row h-2"></tbody>

      <TableBody>
        {isLoading && (
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={7} className="py-4 text-center">
              <LoadingIndicator className="h-full min-h-16" />
            </TableCell>
          </TableRow>
        )}

        {error && (
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={7} className="py-4 text-center">
              <ErrorMessage message="Failed to fetch payments" error={error} />
            </TableCell>
          </TableRow>
        )}

        {data?.meta.total === 0 && (
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={7} className="py-4 text-center">
              <p className="inline-flex items-center gap-2">
                No payments found. <AddPaymentButton householdId={householdId} />
              </p>
            </TableCell>
          </TableRow>
        )}

        {data?.items.map((payment) => (
          <PaymentRow key={payment.id} payment={payment} />
        ))}
      </TableBody>

      <tbody aria-hidden="true" className="table-row h-2"></tbody>

      <TableFooter className="bg-transparent">
        <TableRow className="hover:bg-transparent">
          <TableCell colSpan={7} className="py-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <Label htmlFor={perPageId}>Per page</Label>
                <Select
                  value={perPage.toString()}
                  onValueChange={(value) => {
                    setPerPage(Number(value));
                    setPage(1);
                  }}
                >
                  <SelectTrigger size="sm" id={perPageId} className="w-fit whitespace-nowrap">
                    <SelectValue placeholder="Select number of results" />
                  </SelectTrigger>
                  <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {showPagination && (
                <PaginationBlock
                  currentPage={page}
                  totalPages={Math.ceil(data.meta.total / perPage)}
                  onPageChange={setPage}
                />
              )}
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
