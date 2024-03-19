import { Box, Flex, Text } from '@chakra-ui/react'
import { FC } from 'react'

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
      fontFamily="stolzl, sans-serif"
      fontWeight="500"
    >
      <Box>0xb6...b6eb</Box>
      <Box textAlign="right" lineHeight="1.3">
        <Text fontSize="2xl">9,999,999</Text>
        <Text fontSize="xs">WINNING RATE 99.999%</Text>
      </Box>
    </Flex>
  )
}
