import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Table =
  | "products"
  | "media_library"
  | "catalogs"
  | "social_links"
  | "content_pages"
  | "email_templates";

export function useSupabaseRealtime<T>(table: Table, initialData: T[] = []) {
  const [data, setData] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: fetchedData, error } = await supabase
          .from(table)
          .select("*");

        if (error) throw error;
        if (fetchedData) setData(fetchedData as T[]);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        console.error(`Error fetching ${table}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table]);

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase.channel(`${table}-changes`);

    const subscription = channel
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        (payload) => {
          console.log("Change received!", payload);

          // Handle different types of changes
          if (payload.eventType === "INSERT") {
            setData((currentData) => [...currentData, payload.new as T]);
          } else if (payload.eventType === "UPDATE") {
            setData((currentData) =>
              currentData.map((item) =>
                // @ts-ignore - we know id exists on our tables
                item.id === payload.new.id ? (payload.new as T) : item,
              ),
            );
          } else if (payload.eventType === "DELETE") {
            setData((currentData) =>
              currentData.filter(
                // @ts-ignore - we know id exists on our tables
                (item) => item.id !== payload.old.id,
              ),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [table]);

  return { data, loading, error };
}
