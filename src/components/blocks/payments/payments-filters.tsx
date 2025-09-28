"use client";

import { Loader2Icon } from "lucide-react";
import { useState } from "react";

import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useHouseholds } from "~/hooks/use-household-queries";

type PaymentStatus = "all" | "paid" | "unpaid";

interface Props {
  onHouseholdChange: (householdId?: string) => void;
  onIsPaidChange: (isPaid?: boolean) => void;
}

export const PaymentsFilters = ({ onHouseholdChange, onIsPaidChange }: Props) => {
  const { data: households, isLoading: isLoadingHouseholds } = useHouseholds();

  const [selectedHousehold, setSelectedHousehold] = useState<string>("");
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState<PaymentStatus>("all");

  const clearFilters = () => {
    setSelectedHousehold("");
    setSelectedPaymentStatus("all");
    onHouseholdChange(undefined);
    onIsPaidChange(undefined);
  };

  const handleHouseholdChange = (householdId: string) => {
    setSelectedHousehold(householdId);
    onHouseholdChange(!!householdId ? householdId : undefined);
  };

  const handlePaymentStatusChange = (paymentStatus: PaymentStatus) => {
    setSelectedPaymentStatus(paymentStatus);
    onIsPaidChange(paymentStatus === "paid" ? true : paymentStatus === "unpaid" ? false : undefined);
  };

  const isFiltering = !!selectedHousehold || selectedPaymentStatus !== "all";

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex w-full items-center gap-2">
        <div className="w-full md:max-w-64">
          {isLoadingHouseholds && (
            <div className="flex items-center justify-center py-1">
              <Loader2Icon className="text-primary/75 size-7 animate-spin" />
            </div>
          )}

          {households && !isLoadingHouseholds && (
            <Select onValueChange={handleHouseholdChange} value={selectedHousehold}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select household" />
              </SelectTrigger>

              <SelectContent>
                {households.map((household) => (
                  <SelectItem key={household.id} value={household.id}>
                    {household.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="w-full md:max-w-40">
          <Select onValueChange={handlePaymentStatusChange} value={selectedPaymentStatus}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Payment status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="unpaid">Unpaid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isFiltering && (
        <Button variant="link" size="sm" onClick={clearFilters}>
          Clear filters
        </Button>
      )}
    </div>
  );
};
