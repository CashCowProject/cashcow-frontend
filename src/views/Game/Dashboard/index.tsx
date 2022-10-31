import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useParams} from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Web3 from "web3";
import { fromWei, AbiItem } from "web3-utils";
import Page from 'components/layout/Page'
import { Heading } from 'cashcow-uikit'
import useTheme from 'hooks/useTheme'
import NftFarming from 'config/abi/NftFarming.json'
import NftFarmingV2 from 'config/abi/NftFarmingV2.json'
import CowTokenABI from 'config/abi/cow.json'
import HappyCows from 'config/abi/HappyCows.json'
import happyCowBreeds from 'config/constants/happycowbreeds'
import MasterChefABI from 'config/abi/masterchef.json'
import {getHappyCowAddress, getNftFarmingAddress, getCowTokenAddress, getMasterChefAddress } from 'utils/addressHelpers'
import StaticCard from './StaticCard'
import StakedCowTokenCard from './StakedCowTokenCard'
import CattleCard from './CattleCard'
import LandCard from './LandCard'
import GenesisCard from './GenesisCard'
import HappyCowCard from './HappyCowCard'
import Harvest from './Harvest'
import { LoadingContext } from 'contexts/LoadingContext'

import useRewardAmountQuery from 'hooks/useRewardAmountQuery'
type boxParam = {
  index: string;
};

const DEFAULT_HAPPYCOW_STATUS = [false, false, false, false, false];

const StyledHero = styled.div`
    border-bottom: 0px solid #e8e8e8;
    margin-bottom: 20px;
    background-color: rgb(11,51,75);
    padding: 10px;
    // width: 100%;
    height: 30%;
    display: flex;
    overflow: hidden;
    border-radius: 25px;
    align-items: center;
    @media (max-width: 768px) {
      height: 10%;
      width: 90%;
      min-width: 100px;
      justify-content: space-around;
    }
`
const Blank = styled.div`
    display: flex;
    flex: auto
`
const HomeButton = styled.div`
    margin-left: 20px;
    background-image: url(/images/farms/dashboard/buttons/botonmapgris.png);
    background-repeat: no-repeat;
    width: 80px;
    height: 70px;
    background-size: contain;
    cursor:pointer;
    &:hover {
      background-image: url(/images/farms/dashboard/buttons/botonmapverde.png);
    }
    // height: 30%;
    @media (max-width: 768px) {
      height: 60px;
      width: 70px;
      margin-left:5px;
      min-width: 10px;
    }
`
const VideoContainer = styled.div`
  display: flex;
  flex: auto;
  height: 130px;
  margin-left: 10px;
  @media (max-width: 768px) {
    height: 40px;
    margin-left:2px;
    display: none;
  }
`

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: auto auto auto;
  flex-wrap: wrap;
  & > * {
    min-width: 270px;
    max-width: 31.5%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
    
  }
  `
const web3 = new Web3(Web3.givenProvider);
const FarmDashboard = () => {
    const { account, connect } = useWallet()
    const { setLoading } = useContext(LoadingContext)
    const { index } = useParams<boxParam>();
    const { isDark } = useTheme();
    const [milkPower, setMilkPower] = useState(0)
    const [gameMilkPower, setGameMilkPower] = useState(0)
    const [landAmount, setLandAmount] = useState([])
    const [cowAmount, setCowAmount] = useState([])
    const [bullAmount, setBullAmount] = useState([])
    const [cowTokenAmount, setCowTokenAmount] = useState("0")
    const [genesisNftStatus, setGenesisNftStatus] = useState(true)
    const [happyCowStatus, setHappyCowStatus] = useState(DEFAULT_HAPPYCOW_STATUS)
    const [milkPerDay, setMilkPerDay] = useState(0);
    const [milkReward, setMilkReward] = useState("0");
    const farmingContract = new web3.eth.Contract(NftFarmingV2.abi as AbiItem[], getNftFarmingAddress());
    const history = useHistory();

    const userReward = useRewardAmountQuery({account});

    console.log(userReward)

    useEffect( () => {
      async function fetchInfo() {
          try {
              setLoading(true);
              console.log('Fetching info..')
              const masterChefContract = new web3.eth.Contract(MasterChefABI as AbiItem[], getMasterChefAddress());
              const vMilkPower = await farmingContract.methods.milkPowerOf(account).call({ from: account});
              const vGameMilkPower = await farmingContract.methods.totalMilkPower().call();
              // FIXME: Updated function dev@topospec
              // const vGameMilkPower = 0;
              const landTokenIds = await farmingContract.methods.landTokenIdsOf(account).call();
              const cowNFTIds = await farmingContract.methods.cowTokenIdsOf(account).call();
              console.log(cowNFTIds)
              const bullNFTIds = await farmingContract.methods.bullTokenIdsOf(account).call();
              setMilkPower(vMilkPower);
              setGameMilkPower(vGameMilkPower);
              if(vGameMilkPower != 0) {
                const _dailyAmount = await farmingContract.methods.getUserDailyMilk().call({ from: account});
                setMilkPerDay( parseInt(fromWei(_dailyAmount)) );
                console.log('Updating..')
              }
              const userCowStaked = await farmingContract.methods.stakedCowOf(account).call({ from: account });
              setCowTokenAmount((userCowStaked/10**9).toFixed(1));
    
              setCowAmount(cowNFTIds);
              setBullAmount(bullNFTIds);
              if(landTokenIds) {
                setLandAmount(landTokenIds);
              }
              setLoading(false);
            } catch(error) {
              console.log(error)
              setLoading(false);
          } 
      }

      fetchInfo();
    },[account])

    return (
        <Page style={{
            backgroundImage: isDark ? `url(/images/farm_background_dark.png)` : `url(/images/farm_background.png)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',}}
        >
          <StyledHero>
            <HomeButton onClick = {e => history.push('/farm/map')}/>
            <VideoContainer>
              <video autoPlay style = {{width: '100%', height: '100%'}} muted loop src='/images/farms/dashboard/illustrations/DASHBOARD.mp4'></video>
            </VideoContainer>
            <Harvest title = "MILK REWARD" value = {userReward.data?userReward.data.toString():"0"} />
          </StyledHero>
          <CardContainer>
            <StaticCard title='My MilkPower' value={milkPower.toString()} image = "/images/farms/dashboard/illustrations/milkpowrazul.png" />
            <StaticCard title='Total MilkPower' value={gameMilkPower.toString()} image = "/images/farms/dashboard/illustrations/milkpowrmorado.png" />
            <StaticCard title='My $MILK / Day' value={milkPerDay.toString()} image = "/images/farms/dashboard/illustrations/tokensmilkfondo.png" />
            <LandCard title='My Lands' value={landAmount.length.toString()} tokenIds = {landAmount}/>
            <CattleCard title='My Cows' value={cowAmount.length.toString()} tokenIds = {cowAmount} isCowNFT = {true}/>
            <CattleCard title='My Bulls' value={bullAmount.length.toString()} tokenIds = {bullAmount} isCowNFT = {false}/>
            <GenesisCard title='Genesis NFT' hasGenesisNft={genesisNftStatus}/>
            <HappyCowCard title='Happy Cows' value={happyCowStatus}/>
            <StakedCowTokenCard title='$COW Staked' value={cowTokenAmount} image = "/images/farms/dashboard/illustrations/tokenscowfondo.png" />
          </CardContainer>
        </Page>
    )
}

export default FarmDashboard
