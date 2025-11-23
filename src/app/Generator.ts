const smallLetters = "abcdefghijklmnopqrstuvwxyz".split("");
const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const numberChars = "0123456789".split("");
const symbolChars = "!@#$%^&*()_+-=[]{}|;:',.<>?/".split("");

const charPool = [...smallLetters, ...capitalLetters, ...numberChars, ...symbolChars];
const charPoolLength = charPool.length;

const smallSet = new Set(smallLetters);
const capitalSet = new Set(capitalLetters);
const numberSet = new Set(numberChars);
const symbolSet = new Set(symbolChars);

type CharType = "small" | "capital" | "number" | "symbol" | "other";

function getCharType(char: string): CharType {
  if (smallSet.has(char)) return "small";
  if (capitalSet.has(char)) return "capital";
  if (numberSet.has(char)) return "number";
  if (symbolSet.has(char)) return "symbol";
  return "other";
}

function getTypePattern(c1: string, c2: string, c3: string): string {
  const t1 = getCharType(c1);
  const t2 = getCharType(c2);
  const t3 = getCharType(c3);

  const allEqual = t1 === t2 && t2 === t3;
  const allDistinct = t1 !== t2 && t2 !== t3 && t1 !== t3;

  if (allEqual) return "triple";
  if (t1 === t2) return "double-then-switch";
  if (t2 === t3) return "switch-then-double";
  if (allDistinct) return "diverse";
  return "mixed";
}

export function checkSecurity(password: string[]): number {
  let score = 0;

  for (let i = 0; i < password.length - 2; i++) {
    const pattern = getTypePattern(password[i], password[i + 1], password[i + 2]);
    switch (pattern) {
      case "triple":
        score -= 1.5;
        break;
      case "double-then-switch":
        score -= 0.75;
        break;
      case "switch-then-double":
        score -= 0.5;
        break;
      case "diverse":
        score += 1;
        break;
      case "mixed":
        score += 0.25;
        break;
    }
  }

  let hasSmall = false;
  let hasCapital = false;
  let hasNumber = false;
  let hasSymbol = false;

  for (let i = 0; i < password.length; i++) {
    switch (getCharType(password[i])) {
      case "small":
        hasSmall = true;
        break;
      case "capital":
        hasCapital = true;
        break;
      case "number":
        hasNumber = true;
        break;
      case "symbol":
        hasSymbol = true;
        break;
      default:
        break;
    }
  }

  const typesUsed =
    Number(hasSmall) + Number(hasCapital) + Number(hasNumber) + Number(hasSymbol);

  score += typesUsed * 2;

  // Length bonuses.
  if (password.length >= 12) score += 2;
  if (password.length >= 16) score += 3;

  const maxScore = 28;
  const percentage = Math.min((score / maxScore) * 100, 100);
  return Number(percentage.toFixed(2));
}

function getRandom(): string {
  const rand = Math.floor(Math.random() * charPoolLength);
  return charPool[rand];
}

export function createPerfectPassword({ length = 17 }: { length?: number } = {}): string {
  if (length <= 0) return "";

  const result: string[] = new Array(length);
  result[0] = getRandom();
  result[1] = getRandom();

  while(getCharType(result[0]) === getCharType(result[1])){
    result[1] = getRandom();
  }

  for (let i = 2; i < length; i++) {
    const doublePrev = result[i - 2];
    const prev = result[i - 1];
    let current = getRandom();

    while (!(getTypePattern(doublePrev, prev, current) === "diverse") || result.includes(current)) {
      current = getRandom();
    }
    result[i] = current;
  }

  return result.join("");
}








