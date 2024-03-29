import { Box, Flex, Text } from '@chakra-ui/react'
import { FC, useMemo } from 'react'
import { StolzlText } from './StolzlText'

type Props = {
  backgroundColor?: string
  address?: string
  totalPoints?: number
  points?: number
}

export const LeaderboardListItem: FC<Props> = ({
  backgroundColor = 'yellow.300',
  address,
  totalPoints,
  points,
}) => {
  const winnigRate = useMemo(() => {
    if (!totalPoints || !points) return 0
    return ((points / totalPoints) * 100).toFixed(3)
  }, [points, totalPoints])

  return (
    <Flex
      px={4}
      py={2}
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      border="2px solid black"
      borderBottom="4px solid black"
      borderRadius={10}
      backgroundColor={backgroundColor}
    >
      <Box>
        <StolzlText fontWeight={500}>
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </StolzlText>
      </Box>
      <Box textAlign="right" lineHeight="1.3">
        <Text fontSize="2xl">
          <StolzlText fontWeight={500}>{points?.toLocaleString()}</StolzlText>
        </Text>
        <Text fontSize="xs">
          <StolzlText fontWeight={500}>WINNING RATE {winnigRate}%</StolzlText>
        </Text>
      </Box>
    </Flex>
  )
}
