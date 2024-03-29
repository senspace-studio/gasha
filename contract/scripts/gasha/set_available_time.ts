import { ethers } from 'hardhat'

const main = async () => {
  const gashaContract = await ethers.getContractAt(
    'Gasha',
    '0x96E9215696733f7AD091A3D2437dAf892eF296C8'
  )

  // let tx = await gashaContract.setAvailableTime(1711639025, 1811640405)
  let tx = await gashaContract.setAvailableTime(1711000000, 1712300400)
  await tx.wait()

  console.log('Set Available Time')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
