import { Box, Text } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  number: string | number
  unit?: string
  label: string
}

export const BasicCount: FC<Props> = ({ number, unit, label }) => {
  return (
    <Box
      border="2px solid black"
      overflow="hidden"
      borderRadius={10}
      width="100%"
      fontFamily="stolzl, sans-serif"
      fontWeight={500}
    >
      <Box
        fontSize="4xl"
        textAlign="center"
        backgroundColor="yellow.300"
        lineHeight={1}
        pt={5}
        pb={4}
      >
        {number}
        <Text fontSize="md">{unit}</Text>
      </Box>
      <Box
        fontSize="lg"
        textAlign="center"
        backgroundColor="blue.400"
        color="yellow.400"
        pt={2}
        pb={1}
      >
        {label}
      </Box>
    </Box>
  )
}
