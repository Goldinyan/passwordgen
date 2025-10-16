"use client";

import { useState, useEffect } from "react";
import { checkSecurity, createPerfectPassword } from "./Generator";

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
      <div className="mb-10 flex flex-col m-[5%] items-center">
        <p className="text-4xl md:text-6xl font-FigtreeBold ">Password Generator</p>
        <p className="text-xl md:text-2xl font-Figtree m-2 text-center">Generate secure passwords with ease</p>
      </div>
      <div className="backdrop-blur-sm h-250 w-200 rounded-2xl bg-white/30 p-5">
      <p className="bg-gray-800 h-20 border flex items-center border-black p-5 m-5 text-2xl font-FigtreeBold rounded-2xl">
          {password}
        </p>
      <SecuretityScoreView score={securityLevel} />
        
      
        <div className="flex flex-row items-center justify-center">
        
        <div className="flex flex-row items-center justify-center flex-wrap gap-4">
  {filterOptions.map(({ key, label, hint }) => (
    
    <div
      key={key}
      
      className={`cursor-pointer flex flex-row p-3 rounded-xl border border-black backdrop-blur-sm transition-all ${
        filter[key] ? "bg-blue-200 text-black border-blue-400" : "bg-gray-300 text-gray-600 border-gray-700"
      }`}
    >
      <div className="flex items-center">
      
      <button
      onClick={() =>
        setFilter((prev) => ({ ...prev, [key]: !prev[key] }))
      }
      className={`relative w-12 h-6 mr-5 rounded-full transition-colors duration-300  ${
        filter[key] ? "bg-blue-500" : "bg-gray-400"
      }`}
    >
      
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
          filter[key] ? "translate-x-6" : "translate-x-0"
        }`}
      />
      
    </button>
    </div>
    <div className="flex flex-col">
      <p className="font-bold">{label}</p>
      <p className="text-xs">{hint}</p>
      </div>
    </div>
  ))}
</div>

        </div>
        
        <button onClick={generatePassword}>Generate</button>
        <p>{securityLevel}</p>
        <div className="bg-gray-800 m-5 p-5">
          <p
            onClick={() => {
              getPerfectPassword();
            }}
          >
            getPerfectPassword
          </p>
          <p>{perfectPassword}</p>
          <p>{perfectPasswordSecurity}</p>
        </div>
      </div>
    </div>
  );
}

function Descriptions() {
  return <div></div>;
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