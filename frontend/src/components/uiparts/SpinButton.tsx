import { Button, ButtonProps, ComponentWithAs } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'
import { StolzlText } from './StolzlText'

interface Props extends ButtonProps {
  children: ReactNode
}

export const SpinButton: ComponentWithAs<'button', Props> = ({
  children,
  ...props
}) => {
  return (
    <Button
      {...props}
      backgroundColor="blue.400"
      color="yellow.400"
      pt="34px"
      pb="28px"
      px="35px"
      width="auto"
      fontSize="2xl"
      border="2px solid black"
      borderBottom="4px solid black"
    >
      <StolzlText fontWeight={700}>{children}</StolzlText>
    </Button>
  )
}
