"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

type FoodCategory = {
  _id: string;
  categoryName: string;
};

export const Turshilt = () => {
  const [data, setData] = useState<FoodCategory[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<FoodCategory[]>("http://localhost:8000/food-category")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <footer className="bg-[#0f0f0f] text-white py-10 px-8">
      <div className="grid grid-cols-3 gap-12">
        <div>
          <h3 className="font-bold text-base mb-4">MENU</h3>
          <ul className="space-y-2 text-base leading-6">
            {data?.map((cat) => (
              <li key={cat._id} className="cursor-pointer hover:underline">
                {cat.categoryName}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-base mb-4">FOLLOW US</h3>
          <div className="flex space-x-4"></div>
        </div>
      </div>
    </footer>
  );
};
