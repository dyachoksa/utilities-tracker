import { useQuery } from "@tanstack/react-query";

import { api } from "~/lib/api";

export type MeterReadingsKeyParams = {
  tariffId?: string;
  sub?: string;
};

export const meterReadingsKey = (params: MeterReadingsKeyParams) => ["meter-readings", params].filter(Boolean);

export const useLatestMeterReadings = (tariffId: string) =>
  useQuery({
    queryKey: meterReadingsKey({ tariffId, sub: "latest" }),
    queryFn: async () => {
      const res = await api.tariffs[":id"]["latest-readings"].$get({ param: { id: tariffId } });

      if (res.status === 404) {
        const data = await res.json();
        throw new Error(data.message);
      }

      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      return res.json();
    },
  });
