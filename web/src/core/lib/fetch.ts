import { APIResponse } from "@/server/req-res";
import { environment } from "../env";

type Methods = "POST" | "GET" | "PUT" | "PATCH";

const BASE_URL = environment.frontEndUrl;

const buildUrl = (pathname: string, queries?: Record<string, string>) => {
  if (!BASE_URL) {
    throw new Error("BASE_URL is not defined! update Environment variables");
  }

  let url = BASE_URL;

  if (pathname.startsWith("/")) {
    url += pathname;
  } else {
    url += `/${pathname}`;
  }

  if (queries && Object.keys(queries).length) {
    url += `?${new URLSearchParams(queries).toString()}`;
  }

  return url;
};

export function Fetcher<T>(
  pathname: string,
  options?: {
    method?: Methods;
    body?: Record<string, unknown>;
    headers?: HeadersInit;
    queries?: Record<string, string>;
  },
): Promise<APIResponse<T>> {
  const OPTIONS = {
    method: options?.method || "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (options?.body) {
    (OPTIONS as unknown as { body: string }).body = JSON.stringify(
      options.body,
    );
  }

  if (options?.headers) {
    OPTIONS.headers = {
      ...OPTIONS.headers,
      ...options.headers,
    };
  }

  const reqUrl = buildUrl(pathname, options?.queries);

  return fetch(new URL(reqUrl), OPTIONS).then((res) => {
    if (res.headers.get("content-type")?.includes("json")) {
      // high chance it's {content-type: application/json} thus res.json()
      return res.json();
    }

    return res.text();
  });
}
