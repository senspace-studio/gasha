import { ethers } from 'hardhat'

const main = async () => {
  const gashaContract = await ethers.getContractAt(
    'Gasha',
    '0xcFFDfafda3873eCA81365F66d6550D63bBB46645'
  )

  let tx = await gashaContract.activateSeriesItem(1)
  await tx.wait()
  tx = await gashaContract.activateSeriesItem(2)
  await tx.wait()
  tx = await gashaContract.activateSeriesItem(3)
  await tx.wait()

  console.log('Activated series items')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
