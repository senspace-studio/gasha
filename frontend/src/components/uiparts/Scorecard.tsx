import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FC, useMemo } from 'react'
import { StolzlText } from './StolzlText'
import { useAccount } from 'wagmi'
import { ResultItem, ResultPoint } from '@/gasha'

type Props = {
  points?: ResultPoint
  items?: ResultItem[]
}

type ItemProps = {
  points: number
  items: ResultItem[]
}

const ScoreCardItem: FC<ItemProps> = ({ points, items }) => {
  return (
    <Grid gridTemplateColumns="100px 1fr 1fr" mx={1}>
      <Flex gap={2} alignItems="center" justifyContent="center">
        <Box w={5} h={5} borderRadius="full" backgroundColor="#ABD193" />
        <Grid lineHeight={1} textAlign="left" fontWeight={500}>
          <StolzlText fontSize="lg">{points}</StolzlText>
          <StolzlText fontSize="xs">POINTS</StolzlText>
        </Grid>
      </Flex>
      {items.map((item, index) => (
        <Box position="relative" key={`${item.rareness}${index}`}>
          <StolzlText
            fontSize="md"
            fontWeight={500}
            position="absolute"
            top={-5}
            right={2}
          >
            x{item.quantity}
          </StolzlText>
          <Box
            margin="0 auto"
            width="55px"
            height="60px"
            backgroundColor="grey"
          />
        </Box>
      ))}
    </Grid>
  )
}

export const Scorecard: FC<Props> = ({ points, items }) => {
  const { address } = useAccount()

  const specialItems = useMemo(() => {
    return items?.filter((item) => item.rareness === 'special') || []
  }, [items])

  const rareItems = useMemo(() => {
    return items?.filter((item) => item.rareness === 'rare') || []
  }, [items])

  const commonItems = useMemo(() => {
    return items?.filter((item) => item.rareness === 'common') || []
  }, [items])

  const totalPoints = useMemo(() => {
    return points
      ? Number(points?.common.points) +
          Number(points?.rare.points) +
          Number(points?.special.points)
      : 'XXX'
  }, [points])

  return (
    <>
      <Box
        overflow="hidden"
        borderRadius={10}
        border="2px solid black"
        width={300}
        h={380}
        backgroundColor="yellow.300"
      >
        <Box backgroundColor="yellow.400">
          <Center>
            <Box
              margin="10px auto 0"
              backgroundColor="blue.400"
              color="yellow.400"
              border="2px solid black"
              borderRadius="full"
              display="inline-block"
              px={3}
              py={1}
            >
              <StolzlText>ScoreCard</StolzlText>
            </Box>
          </Center>
          <Grid gridTemplateColumns="100px auto 100px" justifyContent="center">
            <Box width="80px" height="100px" backgroundColor="grey"></Box>
            <Grid alignItems="center">
              <Text fontSize="4xl" color="blue.400">
                <StolzlText fontWeight={500}>{totalPoints}</StolzlText>
              </Text>
            </Grid>
            <Grid alignItems="end">
              <Box
                lineHeight={1.1}
                mb={4}
                mr={Number(totalPoints) > 9999 ? 10 : 0}
              >
                <Text fontSize="xl">
                  <StolzlText fontWeight={500} color="blue.400">
                    POINTS
                  </StolzlText>
                </Text>
                <Text fontSize="xs">
                  <StolzlText fontWeight={500}>
                    {address && address.slice(0, 4) + '...' + address.slice(-3)}
                  </StolzlText>
                </Text>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Grid rowGap={5} pt={8} pb={5}>
          {specialItems.length > 0 && (
            <ScoreCardItem
              points={Number(points?.special.points)}
              items={specialItems}
            />
          )}
          {rareItems.length > 0 && (
            <ScoreCardItem
              points={Number(points?.rare.points)}
              items={rareItems}
            />
          )}
          {commonItems.length > 0 && (
            <ScoreCardItem
              points={Number(points?.common.points)}
              items={commonItems}
            />
          )}
        </Grid>
      </Box>
    </>
  )
}
