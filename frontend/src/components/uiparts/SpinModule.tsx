import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import { HStack, Icon, Input, Spinner, VStack } from '@chakra-ui/react'
import { FC, useCallback, useState } from 'react'
import { SpinButton } from './SpinButton'
import { useSpinGasha } from '@/hooks/useGasha'

export const SpinModule: FC = () => {
  const [quantity, setQuantity] = useState(1)

  const { spinGasha, isPending } = useSpinGasha()

  const handleSpin = useCallback(async () => {
    await spinGasha(quantity)
  }, [spinGasha])

  return (
    <VStack gap={5}>
      <HStack justifyContent="center" gap={5}>
        <Icon
          as={MinusIcon}
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        />
        <Input
          type="number"
          width="80px"
          variant="transparent"
          backgroundColor="transparent"
          borderBottom="2px black solid"
          borderRadius="none"
          textAlign="center"
          fontSize="2xl"
          fontWeight="bold"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <Icon as={AddIcon} onClick={() => setQuantity(quantity + 1)} />
      </HStack>
      <SpinButton onClick={handleSpin} width="160px">
        {isPending ? <Spinner color="yellow.400" /> : 'SPIN'}
      </SpinButton>
    </VStack>
  )
}
