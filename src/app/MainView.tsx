"use client";

import { useState, useEffect } from "react";
import { checkSecurity, createPerfectPassword } from "./Generator";

import Header from "./header";
import Forge from "./forge"


export default function MainView() {
  

  return (
    <div className="w-full flex flex-col items-center">
      <Header />

      <section id="forge">
        <div className="">
          <Forge />
        </div>
      </section>

      <section id="archive">
        <div className="bg-green-400 h-400"></div>
      </section>

      <section id="token">

      </section>
      <section id="origin">
        <div className="bg-red-400 h-400 w-full "></div>
      </section>
    </div>
  );
}

function SecuretityScoreView({ score }: { score: number }) {
  const [message, setMessgae] = useState("Weak");

  useEffect(() => {
    if (score < 30) setMessgae("Weak");
    else if (score < 60) setMessgae("Moderate");
    else if (score < 80) setMessgae("Strong");
    else setMessgae("Very Strong");
  }, [score]);

  return (
    <>
      <div>
        <p>{message}</p>
        <p>Security Score: {score}</p>
        <div className=" md:w-96 w-60 h-5 bg-gray-300 rounded-2xl relative">
          <span
            className={`absolute   h-5 w-[80%] rounded-2xl transition-transform duration-300 ${
              score < 30 ? "bg-red-500" : "translate-x-0"
            }`}
          />
        </div>
      </div>
    </>
  );
}
