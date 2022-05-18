import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useParams} from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Web3 from "web3";
import { fromWei, AbiItem } from "web3-utils";
import Page from 'components/layout/Page'
import { Heading } from 'cashcow-uikit'
import useTheme from 'hooks/useTheme'
import NftFarming from 'config/abi/NftFarming.json'
import CowTokenABI from 'config/abi/cow.json'
import MasterChefABI from 'config/abi/masterchef.json'
import { getNftFarmingAddress, getCowTokenAddress, getMasterChefAddress } from 'utils/addressHelpers'
import StaticCard from './StaticCard'
import CattleCard from './CattleCard'
import LandCard from './LandCard'
import GenesisCard from './GenesisCard'
import HappyCowCard from './HappyCowCard'
import Harvest from './Harvest'
import { LoadingContext } from 'contexts/LoadingContext'
type boxParam = {
  index: string;
};

const DEFAULT_HAPPYCOW_STATUS = [false, false, false, false, false]; 
const StyledHero = styled.div`
    border-bottom: 0px solid #e8e8e8;
    margin-bottom: 20px;
    display: flex;
  `
const Blank = styled.div`
    display: flex;
    flex: auto
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
    const [genesisNftStatus, setGenesisNftStatus] = useState(false)
    const [happyCowStatus, setHappyCowStatus] = useState(DEFAULT_HAPPYCOW_STATUS)
    const [milkPerDay, setMilkPerDay] = useState(0);
    const [milkReward, setMilkReward] = useState("0");
    const farmingContract = new web3.eth.Contract(NftFarming.abi as AbiItem[], getNftFarmingAddress());
    useEffect( () => {
      async function fetchInfo() {
          try {
              setLoading(true);
              const masterChefContract = new web3.eth.Contract(MasterChefABI as AbiItem[], getMasterChefAddress());
              const vMilkPower = await farmingContract.methods.milkPowerOf(account).call();
              const vGameMilkPower = await farmingContract.methods.milkPowerOfGame().call();
              const landTokenIds = await farmingContract.methods.landTokenIdsOf(account).call();
              const cowNFTIds = await farmingContract.methods.cowTokenIdsOf(account).call();
              const bullNFTIds = await farmingContract.methods.bullTokenIdsOf(account).call();
              setMilkPower(vMilkPower);
              setGameMilkPower(vGameMilkPower);
              const rewardAmount = await masterChefContract.methods.pendingMilk(5, getNftFarmingAddress()).call({from: account});
              const _x = parseInt(fromWei(rewardAmount)) * parseInt(vMilkPower) / parseInt(vGameMilkPower);
              setMilkReward(Math.round(_x).toString());
    
              // let userInfo = await masterChefContract.methods.userInfo(5, getNftFarmingAddress()).call({from: account});
              const poolInfo = await masterChefContract.methods.poolInfo(5).call({from:account});
              let milkPerBlock = await masterChefContract.methods.MilkPerBlock().call({ from: account});
              let totalAllocPoint = await masterChefContract.methods.totalAllocPoint().call({ from: account});
    
              let accMilkPerShare = poolInfo.accMilkPerShare;
              let _m = parseInt(fromWei(milkPerBlock));
              let allocpoint = parseInt(poolInfo.allocPoint) ;
              let _t = parseInt(totalAllocPoint);
              let _y = 3600 * 24 *_m * allocpoint / _t/3; //3s per block
    
              if(parseInt(vGameMilkPower) === 0) {
                setMilkPerDay(0);
              } else {
                const vMilkPerDay = _y * parseInt(vMilkPower) / parseInt(vGameMilkPower);
                console.log(vMilkPerDay);
                setMilkPerDay( parseInt(vMilkPerDay.toString()) );
              }
    
    
              setCowAmount(cowNFTIds);
              setBullAmount(bullNFTIds);
              if(landTokenIds) {
                console.log("AAA")
                setLandAmount(landTokenIds);
              }
              setLoading(false);
            } catch(error) {
              setLoading(false);
          } 
      }

      fetchInfo();
    },[account])

    /* useEffect( () => {
      async function fetchGenesisInfo() {
          
          const contractInstance = new web3.eth.Contract(AirNft.abi as AbiItem[], getAirNftAddress());

          const promises = []
          for (let i = 0; i < GENESIS_NFT_IDS.length;i ++) {
              promises.push(contractInstance.methods.ownerOf(GENESIS_NFT_IDS[i]).call())
          }
          const nftOwners = await Promise.all(promises)
          for (let i = 0; i < GENESIS_NFT_IDS.length;i ++) {
            if(nftOwners[i] === account) {
              setGenesisNftStatus(true);
              return;
            }
          }
          setGenesisNftStatus(false)
      }

      fetchGenesisInfo();
    },[account])

    useEffect( () => {
      async function fetchHappyCowInfo() {
          
          const contractInstance = new web3.eth.Contract(HappyCows.abi as AbiItem[], getHappyCowAddress());

          const promises = []
          for (let i = 0; i < HAPPY_COW_BREEDS.length;i ++) {
              promises.push(contractInstance.methods.ownerOf(i+1).call())
          }
          const nftOwners = await Promise.all(promises)
          const hcs = [false, false, false, false, false]; 
          for (let i = 0; i < HAPPY_COW_BREEDS.length;i ++) {
            if(nftOwners[i] === account) {
              hcs[HAPPY_COW_BREEDS[i]] = true;
            }
          }
          setHappyCowStatus(hcs)
      }

      fetchHappyCowInfo();
    },[account]) */

    useEffect( () => {
      async function fetchCowTokenInfo() {
          const contractInstance = new web3.eth.Contract(CowTokenABI as AbiItem[], getCowTokenAddress());
          const tokenAmount = await contractInstance.methods.balanceOf(account).call()
          setCowTokenAmount(fromWei(tokenAmount, "Gwei"));
      }

      fetchCowTokenInfo();
    },[account])
    return (
        <Page style={{
            backgroundImage: isDark ? `url(/images/cow/home-backgrounddark.png)` : `url(/images/cow/home-backgroundlight.png)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',}}
        >
          <StyledHero>
            <Heading as="h1" size="lg" color="secondary" mb="20px" style={{color: isDark ? "white" : ''}}>
              My Farm Dashboard
            </Heading>
            <Blank />
            <Harvest title = "MILK REWARD" value = {milkReward} />
          </StyledHero>
          <CardContainer>
            <StaticCard title='MY MILKPOWER' value={milkPower.toString()}/>
            <StaticCard title='TOTAL MILKPOWER' value={gameMilkPower.toString()}/>
            <StaticCard title='MY MILK/DAY' value={milkPerDay.toString()}/>
            <LandCard title='MY LANDS' value={landAmount.length.toString()} tokenIds = {landAmount}/>
            <CattleCard title='MY COWS' value={cowAmount.length.toString()} tokenIds = {cowAmount} isCowNFT = {true}/>
            <CattleCard title='MY BULLS' value={bullAmount.length.toString()} tokenIds = {bullAmount} isCowNFT = {false}/>
            <GenesisCard title='GENESIS NFT' hasGenesisNft={genesisNftStatus}/>
            <HappyCowCard title='HAPPY COW' value={happyCowStatus}/>
            <StaticCard title='$COW IN WALLET' value={cowTokenAmount}/>
          </CardContainer>
        </Page>
    )
}

export default FarmDashboard
