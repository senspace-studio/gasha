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

export const ResultGallery: FC = () => {
  const [swiper, setSwiper] = useState<any>()

  const { gotItems, gotPoints, scorecardShareId } = useResultData()

  const shareOnFarcaster = useCallback(
    (swiper: any) => {
      const index = swiper.activeIndex
      const item = gotItems?.[index]

      let url = ''
      if (!item) {
        url = `${window.location.origin}/frames/share/scorecard/${scorecardShareId}`
      } else {
        url = `${window.location.origin}/frames/share/${item.tokenId}`
      }

      let warpcastText = ''
      switch (item?.tokenId) {
        case 1:
          warpcastText =
            'A%20Common%20Coco%20Shrooms%20was%20in%20the%20Ball!%0AJoin%20the%20game%20at%20%2Fball'
          break
        case 2:
          warpcastText =
            'A%20Rare%20Tuna%20Mayo%20Ball%20was%20in%20the%20Ball!%0AJoin%20the%20game%20at%20%2Fball'
          break
        case 3:
          warpcastText =
            'A%20Special%20Ballerchicki%20was%20in%20the%20Ball!%0AJoin%20the%20game%20at%20%2Fball'
          break

        default:
          warpcastText =
            "Here's%20what%20was%20in%20my%20Ball!%0AJoin%20the%20game%20at%20%2Fball"
      }

      window.open(
        `https://warpcast.com/~/compose?text=${warpcastText}%0A${encodeURIComponent(
          url
        )}`,
        '_blank'
      )
    },
    [gotItems, scorecardShareId]
  )

  const shareOnX = useCallback(
    (swiper: any) => {
      const index = swiper.activeIndex
      const item = gotItems?.[index]

      let xText = ''

      switch (item?.tokenId) {
        case 1:
          xText = 'A Common Coco Shrooms was in the Ball!\nJoin the game at'
          break
        case 2:
          xText = 'A Rare Tuna Mayo Ball was in the Ball!\nJoin the game at'
          break
        case 3:
          xText = 'A Special Ballerchicki was in the Ball!\nJoin the game at'
          break

        default:
          xText = "Here's what was in my Ball!\nJoin the game at"
      }

      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          xText
        )}%20https%3A%2F%2Ftheball.fun`
      )
    },
    [gotItems, scorecardShareId]
  )

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
            swiper.slideNext()
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
          <FarcasterIcon
            fontSize="30px"
            onClick={() => shareOnFarcaster(swiper)}
          />
          <XIcon fontSize="30px" onClick={() => shareOnX(swiper)} />
        </HStack>
      </Box>
    </Container>
  ) : (
    <Flex alignItems="center" justifyContent="center" width="100%" height={380}>
      <Spinner color="yellow.400" size="lg" />
    </Flex>
  )
}
