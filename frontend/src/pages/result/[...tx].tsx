import { ResultGallery } from '@/components/uiparts/ResultGallery'
import { Scorecard } from '@/components/uiparts/Scorecard'
import { SpinAgainModal } from '@/components/uiparts/SpinAgainModal'
import { SpinButton } from '@/components/uiparts/SpinButton'
import { StolzlText } from '@/components/uiparts/StolzlText'
import { useResultData } from '@/hooks/useGasha'
import { Box, Button, Flex, Heading, Spinner, Text } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const ResultPage: NextPage = () => {
  const { gotItems, gotPoints } = useResultData()
  const { asPath } = useRouter()

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0)
    }, 200)
  }, [asPath])

  return (
    <>
      {/* <Box css={animationStyle}>
        <Button
          width={100}
          height={100}
          borderRadius="full"
          position="fixed"
          bottom={5}
          right={5}
          zIndex={10}
          fontFamily="stolzl, sans-serif"
          border="3px solid black"
          color="white"
          bgGradient="linear(to-r, blue.400, yellow.400)"
          fontSize="lg"
          boxShadow="0 0 10px 0 rgba(256, 256, 256, 0.5)"
          animation="3s ease-in-out infinite rotate"
        >
          SPIN
          <br />
          AGAIN
        </Button>
      </Box> */}

      {gotItems ? (
        <ResultGallery items={gotItems || []} />
      ) : (
        <Flex
          alignItems="center"
          justifyContent="center"
          width="100%"
          height={300}
        >
          <Spinner color="yellow.400" size="lg" />
        </Flex>
      )}

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

        <Scorecard points={gotPoints} items={gotItems} />

        <SpinAgainModal />

        <br />

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
          >
            <StolzlText fontWeight={500}>Check Total Rewards</StolzlText>
          </Button>
        </Link>
      </Box>
    </>
  )
}

export default ResultPage

const animationStyle = css`
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
