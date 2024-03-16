import { ResultGallery } from '@/components/uiparts/ResultGallery'
import { Scorecard } from '@/components/uiparts/Scorecard'
import { SpinButton } from '@/components/uiparts/SpinButton'
import { Box, Heading, Text } from '@chakra-ui/react'
import { NextPage } from 'next'

const ResultPage: NextPage = () => {
  const items = [
    {
      name: 'SHIBA',
      image: 'shiba.jpg',
      rareness: 0,
    },
    {
      name: 'SHIBA1',
      image: 'shiba.jpg',
      rareness: 1,
    },
  ]
  return (
    <>
      <ResultGallery items={items} />

      <Box textAlign="center" backgroundColor="yellow.400" py={10} mt={4}>
        <Heading as="h2">Congratulations!</Heading>
        <Text fontWeight="bold" mb={10}>
          See What you won below!
        </Text>

        <Scorecard />

        <SpinButton mt={10}>SPIN AGAIN!</SpinButton>
      </Box>
    </>
  )
}

export default ResultPage
