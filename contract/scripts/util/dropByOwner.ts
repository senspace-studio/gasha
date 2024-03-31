import { parseEther } from 'ethers'
import { ethers } from 'hardhat'

// 0x566e76dBE103f2D0AE2167D66dB69e79D804878b DONE
// 0xf353902d16faEA71aC3aE4EbEA7C241A62DdC1c7 DONE
// 0xCf3B35077E9E8a64654B2C0b67cDeF5cE2ae34f0 DONE
// 0x82a37593514485dc2a0AdD90B858Db01902849a8 DONE
// 0x68856c1Fb2525E65bFB3F945E2041E24ea373C21 DONE
// 0x376E451F04863508A7dCE0B993354520e9acEe71 DONE

const main = async () => {
  const to = '0x376E451F04863508A7dCE0B993354520e9acEe71'
  const Gasha = await ethers.getContractAt(
    'Gasha',
    '0x96E9215696733f7AD091A3D2437dAf892eF296C8'
  )

  const activeTokens = await Gasha.activeSeriesItems()

  const dropList: any = { '1': 0, '2': 0, '3': 0 }

  // 30 times
  for (let i = 0; i < 30; i++) {
    const totalWeight = activeTokens.reduce(
      (acc, item) => acc + Number(item.weight),
      0
    )
    let randomNumber = Math.random() * totalWeight

    let tokenId!: string
    for (const item of activeTokens) {
      randomNumber -= Number(item.weight)
      if (randomNumber <= 0) {
        tokenId = String(item.tokenId)
        break
      }
    }
    dropList[tokenId]++
  }

  Gasha.dropByOwner(
    to,
    [1, 2, 3],
    [dropList['1'], dropList['2'], dropList['3']],
    {
      value: parseEther(String(0.000777 * 30)),
    }
  )
}

main()
