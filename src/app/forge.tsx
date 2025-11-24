"use client";

import { useState, useEffect } from "react";
import { checkSecurity, createPerfectPassword } from "./Generator";
import { Copy, Tag } from "lucide-react";

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

  useEffect(() => {
    setSecurityLevel(checkSecurity(createdPassword));
  }, [createdPassword]);

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
    setFilter({ small: true, capital: true, numbers: true, symbols: true });
    setPassword([]);
    setCreatedPassword(createPerfectPassword().split(""));
  };

  useEffect(() => {
    const sec = checkSecurity(password);
    console.log(sec);
    setSecurityLevel(sec);
  }, [password]);

  useEffect(() => {
    setCreatedPassword(createPerfectPassword().split(""));
  }, []);

  const skipAnimation = () => {
    setPassword(createdPassword);
  };

  useEffect(() => {
    const pass = createdPassword;
    console.log(createdPassword);

    if (animations) {
      pass.forEach((targetChar, i) => {
        setTimeout(() => {
          let j = 0;
          const interval = setInterval(() => {
            setPassword((prev) => {
              const next = [...prev];

              if (next.length < pass.length) {
                next.length = pass.length;
              }

              if (j >= 6) {
                next[i] = targetChar;

                clearInterval(interval);
              } else {
                const rand = Math.floor(Math.random() * charPool.length);
                j++;
                next[i] = charPool[rand];
              }

              return next;
            });
          }, 200);
        }, i * 500);
      });
    } else {
      setPassword(pass);
    }
  }, [createdPassword]);

  return (
    <>
      <div className="mt-60 flex items-center justify-center">
        <div className="flex flex-col w-200 gap-4 h-50 z-10 items-center justify-center group ">
          <div className="flex flex-row gap-6">
            <p className="font-bold text-black border p-1 rounded-lg px-2 dark:border-Xborder-dark  dark:text-white">Animations</p>
            <p className="font-bold text-black border p-1 rounded-lg px-2 dark:border-Xborder-dark  dark:text-white">
              Skip Animations
            </p>
            <p className="font-bold border p-1 rounded-lg px-2 dark:border-Xborder-dark text-black  dark:text-white">Duration</p>
          </div>
          <div
            style={{
              width: Math.max(password.length * 2, 500), // 8px pro Zeichen
              transition: "width 300ms ease",
            }}
            className="mx-auto relative w-50 h-30 items-center justify-center flex"
          >
            <svg
              className="absolute inset-0 w-full h-full z-0"
              viewBox="0 0 420 80"
              preserveAspectRatio="none"
            >
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                rx="12"
                ry="12"
                fill="none"
                stroke="#2A2A2A"
                strokeWidth="1"
                style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
              />
            </svg>
            <div className="flex flex-row">
              {password.map((char, idx) => (
                <p
                  key={idx + "-" + char}
                  className={`slot-char-base z-20  ${
                    char === createdPassword[idx] ? "shuffle" : "final"
                  } hover font-bold text-black  dark:text-white text-5xl`}
                >
                  {char}
                </p>
              ))}
            </div>
          </div>

          <Copy className="mb-5 ml-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </>
  );
}
