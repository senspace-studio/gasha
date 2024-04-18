import { ethers } from "hardhat"

export const main = async () => {
  const forwarderContract = await ethers.getContractAt(
    "Forwarder",
    "0x7aAF741bdF46013E5c4a03a6D91DD8d73adffE0F"
  )
  const gashaContract = await ethers.getContractAt(
    "Gasha",
    "0x4f3EA4D855c6e33C73DDEBE551F7C8651e6A09B3"
  )

  let tx = await forwarderContract.setOperator(
    "0xe79B0AF60EECd70eb738C113734483D9D14959Ae",
    true
  )
  await tx.wait()

  tx = await gashaContract.setOperator(
    "0xe79B0AF60EECd70eb738C113734483D9D14959Ae",
    true
  )
  await tx.wait()
}
