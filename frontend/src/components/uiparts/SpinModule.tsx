import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  Icon,
  Input,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { FC, useCallback, useState } from 'react'
import { SpinButton } from './SpinButton'
import { useSpinGasha } from '@/hooks/useGasha'

export const SpinModule: FC = () => {
  const [quantity, setQuantity] = useState(1)

  const { spinGasha, isPending, txHash } = useSpinGasha()

  const handleSpin = useCallback(async () => {
    if (isPending) return
    await spinGasha(quantity)
  }, [spinGasha, isPending])

  return (
    <>
      <VStack gap={5}>
        <HStack justifyContent="center" gap={5}>
          <Icon
            as={MinusIcon}
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          />
          <Input
            type="number"
            min={1}
            max={999}
            width="80px"
            variant="transparent"
            backgroundColor="transparent"
            borderBottom="2px black solid"
            borderRadius="none"
            textAlign="center"
            fontSize="2xl"
            fontFamily="stolzl, sans-serif"
            fontWeight="bold"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <Icon as={AddIcon} onClick={() => setQuantity(quantity + 1)} />
        </HStack>
        <SpinButton onClick={handleSpin} minW="150px" disabled={isPending}>
          {isPending ? <Spinner color="yellow.400" /> : 'SPIN'}
        </SpinButton>
      </VStack>
      {txHash && (
        <Flex
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          zIndex={999}
          backgroundColor="blue.400"
          color="white"
        >
          実際にはアニメーションが入る
          <Spinner color="yellow.400" size="lg" />
        </Flex>
      )}
    </>
  )
}
