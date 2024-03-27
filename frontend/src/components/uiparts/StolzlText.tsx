import { ComponentWithAs, Text, TextProps } from '@chakra-ui/react'
import { FC, ReactNode, useEffect, useMemo, useState } from 'react'

interface Props extends TextProps {
  children: ReactNode
}

export const StolzlText: ComponentWithAs<'p', Props> = ({
  children,
  fontWeight,
  ...rest
}) => {
  const [isApple, setIsApple] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setIsApple(/Mac|iPod|iPhone|iPad/.test(window.navigator.userAgent))
  }, [])

  return (
    <Text
      {...rest}
      fontFamily="stolzl, sans-serif"
      as="span"
      pt={isApple ? '0px' : 1}
      pb={isApple ? (Number(fontWeight) > 600 ? '6px' : '2px') : 0}
    >
      {children}
    </Text>
  )
}
