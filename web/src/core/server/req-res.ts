export interface APIResponse<T = null> {
  message: string;
  status: number;
  data: T;
}

interface ServerResponse<T = null> extends APIResponse<T> {
  headers?: HeadersInit;
}

/**
 * Base Response
*/
export const newApiResponse = <T = null>(res: ServerResponse<T>): Response => {
  return Response.json({
    message: res.message,
    data: res.data,
    status: res.status,
  }, {
    status: 200,
    headers: res.headers
  });
}

export const newSuccessApiResponse = <T = null>(data: Omit<ServerResponse<T>, 'status'>): Response => {
  return newApiResponse({
    message: data.message,
    data: data.data,
    headers: data.headers,
    status: 200,
  });
}

export const newBadRequestApiResponse = <T = null>(data: Omit<ServerResponse<T>, 'status'>): Response => {
  return newApiResponse({
    message: data.message,
    data: data.data,
    headers: data.headers,
    status: 400,
  });
}

export const newUnauthorizedApiResponse = <T = null>(data: Omit<ServerResponse<T>, 'status'>): Response => {
  return newApiResponse({
    message: data.message,
    data: data.data,
    status: 401,
  });
}

export const newNotFoundApiResponse = <T = null>(data: Omit<ServerResponse<T>, 'status'>): Response => {
  return newApiResponse({
    message: data.message,
    data: data.data,
    headers: data.headers,
    status: 404,
  });
}

export const newInternalServerErrorApiResponse = <T = null>(data: Omit<ServerResponse<T>, 'status'>): Response => {
  return newApiResponse({
    message: data.message,
    data: data.data,
    headers: data.headers,
    status: 500,
  });
}
