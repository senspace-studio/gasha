import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { StolzlText } from './StolzlText'
import { Scorecard } from './Scorecard'
import { useResultData } from '@/hooks/useGasha'

export const ResultGallery: FC = () => {
  const [swiper, setSwiper] = useState<any>(null)

  const { gotItems, gotPoints } = useResultData()

  return gotItems ? (
    <Container display="flex" justifyContent="center" flexWrap="wrap">
      <Grid gridTemplateColumns={'36px 300px 36px'} alignItems="center">
        <Icon
          as={ChevronLeftIcon}
          fontSize="4xl"
          onClick={() => {
            swiper.slidePrev()
          }}
        />
        <Box overflow="hidden">
          <Swiper
            loop
            autoplay={{ delay: 5000 }}
            onInit={(ev) => {
              setSwiper(ev)
            }}
          >
            {gotItems.map((item, index) => (
              <SwiperSlide key={index}>
                <Box
                  margin="0 auto"
                  width={300}
                  height={330}
                  backgroundColor="yellow.300"
                ></Box>
                <Heading
                  textAlign="center"
                  color="yellow.400"
                  fontFamily="freight-big-pro, serif"
                  fontWeight={400}
                  fontSize="5xl"
                >
                  {item.name}
                </Heading>
                <Heading textAlign="center" color="yellow.400" fontSize="md">
                  <StolzlText fontWeight={500}>
                    {item.rareness.toUpperCase()}
                  </StolzlText>
                </Heading>
              </SwiperSlide>
            ))}
            <SwiperSlide>
              <Scorecard points={gotPoints} items={gotItems} />
            </SwiperSlide>
          </Swiper>
        </Box>
        <Icon
          as={ChevronRightIcon}
          fontSize="4xl"
          onClick={() => {
            swiper.slideNext()
          }}
        />
      </Grid>

      <VStack gap={3} mt={5} width="100%">
        <Button
          fontSize="xs"
          size="sm"
          borderRadius="full"
          backgroundColor="black"
          color="white"
          minW="170"
        >
          <StolzlText fontWeight={400}>Share on Farcaster</StolzlText>
        </Button>
        <Button
          fontSize="xs"
          size="sm"
          borderRadius="full"
          backgroundColor="black"
          color="white"
          minW="170"
        >
          <StolzlText fontWeight={400}>Share on X</StolzlText>
        </Button>
      </VStack>
    </Container>
  ) : (
    <Flex alignItems="center" justifyContent="center" width="100%" height={380}>
      <Spinner color="yellow.400" size="lg" />
    </Flex>
  )
}
