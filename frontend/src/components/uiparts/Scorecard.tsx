import { Box, Button, VStack } from '@chakra-ui/react'
import { FC } from 'react'

export const Scorecard: FC = () => {
  return (
    <>
      <Box margin="0 auto" width={300} height={350} backgroundColor="gray" />

      <VStack gap={3} mt={5}>
        <Button
          size="sm"
          borderRadius="full"
          backgroundColor="black"
          color="white"
          minW="170"
        >
          Share on Farcaster
        </Button>
        <Button
          size="sm"
          borderRadius="full"
          backgroundColor="black"
          color="white"
          minW="170"
        >
          Share on X
        </Button>
      </VStack>
    </>
  )
}
