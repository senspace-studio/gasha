import axios from 'axios'

export const gashaAPI = (
  input: string | URL | globalThis.Request,
  init?: RequestInit
) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${input}`, init)
}

export const gashaAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})
