import useSWR from "swr";
import axios from "axios";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

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

export const FoodByCategory = () => {
  const {
    data: categories = [],
    error,
    isLoading,
  } = useSWR(`${process.env.BASE_URL}/food/all`, fetcher);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;

  return (
    <div className="flex flex-col px-[48px] py-8 gap-8 bg-gray-700">
      <div className="flex flex-col gap-9">
        <h1 className="text-[30px] font-semibold text-white">Categories</h1>
        <div className="flex gap-2 ">
          {categories.map((name: CategoryWithFoods) => (
            <div className="flex gap-5" key={name._id}>
              <Button className="rounded-full flex p-5 bg-white text-black">
                {name.categoryName}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div>
        {categories.map((cat: CategoryWithFoods) => (
          <div key={cat._id} className="flex flex-col gap-[54px]">
            <h1 className="text-[30px] font-semibold text-white">
              {cat.categoryName}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ">
              {cat.categoryFoods.map((food) => (
                <div
                  key={food._id}
                  className="bg-white rounded-[20px] shadow p-4 flex flex-col items-center w-[400px] relative"
                >
                  <img
                    src={food.image}
                    alt={food.foodName}
                    className="mb-2 rounded w-full h-[210px]"
                  />
                  <Button className="absolute top-[162px] right-[36px] rounded-full size-[44px] bg-white">
                    <Plus className="text-black" />
                  </Button>
                  <div className="font-semibold flex justify-between w-full items-center">
                    <div className="text-[24px] text-red-500">
                      {food.foodName}
                    </div>
                    <div className="text-[18px] font-semibold">
                      {food.price}₮
                    </div>
                  </div>
                  <div className="text-gray-600">{food.ingredients}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
