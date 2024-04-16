import { ethers, upgrades } from "hardhat"
import { Ball } from "../../typechain-types"

export const deployBallContract = async (initialOwner: string) => {
  const ballFactory = await ethers.getContractFactory("Ball")

  const ball = (await upgrades.deployProxy(
    ballFactory,
    [initialOwner, "BALL", "BALL", 18],
    {
      initializer: "initialize",
    }
  )) as any as Ball

  await ball.waitForDeployment()

  return ball
}
