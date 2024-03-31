import { unparse } from 'papaparse'
import fs from 'fs'

const address = '0xb5d00e222daad1b3030a6a1d0ce5f2edd8de7fd0'

const main = async () => {
  let { items, next_page_params } = await getData()
  while (next_page_params !== null) {
    const { items: newItems, next_page_params: newNextPageParams } =
      await getData(next_page_params.block_number, next_page_params.index)
    items.push(...newItems)
    next_page_params = newNextPageParams
    // sleep 1sec
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
  const data = items
    .filter(
      (item: any) =>
        item.from.hash === '0x0000000000000000000000000000000000000000'
    )
    .map((item: any) => {
      return {
        contract_address: address,
        minter_address: item.to.hash,
        token_id: item.total.token_id,
        amount: item.total.value,
        timestamp: item.timestamp,
      }
    })

  console.log(
    // total of amount
    data.reduce((acc: number, item: any) => acc + Number(item.amount), 0)
  )

  // parse data to csv and save
  const csv = unparse(data, { header: true })
  fs.writeFileSync(`${address}.csv`, csv)
}

const getData = async (block_number?: number, index?: number) => {
  let apiURL = `https://explorer.zora.energy/api/v2/tokens/${address}/transfers`
  if (block_number && index) {
    apiURL = apiURL + `?block_number=${block_number}&index=${index}`
  }

  const { items, next_page_params } = await fetch(apiURL).then((response) =>
    response.json()
  )

  return { items, next_page_params }
}

main()
