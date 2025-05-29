"use client";

import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import { PlusIcon, PencilIcon } from "@heroicons/react/24/solid";
import { FoodFormModal } from "./FoodFormalModel";

type Food = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

type CategoryWithFoods = {
  _id: string;
  categoryName: string;
  categoryFoods: Food[];
};

const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data.allFilteredFoods || []);

export const FoodMenuForAdmin = () => {
  const { data: categories = [], mutate } = useSWR<CategoryWithFoods[]>(
    "http://localhost:8000/food/all",
    fetcher
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Food | null>(null);
  const [categoryId, setCategoryId] = useState("");

  const handleOpenModal = (food: Food | null, categoryId: string) => {
    setEditData(food);
    setCategoryId(categoryId);
    setModalOpen(true);
  };

  const handleSubmit = async (data: CategoryWithFoods) => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    if (editData) {
      await axios.patch(
        `http://localhost:8000/food/${editData._id}`,
        { ...data, categoryName: categoryId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.post(
        "http://localhost:8000/food/food-menu",
        { ...data, categoryName: categoryId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    }
    setModalOpen(false);
    setEditData(null);
    mutate();
  };

  return (
    <div className="w-full flex flex-col gap-8 px-6 py-4">
      {categories.map((category) => (
        <div
          key={category._id}
          className="flex flex-col w-full border rounded-2xl border-[#E4E4E7] p-6 bg-white"
        >
          <h2 className="text-xl font-semibold mb-4">
            {category.categoryName} ({category.categoryFoods.length})
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            <div
              onClick={() => handleOpenModal(null, category._id)}
              className="flex flex-col items-center justify-center border-2 border-dashed border-[#EF4444] rounded-xl p-4 h-70 text-center cursor-pointer hover:bg-red-50 transition"
            >
              <PlusIcon className="h-8 w-8 text-[#EF4444]" />
              <p className="text-sm text-gray-500 mt-2">
                Add new Dish to <br />
                <span className="font-semibold text-black">
                  {category.categoryName}
                </span>
              </p>
            </div>

            {category.categoryFoods.map((food) => (
              <div
                key={food._id}
                className="bg-white rounded-xl border border-gray-200 shadow hover:shadow-md transition overflow-hidden p-4"
              >
                <div className="relative">
                  <img
                    src={food.image}
                    alt={food.foodName}
                    className="w-full h-[129px] rounded-[12px] object-cover"
                  />
                  <button
                    className="absolute bottom-2 right-2 p-1 bg-white rounded-full border hover:bg-gray-100 transition"
                    onClick={() => handleOpenModal(food, category._id)}
                  >
                    <PencilIcon className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-red-500 truncate">
                      {food.foodName}
                    </h3>
                    <p className="text-sm font-bold mt-2">${food.price}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {food.ingredients}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <FoodFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editData || undefined}
        categoryId={categoryId}
      />
    </div>
  );
};
