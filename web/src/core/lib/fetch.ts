type Methods = "POST" | "GET" | "PUT";

interface APIResponse<T = null> {
  message: string;
  status: number;
  data: T;
}

const BASE_URL =
  process.env.FRONT_END_URL || process.env.NEXT_PUBLIC_FRONT_END_URL;

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
    headers: options?.headers || {},
  };

  if (options?.body) {
    (OPTIONS as unknown as { body: string }).body = JSON.stringify(
      options.body,
    );
  }

  let reqUrl = `${BASE_URL}/${pathname}`;

  if (options?.queries) {
    reqUrl += `?${new URLSearchParams(options.queries).toString()}`;
  }

  return fetch(reqUrl, OPTIONS).then((res) => res.json());
}
