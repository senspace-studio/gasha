import { Box, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { StolzlText } from './StolzlText'

type Props = {
  number: string | number
  unit?: string
  label: string
}

export const BasicCount: FC<Props> = ({ number, unit, label }) => {
  return (
    <Box
      border="2px solid black"
      borderBottom="4px solid black"
      overflow="hidden"
      borderRadius={20}
      width="100%"
    >
      <Box
        fontSize="lg"
        textAlign="center"
        backgroundColor="blue.400"
        color="yellow.400"
        pt={2}
        pb={1}
      >
        <StolzlText fontWeight={500}>{label}</StolzlText>
      </Box>
      <Box
        fontSize="4xl"
        textAlign="center"
        backgroundColor="yellow.300"
        lineHeight={1}
        py={5}
        minH="55px"
      >
        <StolzlText fontWeight={500}>{number}</StolzlText>
        <Text fontSize="md">
          <StolzlText fontWeight={500}>{unit}</StolzlText>
        </Text>
      </Box>
    </Box>
  )
}
