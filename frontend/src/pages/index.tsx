import { BasicCount } from '@/components/uiparts/BasicCount'
import { SpinModule } from '@/components/uiparts/SpinModule'
import { TopCount } from '@/components/uiparts/TopCount'
import { useCurrentMints, useRemainingTime } from '@/hooks/useCount'
import { Box, Container, VStack } from '@chakra-ui/react'

export default function Home() {
  const { mints } = useCurrentMints()
  const remainingTime = useRemainingTime()

  return (
    <>
      <TopCount />
      <Box
        width={300}
        height={350}
        backgroundColor="gray"
        margin="0 auto"
        mt={10}
        mb={-10}
        zIndex={1}
        position="relative"
      />
      <Box backgroundColor="yellow.400" position="relative">
        <Container pt="80px">
          <SpinModule />

          <VStack mt={20} pb={10} gap={5}>
            <BasicCount number={mints} unit="MINTS" label="Total Mints" />
            <BasicCount number={99.9999} unit="ETH" label="Total Rewards" />
            <BasicCount number={remainingTime} label="Time Remaining" />
          </VStack>
        </Container>
      </Box>
    </>
  )
}
