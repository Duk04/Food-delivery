"use client";

import { Button } from "@/components/ui/button";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { ClockFading, CookingPot } from "lucide-react";
import { useState, useEffect } from "react";

type FoodFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: any;
  categoryId: string;
};
type FoodId = {
  _id: string;
};
export const FoodFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  categoryId,
}: FoodFormProps) => {
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

  const handleSave = () => {
    const formatted = {
      ...form,
      price: parseFloat(form.price),
      categoryId,
    };
    onSubmit(formatted);
  };
  const handleDelete = async (data: FoodId) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (initialData) {
      await axios.delete(
        `http://localhost:8000/food/${initialData._id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[500px] max-w-full p-6 relative">
        <button className="absolute top-4 right-4" onClick={onClose}>
          <XMarkIcon className="w-5 h-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-semibold mb-4">Dishes info</h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Dish name</label>
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
            <label className="text-sm font-medium">Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />

            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="rounded-md mt-2 h-32 object-cover"
              />
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center">
          {initialData && (
            <Button
              className="text-red-500 flex items-center gap-1 text-sm bg-transparent border hover:bg-gray-300"
              onClick={() => handleDelete}
            >
              <TrashIcon className="w-4 h-4" />
            </Button>
          )}
          <button
            onClick={handleSave}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};
