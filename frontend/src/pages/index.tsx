import { BasicCount } from "@/components/uiparts/BasicCount"
import { SpinModule } from "@/components/uiparts/SpinModule"
import {
  useCurrentMints,
  useCurrentRewards,
  useRemainingTime,
} from "@/hooks/useCount"
import { Box, Container, VStack } from "@chakra-ui/react"
import Image from "next/image"
import bg from "../../public/img/gasha_bg.png"
import { formatEther } from "viem"

export default function Home() {
  const currentMints = useCurrentMints()
  const remainingTime = useRemainingTime()
  const rewardPool = useCurrentRewards()

  return (
    <>
      <Box
        height={["330px", "660px"]}
        position="relative"
        backgroundImage={`url(${bg.src})`}
        backgroundPosition="center center"
        backgroundSize="cover"
      >
        <Box
          position="absolute"
          right={0}
          left={0}
          margin="0 auto"
          marginTop={["35px", "5px"]}
          maxW="95%"
          width={[450, 400]}
          zIndex={1}
        >
          <Image
            alt=""
            src="/img/gasha_deco.png"
            width="716"
            height="793"
            style={{
              width: "100%",
            }}
          />
        </Box>
        <Box
          position="absolute"
          right={0}
          left={0}
          margin="0 auto"
          marginTop={["20px", "80px"]}
          maxW="90%"
          width={[300]}
          zIndex={1}
        >
          <Image
            src="/img/gasha_machine.png"
            alt="gasha machine"
            width="1169"
            height="1590"
            style={{
              width: "100%",
            }}
          />
        </Box>
      </Box>
      <Box
        top={["0px", "-120px"]}
        position="relative"
        backgroundColor={["yellow.400", "transparent"]}
      >
        <Container
          p="25px"
          pt={["140px", "25px"]}
          backgroundColor="yellow.400"
          borderRadius="25px"
        >
          <SpinModule />

          <VStack mt={["40px", "40px"]} pb={10} gap={5}>
            <BasicCount
              number={
                rewardPool.status === "pending"
                  ? "-"
                  : formatEther(rewardPool.data || BigInt(0))
              }
              unit="$CRASH"
              label="Total Rewards"
            />
            <BasicCount
              number={currentMints.mints}
              unit="MINTS"
              label="Total Mints"
            />
            <BasicCount number={remainingTime} label="Time Remaining" />
          </VStack>
        </Container>
      </Box>
    </>
  )
}
