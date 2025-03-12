import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface DropdownItem {
  id: number;
  navigation_item_id: number;
  name: string;
  href: string;
  display_order: number;
  is_active: boolean;
}

export interface NavigationItem {
  id: number;
  name: string;
  href: string;
  location: string;
  display_order: number;
  has_dropdown: boolean;
  is_active: boolean;
  dropdownItems?: DropdownItem[];
}

export const useNavigation = (location: "header" | "footer") => {
  const [navigationItems, setNavigationItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNavigationItems = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch navigation items for the specified location
        const { data: navItems, error: navError } = await supabase
          .from("navigation_items")
          .select("*")
          .eq("location", location)
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (navError) throw navError;

        // For items with dropdowns, fetch their dropdown items
        const itemsWithDropdowns = await Promise.all(
          navItems.map(async (item) => {
            if (item.has_dropdown) {
              const { data: dropdownItems, error: dropdownError } =
                await supabase
                  .from("dropdown_items")
                  .select("*")
                  .eq("navigation_item_id", item.id)
                  .eq("is_active", true)
                  .order("display_order", { ascending: true });

              if (dropdownError) throw dropdownError;

              return { ...item, dropdownItems };
            }
            return item;
          }),
        );

        setNavigationItems(itemsWithDropdowns);
      } catch (err) {
        console.error(`Error fetching ${location} navigation items:`, err);
        setError(`Failed to load ${location} navigation items`);

        // Set default navigation items based on location
        if (location === "header") {
          setNavigationItems([
            {
              id: 1,
              name: "Home",
              href: "/",
              location: "header",
              display_order: 1,
              has_dropdown: false,
              is_active: true,
            },
            {
              id: 2,
              name: "Products",
              href: "/products",
              location: "header",
              display_order: 2,
              has_dropdown: true,
              is_active: true,
              dropdownItems: [
                {
                  id: 1,
                  navigation_item_id: 2,
                  name: "Pulses",
                  href: "#pulses",
                  display_order: 1,
                  is_active: true,
                },
                {
                  id: 2,
                  navigation_item_id: 2,
                  name: "Grains",
                  href: "#grains",
                  display_order: 2,
                  is_active: true,
                },
                {
                  id: 3,
                  navigation_item_id: 2,
                  name: "Spices",
                  href: "#spices",
                  display_order: 3,
                  is_active: true,
                },
                {
                  id: 4,
                  navigation_item_id: 2,
                  name: "Oil Seeds",
                  href: "#oil-seeds",
                  display_order: 4,
                  is_active: true,
                },
                {
                  id: 5,
                  navigation_item_id: 2,
                  name: "Cotton",
                  href: "#cotton",
                  display_order: 5,
                  is_active: true,
                },
              ],
            },
            {
              id: 3,
              name: "About Us",
              href: "/about",
              location: "header",
              display_order: 3,
              has_dropdown: false,
              is_active: true,
            },
            {
              id: 4,
              name: "Contact",
              href: "/#contact",
              location: "header",
              display_order: 4,
              has_dropdown: false,
              is_active: true,
            },
            {
              id: 5,
              name: "Forms",
              href: "/forms",
              location: "header",
              display_order: 5,
              has_dropdown: false,
              is_active: true,
            },
          ]);
        } else {
          setNavigationItems([
            {
              id: 1,
              name: "About Us",
              href: "#about",
              location: "footer",
              display_order: 1,
              has_dropdown: false,
              is_active: true,
            },
            {
              id: 2,
              name: "Products",
              href: "#products",
              location: "footer",
              display_order: 2,
              has_dropdown: false,
              is_active: true,
            },
            {
              id: 3,
              name: "Contact",
              href: "#contact",
              location: "footer",
              display_order: 3,
              has_dropdown: false,
              is_active: true,
            },
            {
              id: 4,
              name: "Forms",
              href: "/forms",
              location: "footer",
              display_order: 4,
              has_dropdown: false,
              is_active: true,
            },
            {
              id: 5,
              name: "Terms & Conditions",
              href: "/terms",
              location: "footer",
              display_order: 5,
              has_dropdown: false,
              is_active: true,
            },
            {
              id: 6,
              name: "Payment Terms",
              href: "/payment-terms",
              location: "footer",
              display_order: 6,
              has_dropdown: false,
              is_active: true,
            },
            {
              id: 7,
              name: "Careers",
              href: "/careers",
              location: "footer",
              display_order: 7,
              has_dropdown: false,
              is_active: true,
            },
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNavigationItems();

    // Set up realtime subscription for navigation items
    const navigationSubscription = supabase
      .channel(`${location}_navigation_changes`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "navigation_items" },
        fetchNavigationItems,
      )
      .subscribe();

    // Set up realtime subscription for dropdown items
    const dropdownSubscription = supabase
      .channel(`${location}_dropdown_changes`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "dropdown_items" },
        fetchNavigationItems,
      )
      .subscribe();

    return () => {
      navigationSubscription.unsubscribe();
      dropdownSubscription.unsubscribe();
    };
  }, [location]);

  return { navigationItems, loading, error };
};
