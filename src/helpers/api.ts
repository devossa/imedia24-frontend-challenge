async function request(input: RequestInfo, init?: RequestInit): Promise<any> {
  const res = await fetch(input, init)

  const response = await res.json()

  return response
}

export { request }