import { useQuery } from 'react-query';
import NftFarming from 'config/abi/NftFarming.json'
import Web3 from "web3";
import { getNftFarmingAddress, getCowTokenAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { fromWei, AbiItem } from "web3-utils";
import { useWallet } from '@binance-chain/bsc-use-wallet'
const web3 = new Web3(Web3.givenProvider);
const farmingContract = new web3.eth.Contract(NftFarming.abi as AbiItem[], getNftFarmingAddress());

const fetchUserReward = async (account) =>{
    console.log("address", account)
    const _rewardAmount = await farmingContract.methods.getUserRewardAmount().call({ from: account})
    console.log(Math.round(parseInt(fromWei(_rewardAmount))).toString())
    return Math.round(parseInt(fromWei(_rewardAmount))).toString()
}
const useRewardAmountQuery = ({account}) => {
  const rewardAmountQuery = useQuery(
    ['reward-amount', account], 
    ()=>fetchUserReward(account),
    {
      refetchInterval: 5000
    });

  return rewardAmountQuery;
};

export default useRewardAmountQuery;
