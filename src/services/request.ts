const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface FetchOptions extends RequestInit {
  method?: Method
  body?: any
  headers?: HeadersInit
}

async function request<T = unknown>(requestUrl: string, options: FetchOptions = {}): Promise<T> {
  const config: RequestInit = {
    ...options,
    method: options.method || 'GET',
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  // Stringify body for non-GET requests
  if (config.body && typeof config.body !== 'string') {
    config.body = JSON.stringify(config.body)
  }

  const response = await fetch(requestUrl, config)

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`HTTP ${response.status}: ${errorText}`)
  }

  return response.json() as Promise<T>
}

export default request
