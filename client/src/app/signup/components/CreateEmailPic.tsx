import Image from "next/image";

export const CreateEmailPic = () => {
  return (
    <div className="w-full h-screen flex p-[20px]">
      <div className="relative w-full h-full ">
        <Image
          src="/LoginPic.png"
          alt="LoginPic"
          fill
          className="object-cover rounded-2xl"
        />
      </div>
    </div>
  );
};
