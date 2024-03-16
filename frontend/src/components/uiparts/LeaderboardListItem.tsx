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
      p={4}
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      border="2px solid black"
      borderRadius={10}
      backgroundColor={backgroundColor}
    >
      <Box fontWeight="bold">0xb6...b6eb</Box>
      <Box textAlign="right" lineHeight="1.3">
        <Text fontSize="2xl" fontWeight="bold">
          9,999,999
        </Text>
        <Text fontSize="xs">WINNING RATE 99.999%</Text>
      </Box>
    </Flex>
  )
}
