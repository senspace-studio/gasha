import { ethers } from 'hardhat'

const main = async () => {
  const gashaContract = await ethers.getContractAt(
    'Gasha',
    '0xa55410B75578c8941a76249C18c72167459253c7'
  )

  let tx = await gashaContract.setAvailableTime(1711639025, 1711640405)
  await tx.wait()

  console.log('Set Available Time')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
