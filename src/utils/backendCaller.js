import { BACKEND_URL } from "@env";

export const backendCaller = async (route, method = "GET", headers, body) => {
  try {
    const url = `${BACKEND_URL}${route}`;

    const options = { headers, method };

    if (method !== "GET" && body) {
      if (body instanceof FormData) {
        options.body = body;
      } else {
        options.body = JSON.stringify(body);
      }
    }

    // console.log(typeof headers, headers);
    // console.log(typeof body, body);
    // console.log(url, method);
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    // console.log("response", response);

    return await response.json();
  } catch (error) {
    console.error(error);
  }
};
