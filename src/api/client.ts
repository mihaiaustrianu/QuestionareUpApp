import { getToken } from "../utils/HelperFunctions"

interface ClientConfig extends RequestInit {
  body?: any
}

interface Result {
  status: number
  data: any
  headers: Headers
  url: string
}

export async function client(
  endpoint: string,
  { body, ...customConfig }: ClientConfig = {},
): Promise<Result> {
  const headers: Record<string, string> = { "Content-Type": "application/json" }

  const isApiRoute = endpoint.includes("/api")
  if (isApiRoute) {
    const token = getToken()
    headers["Authorization"] = `Bearer ${token}`
  }

  const config: RequestInit = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data: any
  try {
    const response = await window.fetch(endpoint, config)
    console.log(response)

    data = await response.json()
    if (response.ok) {
      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      }
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (
  endpoint: string,
  customConfig: ClientConfig = {},
): Promise<Result> {
  return client(endpoint, { ...customConfig, method: "GET" })
}

client.post = function (
  endpoint: string,
  body: any,
  customConfig: ClientConfig = {},
): Promise<Result> {
  return client(endpoint, { ...customConfig, body })
}

client.put = function (
  endpoint: string,
  body: any,
  customConfig: ClientConfig = {},
): Promise<Result> {
  return client(endpoint, { ...customConfig, body, method: "PUT" })
}

client.delete = function (
  endpoint: string,
  customConfig: ClientConfig = {},
): Promise<Result> {
  return client(endpoint, { ...customConfig, method: "DELETE" })
}
