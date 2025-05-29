"use client";
import React from "react";
import Image from "next/image";
import { FoodByCategory } from "@/components/FoodCategory";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
const page = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="w-full h-[700px] relative">
        <Image src="/Main.png" alt="Main" layout="fill" />
      </div>
      <FoodByCategory />
      <Footer />
    </div>
  );
};

export default page;
