import { ResultGallery } from '@/components/uiparts/ResultGallery'
import { Scorecard } from '@/components/uiparts/Scorecard'
import { SpinButton } from '@/components/uiparts/SpinButton'
import { useResultData } from '@/hooks/useGasha'
import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { NextPage } from 'next'
import Link from 'next/link'

const ResultPage: NextPage = () => {
  const { gotItems } = useResultData()

  return (
    <>
      <ResultGallery items={gotItems || []} />

      <Box
        textAlign="center"
        backgroundColor="yellow.400"
        py={10}
        mt={4}
        position="relative"
        _before={{
          content: '" "',
          borderStyle: 'solid',
          borderWidth: '50px 50vw 0 50vw',
          borderColor: 'transparent transparent transparent transparent',
          borderTopColor: 'blue.400',
          position: 'absolute',
          left: 'calc((100% - 100vw) / 2)',
          top: 0,
          zIndex: 1,
        }}
        overflow="hidden"
      >
        <Heading
          as="h2"
          fontFamily="stolzl, sans-serif"
          fontWeight={500}
          mb={3}
          mt={10}
        >
          Congratulations!
        </Heading>
        <Text fontWeight="bold" mb={7}>
          See What you won below!
        </Text>

        <Scorecard />

        <SpinButton minW="230px" mt={10}>
          SPIN AGAIN!
        </SpinButton>

        <Link href="/">
          <Button
            mt={5}
            minW="230px"
            backgroundColor="transparent"
            color="black"
            pt="30px"
            pb="25px"
            width="auto"
            fontSize="lg"
            border="2px solid black"
            borderBottom="4px solid black"
            fontFamily="stolzl, sans-serif"
            fontWeight={500}
          >
            Check Total Rewards
          </Button>
        </Link>
      </Box>
    </>
  )
}

export default ResultPage
