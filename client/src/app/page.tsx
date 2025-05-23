import React from "react";
import Image from "next/image";
import { Foods } from "@/components/Foods";
const page = () => {
  return (
    <div className="min-h-screen">
      <div className="w-full h-[700px] relative">
        <Image src="/Main.png" alt="Main" layout="fill" />
      </div>
      <Foods />
    </div>
  );
};

export default page;
