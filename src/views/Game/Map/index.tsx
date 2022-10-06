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
import HappyCows from 'config/abi/HappyCows.json'
import happyCowBreeds from 'config/constants/happycowbreeds'
import MasterChefABI from 'config/abi/masterchef.json'
import {getHappyCowAddress, getNftFarmingAddress, getCowTokenAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { LoadingContext } from 'contexts/LoadingContext'

import useRewardAmountQuery from 'hooks/useRewardAmountQuery'
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
const Map = () => {
    const { account, connect } = useWallet()
    const { setLoading } = useContext(LoadingContext)
    const { isDark } = useTheme();
    return (
        <Page style={{
            backgroundImage: isDark ? `url(/images/farm_background_dark.png)` : `url(/images/farm_background.png)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',}}
        >
          <CardContainer>
         
          </CardContainer>
        </Page>
    )
}

export default Map
