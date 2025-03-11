import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  FileUp,
  Download,
  Trash2,
  Calendar,
  File,
  Plus,
  ExternalLink,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "../ui/dialog";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { useSupabaseRealtime } from "../../hooks/useSupabaseRealtime";

const Catalogs = () => {
  const { data: catalogs, loading } = useSupabaseRealtime("catalogs");
  const [newCatalog, setNewCatalog] = useState({
    name: "",
    description: "",
    isPublic: true,
  });

  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        type: file.name.split(".").pop().toUpperCase(),
      });
    }
  };

  const handleAddCatalog = async () => {
    if (!uploadedFile) return;

    try {
      const today = new Date();
      const formattedDate = today.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      const { error } = await supabase.from("catalogs").insert([
        {
          name: newCatalog.name,
          description: newCatalog.description,
          file_size: uploadedFile.size,
          file_type: uploadedFile.type,
          download_url: "#", // In a real app, you would upload the file and get a URL
          is_public: newCatalog.isPublic,
          upload_date: today.toISOString(),
        },
      ]);

      if (error) throw error;

      setNewCatalog({
        name: "",
        description: "",
        isPublic: true,
      });
      setUploadedFile(null);
    } catch (error) {
      console.error("Error adding catalog:", error);
      alert("Error adding catalog. Please try again.");
    }
  };

  const handleDeleteCatalog = async (id) => {
    try {
      const { error } = await supabase.from("catalogs").delete().eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting catalog:", error);
      alert("Error deleting catalog. Please try again.");
    }
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case "PDF":
        return <File className="h-6 w-6 text-red-500" />;
      case "XLSX":
        return <File className="h-6 w-6 text-green-500" />;
      case "DOCX":
        return <File className="h-6 w-6 text-blue-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading catalogs...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-green-800">
          Catalogs Management
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" /> Upload New Catalog
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Upload New Catalog</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Catalog Name
                </Label>
                <Input
                  id="name"
                  value={newCatalog.name}
                  onChange={(e) =>
                    setNewCatalog({ ...newCatalog, name: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="e.g., Product Catalog 2024"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Input
                  id="description"
                  value={newCatalog.description}
                  onChange={(e) =>
                    setNewCatalog({
                      ...newCatalog,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                  placeholder="Brief description of the catalog"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Visibility</Label>
                <div className="col-span-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isPublic"
                      checked={newCatalog.isPublic}
                      onChange={(e) =>
                        setNewCatalog({
                          ...newCatalog,
                          isPublic: e.target.checked,
                        })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    <Label htmlFor="isPublic" className="text-sm font-normal">
                      Make this catalog publicly available for download
                    </Label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right">File</Label>
                <div className="col-span-3">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {uploadedFile ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-center">
                          {getFileIcon(uploadedFile.type)}
                        </div>
                        <p className="font-medium">{uploadedFile.name}</p>
                        <p className="text-sm text-gray-500">
                          {uploadedFile.size} • {uploadedFile.type}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <FileUp className="h-8 w-8 mx-auto text-gray-400" />
                        <p className="text-sm text-gray-500">
                          Drag and drop or click to upload
                        </p>
                        <p className="text-xs text-gray-400">
                          Supported formats: PDF, DOCX, XLSX (Max: 10MB)
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.docx,.xlsx"
                      className="hidden"
                      id="catalog-upload"
                      onChange={handleFileUpload}
                    />
                    <label htmlFor="catalog-upload">
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() =>
                          document.getElementById("catalog-upload").click()
                        }
                      >
                        Select File
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  type="button"
                  onClick={handleAddCatalog}
                  disabled={!uploadedFile || !newCatalog.name}
                >
                  Upload Catalog
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-6 border-green-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Catalog
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Description
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Size
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Uploaded
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Visibility
                </th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {catalogs.map((catalog, index) => (
                <motion.tr
                  key={catalog.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {getFileIcon(catalog.file_type)}
                      <span className="ml-2 font-medium text-gray-800">
                        {catalog.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {catalog.description}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="text-gray-600">{catalog.file_size}</span>
                      <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {catalog.file_type}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(catalog.upload_date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${catalog.is_public ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}
                    >
                      {catalog.is_public ? "Public" : "Private"}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-2 text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={() =>
                          window.open(catalog.download_url, "_blank")
                        }
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-2 text-amber-600 border-amber-200 hover:bg-amber-50"
                        onClick={() =>
                          window.open(catalog.download_url, "_blank")
                        }
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-2 text-red-600 border-red-200 hover:bg-red-50"
                        onClick={() => handleDeleteCatalog(catalog.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6">
        <Card className="p-4 border-green-200 bg-green-50">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-3">
              <FileUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-green-800">
                Catalog Management Tips
              </h3>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>
                  • Public catalogs are available for download on the website
                </li>
                <li>• Private catalogs are only accessible via direct link</li>
                <li>• Keep file sizes under 10MB for optimal performance</li>
                <li>• Use descriptive names for better organization</li>
                <li>
                  • Update catalogs regularly to ensure information is current
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Catalogs;
