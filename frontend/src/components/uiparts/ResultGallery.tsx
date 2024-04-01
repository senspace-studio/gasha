import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Spinner,
} from '@chakra-ui/react'
import { FC, useCallback, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as _Swiper } from 'swiper'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import { StolzlText } from './StolzlText'
import { Scorecard } from './Scorecard'
import { useResultData } from '@/hooks/useGasha'
import Image from 'next/image'
import { PrevIcon } from './icons/PrevIcon'
import { NextIcon } from './icons/NextIcon'
import { FarcasterIcon } from './icons/FarcasterIcon'
import { XIcon } from './icons/XIcon'
import { generateWarpcastCompose, generateXCompose } from '@/lib/warpcast'

export const ResultGallery: FC = () => {
  const [swiper, setSwiper] = useState<_Swiper>()
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const { gotItems, gotPoints, scorecardShareId } = useResultData()

  const shareOnFarcaster = useCallback(() => {
    const item = gotItems?.[currentIndex]

    const link = generateWarpcastCompose({
      tokenId: item?.tokenId,
      address: scorecardShareId?.toString(),
    })

    console.log(link)

    window.open(link, '_blank')
  }, [gotItems, scorecardShareId, currentIndex])

  const shareOnX = useCallback(() => {
    const item = gotItems?.[currentIndex]

    const link = generateXCompose({
      tokenId: item?.tokenId,
      address: scorecardShareId?.toString(),
    })

    window.open(link, '_blank')
  }, [gotItems, scorecardShareId, currentIndex])

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
            swiper?.slidePrev()
          }}
          mt="-60px"
          cursor="pointer"
        />
        <Box overflow="hidden">
          <Swiper
            loop
            autoplay={{ delay: 5000 }}
            onInit={(ev) => {
              setSwiper(ev)
            }}
            onSlideChange={(ev) => {
              setCurrentIndex(ev.activeIndex)
            }}
            // modules={[Autoplay]}
          >
            {gotItems.map((item, index) => (
              <SwiperSlide key={index}>
                <Image
                  width={280}
                  height={280}
                  alt={`${item.name} image`}
                  src={`/img/gacha-item/${item.tokenId}.png`}
                />
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  gap={2}
                  mt={4}
                >
                  <Heading
                    textAlign="center"
                    color="blue.400"
                    fontFamily="freight-big-pro, serif"
                    fontWeight={400}
                    fontSize="36px"
                  >
                    {item.name}
                  </Heading>
                  <Heading
                    textAlign="center"
                    color="blue.400"
                    fontSize="xs"
                    p="4px 5px 2px"
                    borderRadius="full"
                    border="1px solid"
                    borderColor="blue.400"
                  >
                    <StolzlText fontWeight={400}>
                      {item.rareness.toUpperCase()}
                    </StolzlText>
                  </Heading>
                </Flex>
              </SwiperSlide>
            ))}
            <SwiperSlide>
              {gotPoints ? (
                <Scorecard points={gotPoints} items={gotItems} />
              ) : (
                <Flex
                  width={280}
                  height={280}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Spinner color="blue" />
                </Flex>
              )}

              <Flex justifyContent="center" alignItems="center" gap={2} mt={4}>
                <Heading
                  textAlign="center"
                  color="blue.400"
                  fontFamily="freight-big-pro, serif"
                  fontWeight={400}
                  fontSize="36px"
                >
                  Scorecard
                </Heading>
              </Flex>
            </SwiperSlide>
          </Swiper>
        </Box>
        <NextIcon
          fontSize="40px"
          onClick={() => {
            swiper?.slideNext()
          }}
          mt="-60px"
          cursor="pointer"
        />
      </Grid>

      <Box textAlign="center" width="100%" mt={3}>
        <HStack
          display="inline-flex"
          gap={2}
          justifyContent="center"
          border="1px solid black"
          p="10px 15px"
          borderRadius="full"
        >
          <StolzlText fontWeight={400}>Share on</StolzlText>
          <FarcasterIcon fontSize="30px" onClick={() => shareOnFarcaster()} />
          <XIcon fontSize="30px" onClick={() => shareOnX()} />
        </HStack>
      </Box>
    </Container>
  ) : (
    <Flex alignItems="center" justifyContent="center" width="100%" height={380}>
      <Spinner color="yellow.400" size="lg" />
    </Flex>
  )
}
