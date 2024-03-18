import { LeaderboardListItem } from '@/components/uiparts/LeaderboardListItem'
import {
  Box,
  Container,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react'
import { NextPage } from 'next'

const Leaderboard: NextPage = () => {
  return (
    <Container>
      <Heading textAlign="center" color="yellow.400">
        Leaderboard
      </Heading>

      <Text fontSize="sm" color="yellow.400" textAlign="center" my={10}>
        Points represent your chances of winning ETH prize.
        <br />
        Lose your points if you sell your Gashas.
      </Text>

      <List display="grid" gap={2} justifyContent="center" mb={10}>
        <ListItem display="flex" alignItems="center">
          <Box
            width={5}
            height={5}
            borderRadius="full"
            backgroundColor="#ABD193"
            mr={2}
          />
          <Text color="white" fontWeight="bold" fontSize="sm" width="100px">
            Common
          </Text>
          <Text color="white" fontWeight="bold" fontSize="sm">
            = 1point
          </Text>
        </ListItem>
        <ListItem display="flex" alignItems="center">
          <Box
            width={5}
            height={5}
            borderRadius="full"
            backgroundColor="#ABD193"
            mr={2}
          />
          <Text color="white" fontWeight="bold" fontSize="sm" width="100px">
            Rare
          </Text>
          <Text color="white" fontWeight="bold" fontSize="sm">
            = 2point
          </Text>
        </ListItem>
        <ListItem display="flex" alignItems="center">
          <Box
            width={5}
            height={5}
            borderRadius="full"
            backgroundColor="#ABD193"
            mr={2}
          />
          <Text color="white" fontWeight="bold" fontSize="sm" width="100px">
            Special
          </Text>
          <Text color="white" fontWeight="bold" fontSize="sm">
            = 4point
          </Text>
        </ListItem>
      </List>

      <Flex
        color="yellow.400"
        fontSize="sm"
        fontWeight="bold"
        py={2}
        px={4}
        borderRadius={10}
        background="black"
        justifyContent="space-between"
      >
        <Box>User</Box>
        <Box>Points</Box>
      </Flex>

      <VStack my={5}>
        <LeaderboardListItem backgroundColor="blue.300" />
        <LeaderboardListItem backgroundColor="yellow.400" />
        <LeaderboardListItem />
      </VStack>
    </Container>
  )
}

export default Leaderboard
