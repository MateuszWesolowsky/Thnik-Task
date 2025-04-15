import { useEffect, useState } from "react";
import { Holiday } from "../types/types";

const API_KEY = "OH+HEf/9IH2zuHR/cMO/8g==ldhBovC6Rpa1TIss";

export const useHolidays = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/holidays?country=PL`,
          {
            headers: {
              "X-Api-Key": API_KEY,
            },
          }
        );

        const data = await response.json();

        setHolidays(data);
      } catch (err) {
        console.error("Failed to fetch holidays", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  return { holidays, loading };
};
