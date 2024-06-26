import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  Icon,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  Spinner,
  Text,
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
          <NumberInput
            min={1}
            max={999}
            justifyContent="center"
            gap={5}
            display="grid"
            gridTemplateColumns="20px 1fr 20px"
            value={quantity}
            onChange={(value) => setQuantity(Number(value))}
          >
            <NumberDecrementStepper
              border="none"
              children={<Icon as={MinusIcon} fontSize="lg" />}
            />

            <NumberInputField
              p={0}
              width="80px"
              backgroundColor="transparent"
              border="none"
              borderBottom="2px black solid"
              borderRadius="none"
              textAlign="center"
              fontSize="2xl"
              fontFamily="stolzl, sans-serif"
              fontWeight="bold"
              _focusVisible={{
                border: 'none',
                borderBottom: '2px black solid',
              }}
            />
            <NumberIncrementStepper
              border="none"
              children={<Icon as={AddIcon} fontSize="lg" />}
            />
          </NumberInput>
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
          <Box textAlign="center">
            <Spinner color="yellow.400" size="lg" borderWidth={4} />
            <br />
            <Text color="yellow.400" fontSize="md" fontWeight={500}>
              Loading...
            </Text>
          </Box>
        </Flex>
      )}
    </>
  )
}
