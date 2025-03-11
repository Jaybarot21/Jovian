import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  Link as LinkIcon,
  Save,
  Plus,
  Trash2,
} from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { useSupabaseRealtime } from "../../hooks/useSupabaseRealtime";

const SocialLinks = () => {
  const { data: links, loading } = useSupabaseRealtime("social_links");
  const [newLink, setNewLink] = useState({
    platform: "facebook",
    url: "",
    is_active: true,
  });
  const [saveStatus, setSaveStatus] = useState(null);

  const platformIcons = {
    facebook: <Facebook className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
    instagram: <Instagram className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />,
    youtube: <Youtube className="h-5 w-5" />,
    website: <Globe className="h-5 w-5" />,
    other: <LinkIcon className="h-5 w-5" />,
  };

  const platformColors = {
    facebook: "text-blue-600",
    twitter: "text-blue-400",
    instagram: "text-pink-600",
    linkedin: "text-blue-700",
    youtube: "text-red-600",
    website: "text-green-600",
    other: "text-gray-600",
  };

  const handleUpdateLink = async (id, field, value) => {
    try {
      const { error } = await supabase
        .from("social_links")
        .update({
          [field]: value,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error updating link:", error);
      alert("Error updating link. Please try again.");
    }
  };

  const handleAddLink = async () => {
    if (!newLink.url) return;

    try {
      const { error } = await supabase.from("social_links").insert([
        {
          platform: newLink.platform,
          url: newLink.url,
          is_active: newLink.is_active,
        },
      ]);

      if (error) throw error;

      setNewLink({ platform: "facebook", url: "", is_active: true });
    } catch (error) {
      console.error("Error adding link:", error);
      alert("Error adding link. Please try again.");
    }
  };

  const handleDeleteLink = async (id) => {
    try {
      const { error } = await supabase
        .from("social_links")
        .delete()
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting link:", error);
      alert("Error deleting link. Please try again.");
    }
  };

  const handleSaveChanges = () => {
    setSaveStatus("saving");

    // Just for UI feedback since changes are saved immediately
    setTimeout(() => {
      setSaveStatus("saved");

      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus(null);
      }, 3000);
    }, 1000);
  };

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-800">
          Social Media Links
        </h1>
        <Button
          className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 flex items-center gap-2"
          onClick={handleSaveChanges}
          disabled={saveStatus === "saving"}
        >
          <Save className="h-4 w-4" />
          {saveStatus === "saving"
            ? "Saving..."
            : saveStatus === "saved"
              ? "Saved!"
              : "Save All Changes"}
        </Button>
      </div>

      <Card className="p-6 border-green-200 mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Current Social Links
        </h2>
        <div className="space-y-4">
          {links.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center gap-3 min-w-[140px]">
                <div className={`${platformColors[link.platform]}`}>
                  {platformIcons[link.platform]}
                </div>
                <select
                  value={link.platform}
                  onChange={(e) =>
                    handleUpdateLink(link.id, "platform", e.target.value)
                  }
                  className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                  <option value="website">Website</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex-1">
                <Input
                  value={link.url}
                  onChange={(e) =>
                    handleUpdateLink(link.id, "url", e.target.value)
                  }
                  placeholder="https://"
                  className="w-full"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`active-${link.id}`}
                    checked={link.is_active}
                    onChange={(e) =>
                      handleUpdateLink(link.id, "is_active", e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <Label
                    htmlFor={`active-${link.id}`}
                    className="ml-2 text-sm font-normal"
                  >
                    Active
                  </Label>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => handleDeleteLink(link.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <Card className="p-6 border-green-200">
        <h2 className="text-xl font-semibold text-green-700 mb-4">
          Add New Social Link
        </h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 min-w-[140px]">
            <div className={`${platformColors[newLink.platform]}`}>
              {platformIcons[newLink.platform]}
            </div>
            <select
              value={newLink.platform}
              onChange={(e) =>
                setNewLink({ ...newLink, platform: e.target.value })
              }
              className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="facebook">Facebook</option>
              <option value="twitter">Twitter</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              <option value="youtube">YouTube</option>
              <option value="website">Website</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex-1 w-full sm:w-auto">
            <Input
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              placeholder="https://"
              className="w-full"
            />
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="new-active"
                checked={newLink.is_active}
                onChange={(e) =>
                  setNewLink({ ...newLink, is_active: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <Label htmlFor="new-active" className="ml-2 text-sm font-normal">
                Active
              </Label>
            </div>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={handleAddLink}
              disabled={!newLink.url}
            >
              <Plus className="h-4 w-4 mr-2" /> Add
            </Button>
          </div>
        </div>
      </Card>

      <div className="mt-6">
        <Card className="p-4 border-green-200 bg-green-50">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
              <LinkIcon className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-800">Social Media Tips</h3>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>• Use complete URLs including https://</li>
                <li>• Inactive links will not be displayed on the website</li>
                <li>• Regularly check that all links are working correctly</li>
                <li>• Use consistent branding across all social platforms</li>
                <li>
                  • Consider adding tracking parameters to monitor traffic
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SocialLinks;
