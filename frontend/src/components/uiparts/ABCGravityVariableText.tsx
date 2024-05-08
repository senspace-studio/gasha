import { ComponentWithAs, Text, TextProps } from "@chakra-ui/react"
import { FC, ReactNode, useEffect, useMemo, useState } from "react"

interface Props extends TextProps {
  children: ReactNode
}

export const ABCGravityVariableText: ComponentWithAs<"p", Props> = ({
  children,
  fontWeight,
  ...rest
}) => {
  const [isApple, setIsApple] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    setIsApple(/Mac|iPod|iPhone|iPad/.test(window.navigator.userAgent))
  }, [])

  return (
    <Text
      {...rest}
      fontFamily="ABCGravityVariable, sans-serif"
      as="span"
      pt={1}
    >
      {children}
    </Text>
  )
}
