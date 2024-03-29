import { ethers } from 'hardhat'

const main = async () => {
  const gashaContract = await ethers.getContractAt(
    'Gasha',
    '0xcFFDfafda3873eCA81365F66d6550D63bBB46645'
  )

  let tx = await gashaContract.setAvailableTime(1711639025, 1811640405)
  // let tx = await gashaContract.setAvailableTime(1711720800, 1712300400)
  await tx.wait()

  console.log('Set Available Time')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
