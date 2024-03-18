import { Box, Text } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  number: number
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
    >
      <Box
        fontSize="4xl"
        fontWeight="bold"
        textAlign="center"
        backgroundColor="yellow.300"
        lineHeight={1}
        py={5}
      >
        {number}
        <Text fontSize="md">{unit}</Text>
      </Box>
      <Box
        fontWeight="bold"
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
