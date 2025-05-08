import { customAlphabet, nanoid } from "nanoid";

const prefixes = {
  user: "user",
  url: "url",
};

export function newPrefixedId(prefix: keyof typeof prefixes): string {
  return `${prefixes[prefix]}_${nanoid()}`;
}

export function customNanoid(size: number = 6) {
  const uppercaseAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseAlphabet = uppercaseAlphabet.toLocaleLowerCase();
  const randomNumbers = "0123456789"
  return customAlphabet(uppercaseAlphabet + lowerCaseAlphabet + randomNumbers, size)
}

export function newShortId() {
  return customNanoid(6)
}