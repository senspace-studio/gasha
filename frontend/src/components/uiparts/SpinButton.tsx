import { Button, ButtonProps, ComponentWithAs } from '@chakra-ui/react'
import { FC, ReactNode } from 'react'

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
      pt="28px"
      pb="25px"
      px="30px"
      fontWeight="bold"
      fontSize="xl"
      border="2px solid black"
      fontFamily="Zo"
    >
      {children}
    </Button>
  )
}
