"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { url } from "inspector";
import { Image as ImageIcon } from "lucide-react";
import { useState, useEffect, ChangeEvent } from "react";
import Image from "next/image";
type FoodFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  categoryId: string;
  // handleDelete: (data: any) => void;
};

export const FoodFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categoryId,
}: // handleDelete,
FoodFormProps) => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    foodName: "",
    price: "",
    ingredients: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({
        foodName: "",
        price: "",
        ingredients: "",
        image: "",
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("upload_preset", "Food-Delivery");
    formData.append("file", file);

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dsbm0kn7t/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.url) {
        setForm((prev) => ({ ...prev, image: data.url }));
      } else {
        alert("Failed to upload image.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = () => {
    const formatted = {
      ...form,
      price: parseFloat(form.price),
      categoryId,
    };
    onSubmit(formatted);
  };

  const handleDelete = async () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to delete a food item.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food item?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/food/${initialData._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Food item deleted successfully!");
      onClose();
    } catch (error) {
      console.error("Error deleting food item:", error);
      alert("Failed to delete food item.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[500px] max-w-full p-6 relative">
        <button
          className="absolute top-4 right-4 hover:bg-gray-100 hover:rounded-full"
          onClick={onClose}
        >
          <XMarkIcon className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold mb-4">Dishes Info</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Dish Name</label>
            <input
              name="foodName"
              value={form.foodName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Ingredients</label>
            <textarea
              name="ingredients"
              value={form.ingredients}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Upload Image</label>
            <div
              className="flex flex-col w-full border rounded mt-1 h-[160px] items-center justify-center cursor-pointer bg-[rgba(37,99,235,0.05)] relative"
              onClick={() =>
                document.getElementById("food-image-input")?.click()
              }
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  document.getElementById("food-image-input")?.click();
                }
              }}
              role="button"
              aria-label="Upload Image"
            >
              <Input
                id="food-image-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                placeholder="Upload Image"
              />
              <div className="flex items-center justify-center w-4 h-4 bg-white rounded-full mb-2">
                <ImageIcon />
              </div>
              <span className="text-gray-500">
                Choose a file or drag & drop it here
              </span>
              {form.image && (
                <div className="">
                  <img
                    src={form.image}
                    alt="Preview"
                    className="absolute w-full h-full top-0 left-0 bg-no-repeat object-fill rounded"
                  />
                  <div className="absolute top-2 right-2 z-10">
                    <button
                      type="button"
                      className="bg-white rounded-full p-1 shadow"
                      onClick={(e) => {
                        e.stopPropagation();
                        setForm((prev) => ({ ...prev, image: "" }));
                      }}
                      aria-label="Remove image"
                    >
                      <XMarkIcon className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            {uploading && (
              <p className="text-sm text-blue-500 mt-1">Uploading...</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          {initialData && (
            <Button
              className="text-red-500 flex items-center gap-1 text-sm bg-transparent border hover:bg-gray-300"
              onClick={handleDelete}
            >
              <TrashIcon className="w-4 h-4" />
              Delete
            </Button>
          )}
          <Button
            onClick={handleSave}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            {initialData ? "Update Dish" : "Add Dish"}
          </Button>
        </div>
      </div>
    </div>
  );
};
