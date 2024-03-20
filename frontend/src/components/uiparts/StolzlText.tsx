import { ComponentWithAs, Text, TextProps } from '@chakra-ui/react'
import { FC, ReactNode, useEffect, useMemo, useState } from 'react'

interface Props extends TextProps {
  children: ReactNode
}

export const StolzlText: ComponentWithAs<'p', Props> = ({
  children,
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
    >
      {children}
    </Text>
  )
}
