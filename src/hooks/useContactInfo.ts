import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface ContactInfo {
  id: number;
  address: string;
  phone: string;
  email: string;
  business_hours: string;
  updated_at?: string;
}

export const useContactInfo = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from("contact_info")
          .select("*")
          .order("id", { ascending: true })
          .limit(1);

        if (error) throw error;

        if (data && data.length > 0) {
          setContactInfo(data[0]);
        } else {
          // Fallback default values if no data in database
          setContactInfo({
            id: 0,
            address: "123 Business Avenue, Mumbai, India",
            phone: "+91 123 456 7890",
            email: "contact@jovianoverseas.com",
            business_hours: "Mon-Fri: 9:00 AM - 6:00 PM IST",
          });
        }
      } catch (err) {
        console.error("Error fetching contact info:", err);
        setError("Failed to load contact information");

        // Set fallback values on error
        setContactInfo({
          id: 0,
          address: "123 Business Avenue, Mumbai, India",
          phone: "+91 123 456 7890",
          email: "contact@jovianoverseas.com",
          business_hours: "Mon-Fri: 9:00 AM - 6:00 PM IST",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();

    // Set up realtime subscription
    const subscription = supabase
      .channel("contact_info_changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "contact_info" },
        (payload) => {
          setContactInfo(payload.new as ContactInfo);
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { contactInfo, loading, error };
};
