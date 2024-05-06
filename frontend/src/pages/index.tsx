import { BasicCount } from "@/components/uiparts/BasicCount"
import { SpinModule } from "@/components/uiparts/SpinModule"
import { useCurrentMints, useRemainingTime } from "@/hooks/useCount"
import { Box, Container, VStack } from "@chakra-ui/react"
import Image from "next/image"

export default function Home() {
  const currentMints = useCurrentMints()
  const remainingTime = useRemainingTime()

  return (
    <>
      <Box height={["330px", "320px"]} position="relative">
        <Box
          position="absolute"
          right={0}
          left={0}
          margin="0 auto"
          marginTop={["35px", "-10px"]}
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
          marginTop={["20px", "0px"]}
          maxW="100%"
          width={[300]}
          zIndex={1}
        >
          <Image
            src="/img/747gacha_1.png" 
            alt="gasha machine"
            width="578"
            height="1076"
            style={{
              width: "100%",
            }}
          />
        </Box>
      </Box>
      <Box backgroundColor="yellow.400" position="relative">
        <Container pt="140px">
          <SpinModule />

          <VStack mt={["40px", "40px"]} pb={10} gap={5}>
            <BasicCount number={0} unit="$CRASH" label="Total Rewards" />
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
