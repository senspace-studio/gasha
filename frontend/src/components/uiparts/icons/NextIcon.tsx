import { Icon, IconProps } from '@chakra-ui/icon'
import { ComponentWithAs } from '@chakra-ui/system'

export const NextIcon: ComponentWithAs<'svg', IconProps> = ({ ...props }) => {
  return (
    <Icon viewBox="0 0 48 48" {...props}>
      <path
        d="M17.0369 36.3603C16.7437 36.3603 16.4505 36.2353 16.2459 35.9943C15.8754 35.5579 15.93 34.9056 16.3664 34.5351L28.7996 23.9997L16.3664 13.4644C15.93 13.0939 15.8754 12.4416 16.2459 12.0052C16.6164 11.5687 17.2687 11.5165 17.7052 11.8847L32 23.9997L17.7052 36.1148C17.5119 36.2784 17.2733 36.3603 17.0369 36.3603Z"
        fill="#0D0D0D"
      />
    </Icon>
  )
}
