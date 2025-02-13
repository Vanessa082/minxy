import { nanoid } from "nanoid";

const prefixes = {
  user: "user",
  url: "url",
};

export function newPrefixedId(prefix: keyof typeof prefixes): string {
  return `${prefixes[prefix]}_${nanoid()}`;
}
