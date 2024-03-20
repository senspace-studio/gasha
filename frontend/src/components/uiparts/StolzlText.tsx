import { ComponentWithAs, Text, TextProps } from '@chakra-ui/react'
import { FC, ReactNode, useMemo } from 'react'

interface Props extends TextProps {
  children: ReactNode
}

export const StolzlText: ComponentWithAs<'p', Props> = ({
  children,
  ...rest
}) => {
  // check useragent mac and iphone or not
  const isApple = useMemo(() => {
    if (typeof window === 'undefined') return false
    return /Mac|iPod|iPhone|iPad/.test(window.navigator.userAgent)
  }, [])

  return (
    <Text
      {...rest}
      fontFamily="stolzl, sans-serif"
      as="span"
      pt={isApple ? '0px' : 1}
    >
      {children}
    </Text>
  )
}
