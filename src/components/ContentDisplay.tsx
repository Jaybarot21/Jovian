import { useState, useEffect } from "react";
import { useSupabaseRealtime } from "../hooks/useSupabaseRealtime";
import ReactMarkdown from "react-markdown";
import { supabase } from "../lib/supabase";

interface ContentDisplayProps {
  pageType: "payment_terms" | "terms_conditions";
}

const ContentDisplay = ({ pageType }: ContentDisplayProps) => {
  const { data: contentPages, loading } = useSupabaseRealtime("content_pages");
  const [content, setContent] = useState("");

  // Fetch content directly on first load
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const { data, error } = await supabase
          .from("content_pages")
          .select("content")
          .eq("page_type", pageType)
          .single();

        if (error) {
          console.error("Error fetching content:", error);
          return;
        }

        if (data) {
          setContent(data.content);
        }
      } catch (err) {
        console.error("Error in content fetch:", err);
      }
    };

    fetchContent();
  }, [pageType]);

  // Update content when data changes from realtime subscription
  useEffect(() => {
    if (contentPages && contentPages.length > 0) {
      const page = contentPages.find((p) => p.page_type === pageType);
      if (page) {
        setContent(page.content);
      }
    }
  }, [contentPages, pageType]);

  if (loading && !content) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">Loading...</div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
      <div className="prose prose-headings:text-green-800 prose-a:text-green-600 max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ContentDisplay;
