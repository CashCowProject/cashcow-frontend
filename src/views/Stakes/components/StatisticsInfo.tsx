import React, {useCallback, useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import { Flex,  BaseLayout } from 'cashcow-uikit'
import Staking from 'config/abi/Staking.json'
import { getStakingAddress} from 'utils/addressHelpers'
import Web3 from "web3";
import { AbiItem } from "web3-utils"
import useI18n from 'hooks/useI18n'
import useTheme from 'hooks/useTheme'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { StakeContext } from 'contexts/StakeContext'
import { Harvest, TotalStaked, MyStaked, TotalRate, MyRate, RatePer } from './StaticComponents'

const StaticInfoCard = styled(BaseLayout)`
  ${({ theme }) => theme.mediaQueries.xs} {
    grid-template-columns: repeat(1, 1fr);
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
  width: 100%;
`
const web3 = new Web3(Web3.givenProvider)
const stakingContract = new web3.eth.Contract(Staking.abi as AbiItem[], getStakingAddress())

const StatisticsInfo = ({index}) => {

  const TranslateString = useI18n()
  const { isDark } = useTheme()
  
  const { account } = useWallet()

  const { selectedNFTS } = useContext(StakeContext)
  
  const [poolInfo, setPoolInfo] = useState({rewardAllMilk: 0, totalStakedCount:0 ,myStakedCount: 0, totalMilkPower: 0, myMilkPower: 0, dailyMilkRate: 0})

  const fetchInfo = useCallback(async ()=>{
    
    const pendingMilk = await stakingContract.methods.getPendingMilk(index, account).call();
    const pool = await stakingContract.methods.pools(index).call();
    const totalStkCount = pool.stakedCount;
    console.log("Totla Staked Count", totalStkCount);
    const tmpTotalMilkPower = await stakingContract.methods.getTotalMilkPower(index).call();
    const tmpMyMilkPower = await stakingContract.methods.getMyMilkPower(index, account).call();
    const tmpDailyMilkRate = await stakingContract.methods.getDailyMilkRate(index).call();
    setPoolInfo({rewardAllMilk: pendingMilk, totalStakedCount: totalStkCount, myStakedCount: selectedNFTS.length, totalMilkPower: tmpTotalMilkPower, myMilkPower: tmpMyMilkPower, dailyMilkRate: tmpDailyMilkRate});
  }, [account, selectedNFTS, index])
  
  useEffect(() => {
    fetchInfo()
  },[fetchInfo])
  const BoxShadow = styled.div`
    background: ${!isDark ? 'white' : '#27262c'};
    box-shadow: 0px 2px 12px -8px ${!isDark ? 'rgba(25, 19, 38, 0.7)' : 'rgba(203, 203, 203, 0.7)'}, 0px 1px 1px ${!isDark ? 'rgba(25, 19, 38, 0.05)' : 'rgba(203, 203, 203, 0.05)'};
    position: relative;
    width: 100%;
  `
  const InfoWrapper = styled.div `
    box-shadow: 0px 2px 12px -8px ${!isDark ? 'rgba(25, 19, 38, 0.7)' : 'rgba(203, 203, 203, 0.7)'}, 0px 1px 1px ${!isDark ? 'rgba(25, 19, 38, 0.05)' : 'rgba(203, 203, 203, 0.05)'};
    width: 100%;
    border-radius: 16px;
    padding: 24px;
  `

  return (
    <BoxShadow style={{borderRadius: '32px', padding: '24px'}}>
      <Flex flexDirection="column" alignItems="cneter">
        <BoxShadow style={{borderRadius: '16px', padding: '24px'}}>
          {TranslateString(10006, index === '1' ? 'NFT Staking Pool (HappyCows)' : 'NFT Staking Pool (Genesis)')}
        </BoxShadow>
        <StaticInfoCard style={{marginTop: "25px"}}>
          <InfoWrapper>
            <Harvest rewardAllMilk={poolInfo.rewardAllMilk} index={index}/>
          </InfoWrapper>
          <InfoWrapper>
            <TotalStaked totalStakedCount={poolInfo.totalStakedCount}/>
          </InfoWrapper>
          <InfoWrapper>
            <MyStaked myStakedCount={poolInfo.myStakedCount}/>
          </InfoWrapper>
          <InfoWrapper>
            <TotalRate totalMilkPower={poolInfo.totalMilkPower}/>
          </InfoWrapper>
          <InfoWrapper>
            <MyRate myMilkPower={poolInfo.myMilkPower}/>
          </InfoWrapper>
          <InfoWrapper>
            <RatePer dailyMilkRate={poolInfo.dailyMilkRate}/>
          </InfoWrapper>
        </StaticInfoCard>
      </Flex>
    </BoxShadow>
  )
}

export default StatisticsInfo