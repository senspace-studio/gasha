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
import Image from 'next/image'
import { ipfs2http } from '@/lib/ipfs2http'
import { PrevIcon } from './icons/PrevIcon'
import { NextIcon } from './icons/NextIcon'

export const ResultGallery: FC = () => {
  const [swiper, setSwiper] = useState<any>(null)

  const { gotItems, gotPoints } = useResultData()

  return gotItems ? (
    <Container display="flex" justifyContent="center" flexWrap="wrap">
      <Grid
        gridTemplateColumns={'40px 280px 40px'}
        alignItems="center"
        columnGap={2}
      >
        <PrevIcon
          fontSize="40px"
          onClick={() => {
            swiper.slidePrev()
          }}
          mt="-90px"
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
                <Image
                  width={280}
                  height={280}
                  alt={`${item.name} image`}
                  src={`/img/gacha-item/${item.image.slice(7)}`}
                />
                <Heading
                  textAlign="center"
                  color="blue.400"
                  fontFamily="freight-big-pro, serif"
                  fontWeight={400}
                  fontSize="5xl"
                >
                  {item.name}
                </Heading>
                <Heading textAlign="center" color="blue.400" fontSize="md">
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
        <NextIcon
          fontSize="40px"
          onClick={() => {
            swiper.slideNext()
          }}
          mt="-90px"
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
