"use client";

import { useState, useEffect } from "react";
import { checkSecurity, createPerfectPassword } from "./Generator";
import ThemeToggle from "./themeToggle";

type Filter = {
  small: boolean;
  capital: boolean;
  numbers: boolean;
  symbols: boolean;
};

export default function MainView() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [securityLevel, setSecurityLevel] = useState(0);
  const [perfectPassword, setPerfectPassword] = useState("");
  const [perfectPasswordSecurity, setPerfectPasswordSecurtiy] = useState(0);
  const [filter, setFilter] = useState<Filter>({
    small: true,
    capital: true,
    numbers: true,
    symbols: true,
  });

  const smallLetters = "abcdefghijklmnopqrstuvwxyz".split("");
  const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const numberChars = "0123456789".split("");
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/".split("");

  const getPerfectPassword = () => {
    setPerfectPassword(createPerfectPassword());
  };

  const filterOptions = [
  { key: "small", label: "small", hint: "a–z" },
  { key: "capital", label: "capital", hint: "A–Z" },
  { key: "numbers", label: "numbers", hint: "0–9" },
  { key: "symbols", label: "symbols", hint: "!@#$..." },
] as const;


  const generatePassword = () => {
    let charPool: string[] = [];

    if (filter.small) charPool = [...charPool, ...smallLetters];
    if (filter.capital) charPool = [...charPool, ...capitalLetters];
    if (filter.numbers) charPool = [...charPool, ...numberChars];
    if (filter.symbols) charPool = [...charPool, ...symbolChars];

    if (charPool.length === 0) {
      setPassword("No character types selected");
      return;
    }

    let result = "";
    for (let i = 0; i < length; i++) {
      const rand = Math.floor(Math.random() * charPool.length);
      result += charPool[rand];
    }

    setPassword(result);
  };


  useEffect(() => {
    const sec = checkSecurity(password);
    setSecurityLevel(sec);
  }, [password]);


  useEffect(() => {
    const sec = checkSecurity(perfectPassword);
    setPerfectPasswordSecurtiy(sec);
  }, [perfectPassword]);


  return (
    
    <div className="w-100 md:w-120 lg:w-200 flex flex-col items-center">
      <ThemeToggle />
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
          score < 30  ? "bg-red-500" : "translate-x-0"
        }`}
      />
      </div>

    </div>
    </>
  )
}