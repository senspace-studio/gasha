import { Button, ButtonProps, ComponentWithAs } from "@chakra-ui/react"
import { FC, ReactNode } from "react"
import { StolzlText } from "./StolzlText"
import { ABCGravityVariableText } from "./ABCGravityVariableText"

interface Props extends ButtonProps {
  children: ReactNode
}

export const SpinButton: ComponentWithAs<"button", Props> = ({
  children,
  ...props
}) => {
  return (
    <Button
      {...props}
      backgroundColor="blue.400"
      color="yellow.400"
      pt="30px"
      pb="28px"
      px="30px"
      width="auto"
      fontSize="32px"
      border="2px solid black"
      borderBottom="4px solid black"
    >
      <ABCGravityVariableText fontWeight={700} fontStyle="italic">
        {children}
      </ABCGravityVariableText>
    </Button>
  )
}
