import { extendTheme } from '@chakra-ui/react'

export const chakraTheme = extendTheme({
  colors: {
    blue: {
      300: '#B4B6D9',
      400: '#0554F2',
      500: '#023373',
    },
    yellow: {
      200: '#F2E8D5',
      300: '#FBE2BA',
      400: '#FBD916',
      500: '#593B02',
    },
    black: {
      400: '#0D0D0D',
    },
  },
  fonts: {
    body: 'Avenir, sans-serif',
    heading: 'Avenir, sans-serif',
    mono: 'Avenir, sans-serif',
  },
})
