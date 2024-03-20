import { Box, Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { StolzlText } from './StolzlText'

type Props = {
  backgroundColor?: string
}

export const LeaderboardListItem: FC<Props> = ({
  backgroundColor = 'yellow.300',
}) => {
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
        <StolzlText fontWeight={500}>0xb6...b6eb</StolzlText>
      </Box>
      <Box textAlign="right" lineHeight="1.3">
        <Text fontSize="2xl">
          <StolzlText fontWeight={500}>9,999,999</StolzlText>
        </Text>
        <Text fontSize="xs">
          <StolzlText fontWeight={500}>WINNING RATE 99.999%</StolzlText>
        </Text>
      </Box>
    </Flex>
  )
}
