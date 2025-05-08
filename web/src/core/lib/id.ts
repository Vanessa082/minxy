import { customAlphabet, nanoid } from "nanoid";

const prefixes = {
  user: "user",
  url: "url",
};

export function newPrefixedId(prefix: keyof typeof prefixes): string {
  return `${prefixes[prefix]}_${nanoid()}`;
}

const shortIdGenerator = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", 6)

export const shortId = shortIdGenerator()