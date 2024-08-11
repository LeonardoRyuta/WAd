import { get } from "./httpMethods"

export const getNFTs = async (address: string) => {
  return get(`https://base-sepolia.blockscout.com/api/v2/addresses/${address}/nft?type=ERC-721%2CERC-404%2CERC-1155`)
}

export const getAccount = async (address: string) => {
  return get(`https://base-sepolia.blockscout.com/api/v2/addresses/${address}`)
}