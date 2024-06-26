import { Icon, IconProps } from '@chakra-ui/icon'
import { ComponentWithAs } from '@chakra-ui/system'

export const XIcon: ComponentWithAs<'svg', IconProps> = ({ ...props }) => {
  return (
    <Icon viewBox="0 0 48 48" {...props}>
      <rect width="48" height="48" rx="24" fill="black" />
      <path
        d="M11.0634 12L21.1027 25.4642L11 36.4082H13.275L22.1174 26.8238L29.2634 36.4082H37L26.3979 22.1886L35.7991 12H33.528L25.3832 20.8251L18.804 12H11.0634ZM14.4085 13.6776H17.9637L33.6588 34.7266H30.1037L14.4085 13.6776Z"
        fill="white"
      />
    </Icon>
  )
}
