import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import {Link, useParams} from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Web3 from "web3";
import { fromWei, toWei, AbiItem, toBN } from "web3-utils";
import Page from 'components/layout/Page'
import { Heading } from 'cashcow-uikit'
import useTheme from 'hooks/useTheme'
import NftSale from 'config/abi/NftSale.json'
import NftFarming from 'config/abi/NftFarming.json'
import { getNftSaleAddress, getNftFarmingAddress } from 'utils/addressHelpers'
import StaticCard from './StaticCard'
import NftsCard from './NftsCard'
import GenesisCard from './GenesisCard'
import HappyCowCard from './HappyCowCard'

type boxParam = {
  index: string;
};

const StyledHero = styled.div`
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 20px;
  `

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 270px;
    max-width: 31.5%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
  `

const FarmDashboard = () => {
    const { account, connect } = useWallet()
    const { index } = useParams<boxParam>();
    const { isDark } = useTheme();
    const [milkPower, setMilkPower] = useState(0)
    const [gameMilkPower, setGameMilkPower] = useState(0)
    const [landAmount, setLandAmount] = useState(0)
    const [cowAmount, setCowAmount] = useState(0)
    const [bullAmount, setBullAmount] = useState(0)
    const [cowTokenAmount, setCowTokenAmount] = useState(0)
    const [genesisNftStatus, setGenesisNftStatus] = useState(false)

    useEffect( () => {
      async function fetchInfo() {
          const web3 = new Web3(Web3.givenProvider);
          const farmingContract = new web3.eth.Contract(NftFarming.abi as AbiItem[], getNftFarmingAddress());
          const vMilkPower = await farmingContract.methods.milkPowerOf(account).call();
          const vGameMilkPower = await farmingContract.methods.milkPowerOfGame().call();
          setMilkPower(vMilkPower);
          setGameMilkPower(vGameMilkPower);
      }

      fetchInfo();
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
          </StyledHero>
          <CardContainer>
            <StaticCard title='MY MILKPOWER' value={milkPower.toString()}/>
            <StaticCard title='TOTAL MILKPOWER' value={gameMilkPower.toString()}/>
            <StaticCard title='MY MILK/DAY' value='1500'/>
            <NftsCard title='MY LANDS' value='2'/>
            <NftsCard title='MY COWS' value='20'/>
            <NftsCard title='MY BULLS' value='1'/>
            <GenesisCard title='GENESIS NFT' genesisNftStatus/>
            <HappyCowCard title='HAPPY COW' value='1'/>
            <StaticCard title='$COW IN WALLET' value='1'/>
          </CardContainer>
        </Page>
    )
}

export default FarmDashboard
