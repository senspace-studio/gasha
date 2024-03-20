import { useRemainingTime } from '@/hooks/useCount'
import { Box, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { StolzlText } from './StolzlText'

export const TopCount: FC = () => {
  const remainingTime = useRemainingTime()

  return (
    <Box color="yellow.400" lineHeight="1.2" textAlign="center" mt={5}>
      <Box fontFamily="stolzl, sans-serif" fontWeight={500}>
        <Text fontSize="sm">
          <StolzlText fontWeight={500}>Time</StolzlText>
        </Text>
        <Text fontSize="4xl" mb={1}>
          <StolzlText fontWeight={500}>{remainingTime}</StolzlText>
        </Text>
        <Text fontSize="sm">
          <StolzlText fontWeight={500}>Rewards</StolzlText>
        </Text>
        <Text fontSize="4xl">
          <StolzlText fontWeight={500}>99.999</StolzlText>
          <Box as="span" fontSize="sm">
            <StolzlText fontWeight={500}>ETH</StolzlText>
          </Box>
        </Text>
      </Box>

      <Text fontSize="sm" mt={3} fontWeight="400">
        Spin to win NFTs and a chance to win ETH!
      </Text>
    </Box>
  )
}
