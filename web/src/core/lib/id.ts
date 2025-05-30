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
  return customAlphabet(
    uppercaseAlphabet + lowerCaseAlphabet + "0123456789",
    size,
  );
}

export function newShortId(): string {
  return customNanoid(6)();
}
