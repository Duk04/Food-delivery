"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type FoodCategory = {
  _id: string;
  categoryName: string;
};

type FoodMenu = {
  _id: string | null;
  categoryName: FoodCategory[];
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string[];
};

type AllFoods = {
  getAllFood: FoodMenu[];
};

export const Foods = () => {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [foods, setFoods] = useState<FoodMenu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [catRes, foodRes] = await Promise.all([
        axios.get<FoodCategory[]>(`${process.env.BASE_URL}/food-category`),
        axios.get<AllFoods>(`${process.env.BASE_URL}/food-category/categoryId`),
      ]);
      setCategories(catRes.data);
      setFoods(foodRes.data.getAllFood);
    };
    fetchData();
  }, []);

  return (
    <div>
      {categories.map((category) => (
        <div key={category._id}>
          <h2>{category.categoryName}</h2>
          <ul>
            {foods
              .filter((food) => (food.category ?? []).includes(category._id))
              .map((food) => (
                <li
                  key={food._id}
                  className="border rounded-lg p-4 shadow-sm bg-white"
                >
                  <img
                    src={food.image}
                    alt={food.foodName}
                    className="w-full h-32 object-cover mb-2 rounded"
                  />
                  <h3 className="text-lg font-semibold">{food.foodName}</h3>
                  <p className="text-sm text-gray-600">{food.ingredients}</p>
                  <p className="text-black font-medium">${food.price}</p>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
