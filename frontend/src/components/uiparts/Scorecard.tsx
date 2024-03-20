import { Box, Button, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { StolzlText } from './StolzlText'

export const Scorecard: FC = () => {
  return (
    <>
      <Box margin="0 auto" width={300} height={350} backgroundColor="gray" />

      <VStack gap={3} mt={5}>
        <Button
          fontSize="xs"
          size="sm"
          borderRadius="full"
          backgroundColor="black"
          color="white"
          minW="170"
          pt={1}
        >
          <StolzlText fontWeight={400}>Share on Farcaster</StolzlText>
        </Button>
        <Button
          fontSize="xs"
          size="sm"
          borderRadius="full"
          backgroundColor="black"
          color="white"
          minW="170"
          pt={1}
        >
          <StolzlText fontWeight={400}>Share on X</StolzlText>
        </Button>
      </VStack>
    </>
  )
}
