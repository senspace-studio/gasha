import { useRemainingTime } from '@/hooks/useCount'
import { Box, Text } from '@chakra-ui/react'
import { FC } from 'react'

export const TopCount: FC = () => {
  const remainingTime = useRemainingTime()

  return (
    <Box
      color="yellow.400"
      lineHeight="1.2"
      fontWeight="bold"
      textAlign="center"
    >
      <Text fontSize="sm">Time</Text>
      <Text fontSize="3xl" mb={1}>
        {remainingTime}
      </Text>
      <Text fontSize="sm">Rewards</Text>
      <Text fontSize="3xl">
        99.999
        <Box as="span" fontSize="sm">
          ETH
        </Box>
      </Text>

      <Text fontSize="sm" mt={3} fontWeight="400">
        Spin to win NFTs and a chance to win ETH!
      </Text>
    </Box>
  )
}
