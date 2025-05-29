import { CategoriesForAdmin, FoodMenuForAdmin } from "./components";

const AdminFoodMenuPage = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <CategoriesForAdmin />
      <FoodMenuForAdmin />
    </div>
  );
};

export default AdminFoodMenuPage;
