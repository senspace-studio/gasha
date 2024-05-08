import { ABCGravityVariableText } from "@/components/uiparts/ABCGravityVariableText"
import { LeaderboardListItem } from "@/components/uiparts/LeaderboardListItem"
import { StolzlText } from "@/components/uiparts/StolzlText"
import { useLeaderboard } from "@/hooks/useLeaderboard"
import {
  Box,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  VStack,
} from "@chakra-ui/react"
import { NextPage } from "next"
import { useState } from "react"
import { useAccount } from "wagmi"

const Leaderboard: NextPage = () => {
  const { myPoints, totalPoints, leaderboard } = useLeaderboard()
  const { address } = useAccount()
  const [page, setPage] = useState(1)

  return (
    <Container>
      <Heading
        textAlign="center"
        color="yellow.400"
        fontFamily="stolzl, sans-serif"
        fontWeight={500}
        mt={5}
        mb={10}
        fontSize="4xl"
      >
        <ABCGravityVariableText>Leaderboard</ABCGravityVariableText>
      </Heading>

      <Flex
        color="#FBD916"
        fontSize="sm"
        pt={3}
        pb={2}
        px={4}
        borderRadius={10}
        background="black"
        justifyContent="space-between"
      >
        <Box>
          <StolzlText fontWeight={500}>User</StolzlText>
        </Box>
        <Box>
          <StolzlText fontWeight={500}>Points</StolzlText>
        </Box>
      </Flex>

      <VStack my={5}>
        {address && (
          <LeaderboardListItem
            address={address}
            points={myPoints}
            totalPoints={totalPoints}
            backgroundColor="blue.300"
          />
        )}
        {leaderboard?.data.map((item, i) => (
          <LeaderboardListItem
            key={i}
            address={item.address}
            points={Number(item.points)}
            totalPoints={totalPoints}
            backgroundColor={
              page === 1 && i === 0 ? "yellow.400" : "yellow.300"
            }
          />
        ))}
      </VStack>
    </Container>
  )
}

export default Leaderboard
