export const providerTypes = ["natural_gas", "electricity", "water", "heating", "maintenance", "other"] as const;

export const providerTypeOptions: { value: (typeof providerTypes)[number]; label: string }[] = [
  { value: "electricity", label: "Electricity" },
  { value: "natural_gas", label: "Natural gas" },
  { value: "water", label: "Water" },
  { value: "heating", label: "Heating" },
  { value: "maintenance", label: "Maintenance" },
  { value: "other", label: "Other" },
];

export const providerTypeLabels: Record<(typeof providerTypes)[number], string> = {
  natural_gas: "Natural gas",
  electricity: "Electricity",
  water: "Water",
  heating: "Heating",
  maintenance: "Maintenance",
  other: "Other",
};
