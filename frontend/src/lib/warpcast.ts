import { SITE_URL } from "@/config"

export const generateWarpcastCompose = (params: {
  tokenId?: number
  address?: string
}) => {
  let text = ""

  if (params.tokenId) {
    switch (params.tokenId) {
      case 1:
        text +=
          "A Common 747 Fleet Plane was in the Ball!\nJoin the game at /ball"
        break
      case 2:
        text +=
          "A Rare 747 Roll Call Plane was in the Ball!\nJoin the game at /ball"
        break
      case 3:
        text +=
          "An Epic 747 Spirt of the Crew Plane was in the Ball!\nJoin the game at /ball"
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
  let text = ""

  if (params.tokenId) {
    switch (params.tokenId) {
      case 1:
        text +=
          "A Common 747 Fleet Plane was in the Ball!\nJoin the game at  https://airport.theball.fun"
        break
      case 2:
        text +=
          "A Rare 747 Roll Call Plane was in the Ball!\nJoin the game at  https://airport.theball.fun"
        break
      case 3:
        text +=
          "An Epic 747 Spirt of the Crew Plane was in the Ball!\nJoin the game at  https://airport.theball.fun"
        break
    }
  } else if (params.address) {
    text += `Here's what was in my Ball!\nJoin the game at  https://airport.theball.fun`
  }

  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
}
