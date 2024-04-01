import { SITE_URL } from '@/config'

export const generateWarpcastCompose = (params: {
  tokenId?: number
  address?: string
}) => {
  let text = ''

  if (params.tokenId) {
    switch (params.tokenId) {
      case 1:
        text += 'A Common Coco Shrooms was in the Ball!\nJoin the game at /ball'
        break
      case 2:
        text += 'A Rare Tuna Mayo Ball was in the Ball!\nJoin the game at /ball'
        break
      case 3:
        text +=
          'A Special Ballerchicki was in the Ball!\nJoin the game at /ball'
        break
      case 4:
        text += 'A Common Baller Socks was in the Ball!\nJoin the game at /ball'
        break
      case 5:
        text += 'A Rare Kanéball Drink was in the Ball!\nJoin the game at /ball'
        break
      case 6:
        text +=
          'A Special Golden Onigiri was in the Ball!\nJoin the game at /ball'
        break
    }
    text += `\n${SITE_URL}/frames/share/${params.tokenId}`
  } else if (params.address) {
    text += `Here's what was in my Ball!\nJoin the game at /ball`
    text += `\n${SITE_URL}/frames/share/scorecard/${params.address}`
  }

  return `https://warpcast.com/~/compose?text=${encodeURIComponent(text)}`
}

export const generateXCompose = (params: {
  tokenId?: number
  address?: string
}) => {
  let text = ''

  if (params.tokenId) {
    switch (params.tokenId) {
      case 1:
        text +=
          'A Common Coco Shrooms was in the Ball!\nJoin the game at https://theball.fun'
        break
      case 2:
        text +=
          'A Rare Tuna Mayo Ball was in the Ball!\nJoin the game at https://theball.fun'
        break
      case 3:
        text +=
          'A Special Ballerchicki was in the Ball!\nJoin the game at https://theball.fun'
        break
      case 4:
        text +=
          'A Common Baller Socks was in the Ball!\nJoin the game at https://theball.fun'
        break
      case 5:
        text +=
          'A Rare Kanéball Drink was in the Ball!\nJoin the game at https://theball.fun'
        break
      case 6:
        text +=
          'A Special Golden Onigiri was in the Ball!\nJoin the game at https://theball.fun'
        break
    }
  } else if (params.address) {
    text += `Here's what was in my Ball!\nJoin the game at https://theball.fun`
  }

  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
}
