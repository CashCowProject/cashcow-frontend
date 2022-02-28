import addresses from 'config/constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID

export const getCakeAddress = () => {
  return addresses.cake[chainId]
}
export const getMasterChefAddress = () => {
  return addresses.masterChef[chainId]
}
export const getMulticallAddress = () => {
  return addresses.mulltiCall[chainId]
}
export const getWbnbAddress = () => {
  return addresses.wbnb[chainId]
}
export const getLotteryAddress = () => {
  return addresses.lottery[chainId]
}
export const getLotteryTicketAddress = () => {
  return addresses.lotteryNFT[chainId]
}
export const getMilkAddress = () => {
  return addresses.milk[chainId]
}
export const getMarketAddress = () => {
  return addresses.market[chainId]
}
export const getHappyCowAddress = () => {
  return addresses.happycow[chainId]
}
export const getAirNftAddress = () => {
  return addresses.airnft[chainId]
}
export const getStakingAddress = () => {
  return addresses.staking[chainId]
}