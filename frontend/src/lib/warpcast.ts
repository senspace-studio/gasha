import { SITE_URL } from '@/config'

export const generateWarpcastCompose = (params: {
  tokenId?: number
  address?: string
}) => {
  let text = 'https://warpcast.com/~/compose?text='

  if (params.tokenId) {
    switch (params.tokenId) {
      case 1:
        text +=
          'A%20Common%20Coco%20Shrooms%20was%20in%20the%20Ball!%0AJoin%20the%20game%20at%20%2Fball'
        break
      case 2:
        text +=
          'A%20Rare%20Tuna%20Mayo%20Ball%20was%20in%20the%20Ball!%0AJoin%20the%20game%20at%20%2Fball'
        break
      case 3:
        text +=
          'A%20Special%20Ballerchicki%20was%20in%20the%20Ball!%0AJoin%20the%20game%20at%20%2Fball'
        break
    }
    text += `%0A${SITE_URL}/frames/share/${params.tokenId}`
  } else if (params.address) {
    text += `Here's%20what%20was%20in%20my%20Ball!%0AJoin%20the%20game%20at%20%2Fball`
    text += `%0A${SITE_URL}/frames/share/scorecard/${params.address}`
  }

  return text
}
