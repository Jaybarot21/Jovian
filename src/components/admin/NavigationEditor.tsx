import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import {
  AlertCircle,
  Save,
  Loader2,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { supabase } from "../../lib/supabase";
import { NavigationItem, DropdownItem } from "../../hooks/useNavigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const NavigationEditor = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("header");
  const [headerNavItems, setHeaderNavItems] = useState<NavigationItem[]>([]);
  const [footerNavItems, setFooterNavItems] = useState<NavigationItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<NavigationItem | null>(null);
  const [selectedDropdownItem, setSelectedDropdownItem] =
    useState<DropdownItem | null>(null);

  useEffect(() => {
    fetchNavigationItems();
  }, []);

  const fetchNavigationItems = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch header navigation items
      const { data: headerItems, error: headerError } = await supabase
        .from("navigation_items")
        .select("*")
        .eq("location", "header")
        .order("display_order", { ascending: true });

      if (headerError) throw headerError;

      // Fetch footer navigation items
      const { data: footerItems, error: footerError } = await supabase
        .from("navigation_items")
        .select("*")
        .eq("location", "footer")
        .order("display_order", { ascending: true });

      if (footerError) throw footerError;

      // For items with dropdowns, fetch their dropdown items
      const headerItemsWithDropdowns = await Promise.all(
        headerItems.map(async (item) => {
          if (item.has_dropdown) {
            const { data: dropdownItems, error: dropdownError } = await supabase
              .from("dropdown_items")
              .select("*")
              .eq("navigation_item_id", item.id)
              .order("display_order", { ascending: true });

            if (dropdownError) throw dropdownError;

            return { ...item, dropdownItems };
          }
          return item;
        }),
      );

      setHeaderNavItems(headerItemsWithDropdowns);
      setFooterNavItems(footerItems);
    } catch (err) {
      console.error("Error fetching navigation items:", err);
      setError("Failed to load navigation items");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectItem = (item: NavigationItem) => {
    setSelectedItem(item);
    setSelectedDropdownItem(null);
  };

  const handleSelectDropdownItem = (item: DropdownItem) => {
    setSelectedDropdownItem(item);
  };

  const handleItemChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (selectedItem) {
      setSelectedItem({
        ...selectedItem,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleDropdownItemChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (selectedDropdownItem) {
      setSelectedDropdownItem({
        ...selectedDropdownItem,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSaveItem = async () => {
    if (!selectedItem) return;

    try {
      setSaving(true);
      setError("");
      setSuccess(false);

      const { error } = await supabase
        .from("navigation_items")
        .update({
          name: selectedItem.name,
          href: selectedItem.href,
          has_dropdown: selectedItem.has_dropdown,
          is_active: selectedItem.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedItem.id);

      if (error) throw error;

      setSuccess(true);
      fetchNavigationItems();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error updating navigation item:", err);
      setError("Failed to update navigation item");
    } finally {
      setSaving(false);
    }
  };

  const handleSaveDropdownItem = async () => {
    if (!selectedDropdownItem) return;

    try {
      setSaving(true);
      setError("");
      setSuccess(false);

      const { error } = await supabase
        .from("dropdown_items")
        .update({
          name: selectedDropdownItem.name,
          href: selectedDropdownItem.href,
          is_active: selectedDropdownItem.is_active,
          updated_at: new Date().toISOString(),
        })
        .eq("id", selectedDropdownItem.id);

      if (error) throw error;

      setSuccess(true);
      fetchNavigationItems();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error updating dropdown item:", err);
      setError("Failed to update dropdown item");
    } finally {
      setSaving(false);
    }
  };

  const handleAddItem = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess(false);

      const location = activeTab;
      const items = location === "header" ? headerNavItems : footerNavItems;
      const maxOrder =
        items.length > 0
          ? Math.max(...items.map((item) => item.display_order))
          : 0;

      const { data, error } = await supabase
        .from("navigation_items")
        .insert({
          name: "New Item",
          href: "/",
          location,
          display_order: maxOrder + 1,
          has_dropdown: false,
          is_active: true,
        })
        .select();

      if (error) throw error;

      setSuccess(true);
      fetchNavigationItems();
      if (data && data.length > 0) {
        setSelectedItem(data[0]);
      }
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error adding navigation item:", err);
      setError("Failed to add navigation item");
    } finally {
      setSaving(false);
    }
  };

  const handleAddDropdownItem = async () => {
    if (!selectedItem || !selectedItem.has_dropdown) return;

    try {
      setSaving(true);
      setError("");
      setSuccess(false);

      const dropdownItems = selectedItem.dropdownItems || [];
      const maxOrder =
        dropdownItems.length > 0
          ? Math.max(...dropdownItems.map((item) => item.display_order))
          : 0;

      const { data, error } = await supabase
        .from("dropdown_items")
        .insert({
          navigation_item_id: selectedItem.id,
          name: "New Dropdown Item",
          href: "#",
          display_order: maxOrder + 1,
          is_active: true,
        })
        .select();

      if (error) throw error;

      setSuccess(true);
      fetchNavigationItems();
      if (data && data.length > 0) {
        setSelectedDropdownItem(data[0]);
      }
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error adding dropdown item:", err);
      setError("Failed to add dropdown item");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) return;

    try {
      setSaving(true);
      setError("");
      setSuccess(false);

      const { error } = await supabase
        .from("navigation_items")
        .delete()
        .eq("id", selectedItem.id);

      if (error) throw error;

      setSuccess(true);
      setSelectedItem(null);
      fetchNavigationItems();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error deleting navigation item:", err);
      setError("Failed to delete navigation item");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteDropdownItem = async () => {
    if (!selectedDropdownItem) return;

    try {
      setSaving(true);
      setError("");
      setSuccess(false);

      const { error } = await supabase
        .from("dropdown_items")
        .delete()
        .eq("id", selectedDropdownItem.id);

      if (error) throw error;

      setSuccess(true);
      setSelectedDropdownItem(null);
      fetchNavigationItems();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error deleting dropdown item:", err);
      setError("Failed to delete dropdown item");
    } finally {
      setSaving(false);
    }
  };

  const handleMoveItem = async (direction: "up" | "down") => {
    if (!selectedItem) return;

    try {
      setSaving(true);
      setError("");
      setSuccess(false);

      const items =
        selectedItem.location === "header" ? headerNavItems : footerNavItems;
      const currentIndex = items.findIndex(
        (item) => item.id === selectedItem.id,
      );

      if (
        (direction === "up" && currentIndex === 0) ||
        (direction === "down" && currentIndex === items.length - 1)
      ) {
        return;
      }

      const swapIndex =
        direction === "up" ? currentIndex - 1 : currentIndex + 1;
      const swapItem = items[swapIndex];

      // Swap display orders
      const { error: error1 } = await supabase
        .from("navigation_items")
        .update({ display_order: swapItem.display_order })
        .eq("id", selectedItem.id);

      if (error1) throw error1;

      const { error: error2 } = await supabase
        .from("navigation_items")
        .update({ display_order: selectedItem.display_order })
        .eq("id", swapItem.id);

      if (error2) throw error2;

      setSuccess(true);
      fetchNavigationItems();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error moving navigation item:", err);
      setError("Failed to move navigation item");
    } finally {
      setSaving(false);
    }
  };

  const handleMoveDropdownItem = async (direction: "up" | "down") => {
    if (!selectedDropdownItem || !selectedItem || !selectedItem.dropdownItems)
      return;

    try {
      setSaving(true);
      setError("");
      setSuccess(false);

      const items = selectedItem.dropdownItems;
      const currentIndex = items.findIndex(
        (item) => item.id === selectedDropdownItem.id,
      );

      if (
        (direction === "up" && currentIndex === 0) ||
        (direction === "down" && currentIndex === items.length - 1)
      ) {
        return;
      }

      const swapIndex =
        direction === "up" ? currentIndex - 1 : currentIndex + 1;
      const swapItem = items[swapIndex];

      // Swap display orders
      const { error: error1 } = await supabase
        .from("dropdown_items")
        .update({ display_order: swapItem.display_order })
        .eq("id", selectedDropdownItem.id);

      if (error1) throw error1;

      const { error: error2 } = await supabase
        .from("dropdown_items")
        .update({ display_order: selectedDropdownItem.display_order })
        .eq("id", swapItem.id);

      if (error2) throw error2;

      setSuccess(true);
      fetchNavigationItems();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error moving dropdown item:", err);
      setError("Failed to move dropdown item");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
        <p className="ml-2 text-green-700">Loading navigation items...</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 border-green-200">
      <h2 className="text-xl font-bold text-green-800 mb-6">Edit Navigation</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200 flex items-start">
          <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md border border-green-200">
          Navigation updated successfully!
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="header">Header Navigation</TabsTrigger>
          <TabsTrigger value="footer">Footer Navigation</TabsTrigger>
        </TabsList>

        <TabsContent value="header" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-green-800">
              Header Menu Items
            </h3>
            <Button
              onClick={handleAddItem}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={saving}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Navigation Items List */}
            <div className="border rounded-md p-4">
              <h4 className="font-medium text-green-800 mb-3">Menu Items</h4>
              <ul className="space-y-2">
                {headerNavItems.map((item) => (
                  <li
                    key={item.id}
                    className={`p-2 rounded cursor-pointer ${selectedItem?.id === item.id ? "bg-green-100" : "hover:bg-green-50"}`}
                    onClick={() => handleSelectItem(item)}
                  >
                    <div className="flex justify-between items-center">
                      <span className={!item.is_active ? "text-gray-400" : ""}>
                        {item.name}
                      </span>
                      {item.has_dropdown && (
                        <span className="text-xs bg-green-200 text-green-800 px-1 rounded">
                          Dropdown
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Item Editor */}
            <div className="border rounded-md p-4 md:col-span-2">
              {selectedItem ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-green-800">Edit Item</h4>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveItem("up")}
                        disabled={
                          saving || headerNavItems.indexOf(selectedItem) === 0
                        }
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveItem("down")}
                        disabled={
                          saving ||
                          headerNavItems.indexOf(selectedItem) ===
                            headerNavItems.length - 1
                        }
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDeleteItem}
                        disabled={saving}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={selectedItem.name}
                      onChange={handleItemChange}
                      className="bg-white border-green-200 text-green-800 focus:border-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="href">URL / Link</Label>
                    <Input
                      id="href"
                      name="href"
                      value={selectedItem.href}
                      onChange={handleItemChange}
                      className="bg-white border-green-200 text-green-800 focus:border-green-500"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="has_dropdown"
                      name="has_dropdown"
                      checked={selectedItem.has_dropdown}
                      onCheckedChange={(checked) => {
                        setSelectedItem({
                          ...selectedItem,
                          has_dropdown: !!checked,
                        });
                      }}
                    />
                    <Label htmlFor="has_dropdown">Has Dropdown Menu</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_active"
                      name="is_active"
                      checked={selectedItem.is_active}
                      onCheckedChange={(checked) => {
                        setSelectedItem({
                          ...selectedItem,
                          is_active: !!checked,
                        });
                      }}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>

                  <Button
                    onClick={handleSaveItem}
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>

                  {/* Dropdown Items Section */}
                  {selectedItem.has_dropdown && (
                    <div className="mt-6 pt-6 border-t">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-green-800">
                          Dropdown Items
                        </h4>
                        <Button
                          onClick={handleAddDropdownItem}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white"
                          disabled={saving}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Dropdown Items List */}
                        <div className="border rounded-md p-3">
                          <ul className="space-y-1">
                            {selectedItem.dropdownItems?.map((item) => (
                              <li
                                key={item.id}
                                className={`p-1.5 rounded cursor-pointer text-sm ${selectedDropdownItem?.id === item.id ? "bg-green-100" : "hover:bg-green-50"}`}
                                onClick={() => handleSelectDropdownItem(item)}
                              >
                                <span
                                  className={
                                    !item.is_active ? "text-gray-400" : ""
                                  }
                                >
                                  {item.name}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Dropdown Item Editor */}
                        {selectedDropdownItem && (
                          <div className="border rounded-md p-3">
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="font-medium text-green-800 text-sm">
                                Edit Dropdown Item
                              </h5>
                              <div className="flex space-x-1">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleMoveDropdownItem("up")}
                                  disabled={
                                    saving ||
                                    !selectedItem.dropdownItems ||
                                    selectedItem.dropdownItems.indexOf(
                                      selectedDropdownItem,
                                    ) === 0
                                  }
                                >
                                  <ArrowUp className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleMoveDropdownItem("down")}
                                  disabled={
                                    saving ||
                                    !selectedItem.dropdownItems ||
                                    selectedItem.dropdownItems.indexOf(
                                      selectedDropdownItem,
                                    ) ===
                                      selectedItem.dropdownItems.length - 1
                                  }
                                >
                                  <ArrowDown className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={handleDeleteDropdownItem}
                                  disabled={saving}
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label
                                htmlFor="dropdown_name"
                                className="text-sm"
                              >
                                Name
                              </Label>
                              <Input
                                id="dropdown_name"
                                name="name"
                                value={selectedDropdownItem.name}
                                onChange={handleDropdownItemChange}
                                className="bg-white border-green-200 text-green-800 focus:border-green-500 text-sm"
                              />
                            </div>

                            <div className="space-y-2 mt-2">
                              <Label
                                htmlFor="dropdown_href"
                                className="text-sm"
                              >
                                URL / Link
                              </Label>
                              <Input
                                id="dropdown_href"
                                name="href"
                                value={selectedDropdownItem.href}
                                onChange={handleDropdownItemChange}
                                className="bg-white border-green-200 text-green-800 focus:border-green-500 text-sm"
                              />
                            </div>

                            <div className="flex items-center space-x-2 mt-2">
                              <Checkbox
                                id="dropdown_is_active"
                                name="is_active"
                                checked={selectedDropdownItem.is_active}
                                onCheckedChange={(checked) => {
                                  setSelectedDropdownItem({
                                    ...selectedDropdownItem,
                                    is_active: !!checked,
                                  });
                                }}
                              />
                              <Label
                                htmlFor="dropdown_is_active"
                                className="text-sm"
                              >
                                Active
                              </Label>
                            </div>

                            <Button
                              onClick={handleSaveDropdownItem}
                              className="bg-green-600 hover:bg-green-700 text-white w-full mt-3 text-sm py-1"
                              disabled={saving}
                            >
                              {saving ? (
                                <>
                                  <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                                  Saving...
                                </>
                              ) : (
                                <>
                                  <Save className="mr-1 h-3 w-3" />
                                  Save
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-green-700">
                  Select a menu item to edit or add a new item
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="footer" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-green-800">
              Footer Menu Items
            </h3>
            <Button
              onClick={handleAddItem}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={saving}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Navigation Items List */}
            <div className="border rounded-md p-4">
              <h4 className="font-medium text-green-800 mb-3">Menu Items</h4>
              <ul className="space-y-2">
                {footerNavItems.map((item) => (
                  <li
                    key={item.id}
                    className={`p-2 rounded cursor-pointer ${selectedItem?.id === item.id ? "bg-green-100" : "hover:bg-green-50"}`}
                    onClick={() => handleSelectItem(item)}
                  >
                    <span className={!item.is_active ? "text-gray-400" : ""}>
                      {item.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Item Editor */}
            <div className="border rounded-md p-4 md:col-span-2">
              {selectedItem ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-green-800">Edit Item</h4>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveItem("up")}
                        disabled={
                          saving || footerNavItems.indexOf(selectedItem) === 0
                        }
                      >
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMoveItem("down")}
                        disabled={
                          saving ||
                          footerNavItems.indexOf(selectedItem) ===
                            footerNavItems.length - 1
                        }
                      >
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDeleteItem}
                        disabled={saving}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={selectedItem.name}
                      onChange={handleItemChange}
                      className="bg-white border-green-200 text-green-800 focus:border-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="href">URL / Link</Label>
                    <Input
                      id="href"
                      name="href"
                      value={selectedItem.href}
                      onChange={handleItemChange}
                      className="bg-white border-green-200 text-green-800 focus:border-green-500"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="is_active"
                      name="is_active"
                      checked={selectedItem.is_active}
                      onCheckedChange={(checked) => {
                        setSelectedItem({
                          ...selectedItem,
                          is_active: !!checked,
                        });
                      }}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>

                  <Button
                    onClick={handleSaveItem}
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8 text-green-700">
                  Select a menu item to edit or add a new item
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default NavigationEditor;
