import { useSpinGasha } from '@/hooks/useGasha'
import { useBalanceOf } from '@/hooks/useZoraCreatorERC1155'
import { Box, Button, Container } from '@chakra-ui/react'
import { useCallback } from 'react'

export default function Home() {
  const { spinGasha, isPending } = useSpinGasha()
  const result = useBalanceOf()

  const handleSpin = useCallback(async () => {
    await spinGasha(3)
  }, [spinGasha])

  return (
    <Container>
      <Button onClick={handleSpin}>{isPending ? 'Spinning...' : 'Spin'}</Button>
    </Container>
  )
}
