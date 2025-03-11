import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Upload, Trash2, Edit, Plus, Image, Save } from "lucide-react";
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

const MediaProducts = () => {
  const { data: products, loading: productsLoading } =
    useSupabaseRealtime("products");
  const { data: mediaLibrary, loading: mediaLoading } =
    useSupabaseRealtime("media_library");

  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    image_url: "",
    description: "",
    specifications: "",
    category: "Pulses",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedImageName, setUploadedImageName] = useState("");

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleUpdateProduct = async () => {
    try {
      const { error } = await supabase
        .from("products")
        .update({
          name: editingProduct.name,
          description: editingProduct.description,
          specifications: editingProduct.specifications,
          category: editingProduct.category,
          image_url: editingProduct.image_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", editingProduct.id);

      if (error) throw error;
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product. Please try again.");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    }
  };

  const handleAddProduct = async () => {
    try {
      const { error } = await supabase.from("products").insert([
        {
          name: newProduct.name,
          description: newProduct.description,
          specifications: newProduct.specifications,
          category: newProduct.category,
          image_url: newProduct.image_url,
        },
      ]);

      if (error) throw error;

      setNewProduct({
        name: "",
        image_url: "",
        description: "",
        specifications: "",
        category: "Pulses",
      });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product. Please try again.");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
        setUploadedImageName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddToLibrary = async () => {
    if (uploadedImage) {
      try {
        const { error } = await supabase.from("media_library").insert([
          {
            name: uploadedImageName,
            url: uploadedImage,
          },
        ]);

        if (error) throw error;

        setUploadedImage(null);
        setUploadedImageName("");
      } catch (error) {
        console.error("Error adding to media library:", error);
        alert("Error adding to media library. Please try again.");
      }
    }
  };

  const handleDeleteMedia = async (id) => {
    try {
      const { error } = await supabase
        .from("media_library")
        .delete()
        .eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Error deleting media:", error);
      alert("Error deleting media. Please try again.");
    }
  };

  const categories = [
    "All",
    "Pulses",
    "Grains",
    "Spices",
    "Oil Seeds",
    "Cotton",
  ];

  if (productsLoading || mediaLoading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-green-800 mb-6">
        Media & Products Management
      </h1>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="media">Media Library</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-green-700">
              Product Catalog
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={newProduct.name}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      Category
                    </Label>
                    <select
                      id="category"
                      value={newProduct.category}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          category: e.target.value,
                        })
                      }
                      className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {categories.slice(1).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      Image URL
                    </Label>
                    <div className="col-span-3 flex gap-2">
                      <Input
                        id="image"
                        value={newProduct.image_url}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            image_url: e.target.value,
                          })
                        }
                        className="flex-1"
                      />
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon">
                            <Image className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Select from Media Library</DialogTitle>
                          </DialogHeader>
                          <div className="grid grid-cols-3 gap-4 py-4">
                            {mediaLibrary.map((media) => (
                              <div
                                key={media.id}
                                className={`relative rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === media.url ? "border-green-500" : "border-transparent"}`}
                                onClick={() => setSelectedImage(media.url)}
                              >
                                <img
                                  src={media.url}
                                  alt={media.name}
                                  className="w-full h-24 object-cover"
                                />
                              </div>
                            ))}
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button
                                onClick={() =>
                                  setNewProduct({
                                    ...newProduct,
                                    image_url: selectedImage,
                                  })
                                }
                                disabled={!selectedImage}
                              >
                                Select Image
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={newProduct.description}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          description: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="specifications" className="text-right">
                      Specifications
                    </Label>
                    <Textarea
                      id="specifications"
                      value={newProduct.specifications}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          specifications: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button" onClick={handleAddProduct}>
                      Add Product
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative group"
              >
                <Card className="overflow-hidden border-green-200 hover:border-green-500 transition-all duration-300 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="h-8 w-8 bg-white/80 hover:bg-white"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-green-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-green-700/80 text-sm mb-2">
                      {product.description}
                    </p>
                    <p className="text-xs text-green-600 font-medium">
                      {product.specifications}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="p-6 border-green-200 md:w-1/3">
              <h3 className="font-semibold text-lg text-green-800 mb-4">
                Upload New Media
              </h3>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img
                        src={uploadedImage}
                        alt="Preview"
                        className="max-h-40 mx-auto"
                      />
                      <p className="text-sm text-gray-500">
                        {uploadedImageName}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="h-8 w-8 mx-auto text-gray-400" />
                      <p className="text-sm text-gray-500">
                        Drag and drop or click to upload
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                    onChange={handleImageUpload}
                  />
                  <label htmlFor="image-upload">
                    <Button
                      variant="outline"
                      className="mt-4 w-full"
                      onClick={() =>
                        document.getElementById("image-upload").click()
                      }
                    >
                      Select File
                    </Button>
                  </label>
                </div>
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={!uploadedImage}
                  onClick={handleAddToLibrary}
                >
                  <Save className="h-4 w-4 mr-2" /> Add to Library
                </Button>
              </div>
            </Card>

            <div className="md:w-2/3">
              <h3 className="font-semibold text-lg text-green-800 mb-4">
                Media Library
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {mediaLibrary.map((media) => (
                  <motion.div
                    key={media.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group"
                  >
                    <div className="border rounded-md overflow-hidden">
                      <img
                        src={media.url}
                        alt={media.name}
                        className="w-full h-24 object-cover"
                      />
                      <div className="p-2">
                        <p className="text-xs truncate">{media.name}</p>
                      </div>
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="icon"
                          variant="destructive"
                          className="h-8 w-8"
                          onClick={() => handleDeleteMedia(media.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Product Dialog */}
      {editingProduct && (
        <Dialog
          open={!!editingProduct}
          onOpenChange={() => setEditingProduct(null)}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  Category
                </Label>
                <select
                  id="edit-category"
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                    })
                  }
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-image" className="text-right">
                  Image URL
                </Label>
                <div className="col-span-3 flex gap-2">
                  <Input
                    id="edit-image"
                    value={editingProduct.image_url}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        image_url: e.target.value,
                      })
                    }
                    className="flex-1"
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Image className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Select from Media Library</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-3 gap-4 py-4">
                        {mediaLibrary.map((media) => (
                          <div
                            key={media.id}
                            className={`relative rounded-md overflow-hidden cursor-pointer border-2 ${selectedImage === media.url ? "border-green-500" : "border-transparent"}`}
                            onClick={() => setSelectedImage(media.url)}
                          >
                            <img
                              src={media.url}
                              alt={media.name}
                              className="w-full h-24 object-cover"
                            />
                          </div>
                        ))}
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            onClick={() =>
                              setEditingProduct({
                                ...editingProduct,
                                image_url: selectedImage,
                              })
                            }
                            disabled={!selectedImage}
                          >
                            Select Image
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="edit-description"
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-specifications" className="text-right">
                  Specifications
                </Label>
                <Textarea
                  id="edit-specifications"
                  value={editingProduct.specifications}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      specifications: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingProduct(null)}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleUpdateProduct}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default MediaProducts;
