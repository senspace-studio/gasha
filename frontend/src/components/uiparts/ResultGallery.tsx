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
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { StolzlText } from './StolzlText'

type Props = {
  items: { name: string; image: string; rareness: string }[]
}

export const ResultGallery: FC<Props> = ({ items }) => {
  const [swiper, setSwiper] = useState<any>(null)

  return (
    <Container display="flex" justifyContent="center" flexWrap="wrap">
      <Grid
        gridTemplateColumns={items.length < 2 ? '300px' : '36px 290px 36px'}
        alignItems="center"
        mt={5}
      >
        <Icon
          as={ChevronLeftIcon}
          fontSize="4xl"
          onClick={() => {
            swiper.slidePrev()
          }}
          display={items.length < 2 ? 'none' : 'block'}
        />
        <Box overflow="hidden">
          <Swiper
            loop
            onInit={(ev) => {
              setSwiper(ev)
            }}
          >
            {items?.map((item, index) => (
              <SwiperSlide key={index}>
                <Heading
                  textAlign="center"
                  color="yellow.400"
                  fontFamily="freight-big-pro, serif"
                  fontWeight={400}
                  fontSize="5xl"
                >
                  {item.name}
                </Heading>
                <Box
                  margin="10px auto"
                  width={300}
                  height={330}
                  backgroundColor="yellow.300"
                ></Box>
                <Heading textAlign="center" color="yellow.400">
                  <StolzlText fontWeight={500}>
                    {item.rareness.toUpperCase()}
                  </StolzlText>
                </Heading>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Icon
          as={ChevronRightIcon}
          fontSize="4xl"
          onClick={() => {
            swiper.slideNext()
          }}
          display={items.length < 2 ? 'none' : 'block'}
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
  )
}
