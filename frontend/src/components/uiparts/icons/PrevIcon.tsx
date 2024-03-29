import { Icon, IconProps } from '@chakra-ui/icon'
import { ComponentWithAs } from '@chakra-ui/system'

export const PrevIcon: ComponentWithAs<'svg', IconProps> = ({ ...props }) => {
  return (
    <Icon viewBox="0 0 48 48" {...props}>
      <path
        d="M30.9631 11.6397C31.2563 11.6397 31.5495 11.7647 31.7541 12.0057C32.1246 12.4421 32.07 13.0944 31.6336 13.4649L19.2004 24.0003L31.6336 34.5356C32.07 34.9061 32.1246 35.5584 31.7541 35.9948C31.3836 36.4313 30.7313 36.4835 30.2948 36.1153L16 24.0003L30.2948 11.8852C30.4881 11.7216 30.7267 11.6397 30.9631 11.6397Z"
        fill="#0D0D0D"
      />
    </Icon>
  )
}
