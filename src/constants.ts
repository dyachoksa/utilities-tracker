export const providerTypes = ["natural_gas", "electricity", "water", "heating", "maintenance", "other"] as const;

export type ProviderType = (typeof providerTypes)[number];

export const providerTypeColors: Record<"light" | "dark", Record<ProviderType, string>> = {
  light: {
    natural_gas: "#80d4eb", // light aqua
    electricity: "#ffe082", // soft yellow
    water: "#90caf9", // light blue
    heating: "#ffab91", // peach-orange
    maintenance: "#a5d6a7", // mint green
    other: "#cfd8dc", // light gray-blue
  },
  dark: {
    natural_gas: "#4dd0e1", // soft teal
    electricity: "#fff176", // pale yellow
    water: "#81d4fa", // sky blue
    heating: "#ff8a65", // soft coral
    maintenance: "#aed581", // light green
    other: "#b0bec5", // light gray-blue
  },
};

export const tariffTypes = ["counter-based", "fixed-rate", "area-based"] as const;

export type TariffType = (typeof tariffTypes)[number];

export const tariffTypeOptions: { value: TariffType; label: string }[] = [
  { value: "counter-based", label: "Counter-based" },
  { value: "fixed-rate", label: "Fixed rate" },
  { value: "area-based", label: "Area-based" },
];
