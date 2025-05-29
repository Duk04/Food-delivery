"use client";

import axios from "axios";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Cagliostro } from "next/font/google";
import useSWRMutation from "swr/mutation";
import { mutate } from "swr";
import { boolean } from "yup";

type FoodCategory = {
  _id: string;
  categoryName: string;
};

type AllFoodCategories = {
  categories: FoodCategory[];
};

export const CategoriesForAdmin = () => {
  const [categoryName, setCategoryName] = useState("");
  const [isOpen, setISOpen] = useState(false);
  const fetcher = (url: string) =>
    axios.get<AllFoodCategories>(url).then((res) => res.data);

  const {
    data: swrData,
    error: swrError,
    isLoading,
  } = useSWR<AllFoodCategories>("http://localhost:8000/food-category", fetcher);

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return;
    try {
      const token =
        typeof window !== "undefined" && localStorage.getItem("token");
      setISOpen(true);
      console.log({ token });
      await axios.post(
        "http://localhost:8000/food-category",
        { categoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Category added successfully!");
      setCategoryName("");
      setISOpen(false);
    } catch (err) {
      console.error("Failed to add category:", swrError);
    }
  };
  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 p-6 bg-[#FFFFFF] border rounded-xl min-w-full">
        <h4 className="font-semibold text-[20px]">Dishes category</h4>
        <div className="flex gap-4 flex-wrap">
          <Button className="border rounded-full bg-white text-black border-[#E4E4E7] cursor-pointer">
            All Dishes
          </Button>
          {Array.isArray(swrData) &&
            swrData.map((category) => (
              <Button
                key={category._id}
                className="border rounded-full bg-white text-black border-[#E4E4E7] cursor-pointer"
              >
                {category.categoryName}
              </Button>
            ))}
          <Dialog open={isOpen} onOpenChange={setISOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="border rounded-full flex bg-[#EF4444] text-white"
              >
                +
              </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-10">
              <DialogHeader>
                <DialogTitle>Add new category</DialogTitle>
                <DialogDescription>
                  Enter a category name to add it to the menu.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-5">
                <Label htmlFor="name">Category name</Label>
                <Input
                  id="name"
                  placeholder="Type category name..."
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleAddCategory}>
                  Add category
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
