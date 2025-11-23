"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ThemeToggle from "./themeToggle";

export default function Header() {

  const router = useRouter();

  const goTo = (id: string) => {
    router.push(`/#${id}`);
  };

  return (
    <>
      <div className="fixed flex w-full  backdrop-blur-md items-center justify-between pt-4 pb-4 flex-row">
        <p onClick={() => goTo("")} className="dark:text-white text-3xl font-bold pl-5">Secura</p>
        <div className="w-full flex justify-center  flex-row gap-[5%]">
          <p onClick={() => goTo("forge")} className="dark:text-white font-bold text-3xl">Forge</p>
          <p onClick={() => goTo("token")} className="dark:text-white font-bold text-3xl">Token</p>
          <p onClick={() => goTo("archive")} className="dark:text-white font-bold text-3xl">Archive</p>
          <p onClick={() => goTo("origin")} className="dark:text-white font-bold text-3xl">Origin</p>
        </div>
        <div className="mr-5">
        <ThemeToggle />
        </div>
      </div>
    </>
  );
}
