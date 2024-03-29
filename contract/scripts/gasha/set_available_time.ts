import { ethers } from 'hardhat'

const main = async () => {
  const gashaContract = await ethers.getContractAt(
    'Gasha',
    '0x51410f51EB90846b08159ec24d2E164b077aD00e'
  )

  let tx = await gashaContract.setAvailableTime(1711639025, 1811640405)
  await tx.wait()

  console.log('Set Available Time')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
