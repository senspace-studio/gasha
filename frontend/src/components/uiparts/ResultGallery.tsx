import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Icon,
  VStack,
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

type Props = {
  items: { name: string; image: string; rareness: number }[]
}

export const ResultGallery: FC<Props> = ({ items }) => {
  const [swiper, setSwiper] = useState<any>(null)

  return (
    <Container display="flex" justifyContent="center" flexWrap="wrap">
      <Grid gridTemplateColumns="50px 300px 50px" alignItems="center">
        <Icon
          as={ChevronLeftIcon}
          fontSize="xxx-large"
          onClick={() => {
            swiper.slidePrev()
          }}
        />
        <Box overflow="hidden">
          <Swiper
            loop
            onInit={(ev) => {
              setSwiper(ev)
            }}
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <Heading textAlign="center" color="yellow.400">
                  {item.name}
                </Heading>
                <Box
                  margin="10px auto"
                  width={300}
                  height={330}
                  backgroundColor="yellow.300"
                ></Box>
                <Heading textAlign="center" color="yellow.400">
                  SPECIAL
                </Heading>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Icon
          as={ChevronRightIcon}
          fontSize="xxx-large"
          onClick={() => {
            swiper.slideNext()
          }}
        />
      </Grid>

      <VStack gap={3} mt={5}>
        <Button
          size="sm"
          borderRadius="full"
          backgroundColor="black"
          color="white"
          minW="170"
        >
          Share on Farcaster
        </Button>
        <Button
          size="sm"
          borderRadius="full"
          backgroundColor="black"
          color="white"
          minW="170"
        >
          Share on X
        </Button>
      </VStack>
    </Container>
  )
}
