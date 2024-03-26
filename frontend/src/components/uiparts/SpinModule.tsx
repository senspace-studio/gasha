import { AddIcon, MinusIcon } from '@chakra-ui/icons'
import {
  Flex,
  HStack,
  Icon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { SpinButton } from './SpinButton'

export const SpinModule: FC = () => {
  const [quantity, setQuantity] = useState(1)

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
        <SpinButton opacity={0.45} disabled={true} minW="150px">
          SPIN!
        </SpinButton>
      </VStack>
    </>
  )
}
