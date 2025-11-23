"use client";

import { useState, useEffect } from "react";
import { checkSecurity, createPerfectPassword } from "./Generator";

type Filter = {
  small: boolean;
  capital: boolean;
  numbers: boolean;
  symbols: boolean;
};

const smallLetters = "abcdefghijklmnopqrstuvwxyz".split("");
const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numberChars = "0123456789".split("");
const symbolChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/".split("");

export default function Forge() {
  const [password, setPassword] = useState<string[]>([]);
  const [createdPassword, setCreatedPassword] = useState<string[]>([]);
  const [length, setLength] = useState(12);
  const [animations, setAnimations] = useState<boolean>(true);
  const [securityLevel, setSecurityLevel] = useState(0);
  const [filter, setFilter] = useState<Filter>({
    small: true,
    capital: true,
    numbers: true,
    symbols: true,
  });
  const [charPool, setCharPool] = useState<string[]>([
    ...smallLetters,
    ...capitalLetters,
    ...numberChars,
    ...symbolChars,
  ]);

  const filterOptions = [
    { key: "small", label: "small", hint: "a–z" },
    { key: "capital", label: "capital", hint: "A–Z" },
    { key: "numbers", label: "numbers", hint: "0–9" },
    { key: "symbols", label: "symbols", hint: "!@#$..." },
  ] as const;

  useEffect(() => {
    let charPool: string[] = [];

    if (filter.small) charPool = [...charPool, ...smallLetters];
    if (filter.capital) charPool = [...charPool, ...capitalLetters];
    if (filter.numbers) charPool = [...charPool, ...numberChars];
    if (filter.symbols) charPool = [...charPool, ...symbolChars];

    setCharPool(charPool);

  }, [filter]);


  const generatePassword = () => {
    let result = "";
    for (let i = 0; i < length; i++) {
      const rand = Math.floor(Math.random() * charPool.length);
      result += charPool[rand];
    }
    setPassword([]);
    setCreatedPassword(result.split(""));
  };

  const generatePerfectPassword = () => {
    setFilter({small: true, capital: true, numbers: true, symbols:true});
    setPassword([]);
    setCreatedPassword(createPerfectPassword().split(""));
  }

  useEffect(() => {
    const sec = checkSecurity(password);
    setSecurityLevel(sec);
  }, [password]);

  


  useEffect(() => {
    const pass = createdPassword;

    
    let i = 0;
    let j = 0;

    if (animations) {
      const interval = setInterval(() => {
        setPassword((prev) => {
          const cur = [...prev];
          if (cur.length < pass.length) cur.length = pass.length;

          cur[i] = charPool[j];
          j++;

          if (j >= charPool.length) j = 0;

          if (cur[i] === pass[i]) {
            i++;
            j = 0;
            if (i >= pass.length) {
              clearInterval(interval);
            }
          }

          return cur;
        });
      }, 50);

      return () => clearInterval(interval);
    } else {
      setPassword(pass);
    }
  }, [createdPassword]);

  return (
    <>
      <div className="mt-60 ">
        <div className="border ">
          <p
            className="dark:text-white font-bold text-black text-5xl"
            style={{ textShadow: "0 0 8px #3b82f6, 0 0 16px #3b82f6" }}
          >
            {password}
          </p>
        </div>
        <div>
            <p className="dark:text-white" onClick={() => generatePassword()}>normal</p>
            <p className="dark:text-white" onClick={() => generatePerfectPassword()}>perfect</p>
        </div>
      </div>
    </>
  );
}
