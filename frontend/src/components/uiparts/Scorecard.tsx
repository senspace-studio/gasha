import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { FC, useMemo } from "react"
import { StolzlText } from "./StolzlText"
import { useAccount } from "wagmi"
import { ResultItem, ResultPoint } from "@/gasha"
import Image from "next/image"
import { ABCGravityVariableText } from "./ABCGravityVariableText"

type Props = {
  points?: ResultPoint
  items?: ResultItem[]
}

type ItemProps = {
  points: number
  items: ResultItem[]
  rareness: string
}

const ScoreCardItem: FC<ItemProps> = ({ points, items, rareness }) => {
  return (
    <Grid gridTemplateColumns="135px 1fr" mx={1} px={4}>
      <Flex gap={2} alignItems="center">
        <Image
          alt=""
          src={`/img/ball_${rareness}.png`}
          width="18"
          height="18"
        />
        <Grid lineHeight={1} textAlign="left" fontWeight={500}>
          <ABCGravityVariableText fontSize="lg">
            <Box as="span" minW="50px" display="inline-block">
              {points}
            </Box>
            <Box as="span" fontSize="10px">
              $BALL
            </Box>
          </ABCGravityVariableText>
        </Grid>
      </Flex>
      <HStack gap={1}>
        {items.map((item, index) => (
          <HStack minW="55px" gap={1} key={`${item.rareness}${index}`}>
            <Image
              width="25"
              height="25"
              src={`/img/gacha-item/${item.tokenId}.png`}
              alt=""
            />
            <StolzlText fontSize="11px" fontWeight={500}>
              x{item.quantity}
            </StolzlText>
          </HStack>
        ))}
      </HStack>
    </Grid>
  )
}

export const Scorecard: FC<Props> = ({ points, items }) => {
  const { address } = useAccount()

  const specialItems = useMemo(() => {
    return items?.filter((item) => item.rareness === "special") || []
  }, [items])

  const rareItems = useMemo(() => {
    return items?.filter((item) => item.rareness === "rare") || []
  }, [items])

  const commonItems = useMemo(() => {
    return items?.filter((item) => item.rareness === "common") || []
  }, [items])

  const totalPoints = useMemo(() => {
    return points
      ? Number(points?.common.points) +
          Number(points?.rare.points) +
          Number(points?.special.points)
      : "XXX"
  }, [points])

  return (
    <>
      <Box
        overflow="hidden"
        border="1px solid black"
        width={280}
        h={280}
        backgroundColor="yellow.300"
      >
        <Box backgroundColor="yellow.400" position="relative">
          <Flex alignItems="end" height="140px" py={3} px={4}>
            <Box>
              <Text fontSize="4xl" color="blue.400" mb={-3}>
                <ABCGravityVariableText fontWeight={700} fontSize="32px">
                  {totalPoints}
                </ABCGravityVariableText>
              </Text>
              <Text
                fontSize={Number(totalPoints) > 9999 ? "sm" : "md"}
                color="blue.400"
                mb={0}
              >
                <ABCGravityVariableText
                  fontWeight={500}
                  color="blue.400"
                  ml={1}
                >
                  $HIGHBALL
                </ABCGravityVariableText>
              </Text>
              <Text fontSize="sm" ml={1}>
                <StolzlText fontWeight={500}>
                  {address && address.slice(0, 4) + "..." + address.slice(-3)}
                </StolzlText>
              </Text>
            </Box>
          </Flex>
          <Box width={120} position="absolute" top="5px" right="5px">
            <Image
              src="/img/gasha_machine.png"
              alt=""
              width="1169"
              height="1590"
            />
          </Box>
        </Box>
        <Grid rowGap={2} pt={8} pb={5}>
          {specialItems.length > 0 && (
            <ScoreCardItem
              points={Number(points?.special.points)}
              items={specialItems}
              rareness="special"
            />
          )}
          {rareItems.length > 0 && (
            <ScoreCardItem
              points={Number(points?.rare.points)}
              items={rareItems}
              rareness="rare"
            />
          )}
          {commonItems.length > 0 && (
            <ScoreCardItem
              points={Number(points?.common.points)}
              items={commonItems}
              rareness="common"
            />
          )}
        </Grid>
      </Box>
    </>
  )
}
