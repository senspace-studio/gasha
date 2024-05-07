import { ABCGravityVariableText } from "@/components/uiparts/ABCGravityVariableText"
import { ResultGallery } from "@/components/uiparts/ResultGallery"
import { SpinAgainModal } from "@/components/uiparts/SpinAgainModal"
import { Box, Heading, Text } from "@chakra-ui/react"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"

const ResultPage: NextPage = () => {
  const { asPath } = useRouter()

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 200)
  }, [asPath])

  return (
    <Box backgroundColor="yellow.400">
      <Box textAlign="center" color="blue.400" pt={8}>
        <Heading as="h2" fontWeight={500} mb={[1, 3]} fontSize="32px">
          <ABCGravityVariableText fontStyle="italic">
            Congratulations!
          </ABCGravityVariableText>
        </Heading>
        <Text fontWeight="bold" fontSize="sm" mb={5}>
          See what you won below!
        </Text>
      </Box>

      <ResultGallery />

      <Box
        textAlign="center"
        backgroundColor="yellow.400"
        p={10}
        pb={20}
        position="relative"
        overflow="hidden"
      >
        <SpinAgainModal />
      </Box>
    </Box>
  )
}

export default ResultPage
