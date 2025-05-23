"use client";
import { useEffect, useState } from "react";
import axios from "axios";

type FoodCategory = {
  _id: string;
  categoryName: string;
};

type FoodMenu = {
  _id: string;
  categoryName: FoodCategory[];
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
};

export const Foods = () => {
  const [categories, setCategories] = useState<FoodCategory[]>([]);
  const [foods, setFoods] = useState<FoodMenu[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [catRes, foodRes] = await Promise.all([
        axios.get<FoodCategory[]>("http://localhost:8000/food-category"),
        axios.get<FoodMenu[]>("http://localhost:8000/food"),
      ]);
      setCategories(catRes.data);
      setFoods(foodRes.data);
    };
    fetchData();
  }, []);

  console.log(foods);
  console.log(categories);
  return (
    <div>
      {categories.map((category) => (
        <div key={category._id}>
          <h2>{category.categoryName}</h2>
          <ul>
            {Array.isArray(foods) &&
              foods
                .filter((food) =>
                  food.categoryName.some(
                    (cat) => cat._id === category.categoryName
                  )
                )
                .map((food) => (
                  <li key={food._id}>
                    <img src={`food.image`} alt="" />
                  </li>
                ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
