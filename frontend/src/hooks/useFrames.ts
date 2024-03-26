import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useRedirectTop = () => {
  const router = useRouter()

  useEffect(() => {
    router.push('/')
  }, [])
}
