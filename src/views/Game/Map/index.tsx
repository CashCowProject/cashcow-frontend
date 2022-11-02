import React, { useState, useEffect, useContext } from 'react'
import styled, { keyframes } from 'styled-components';
import { useParams } from 'react-router-dom'
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
import { getHappyCowAddress, getNftFarmingAddress, getCowTokenAddress, getMasterChefAddress } from 'utils/addressHelpers'
import { LoadingContext } from 'contexts/LoadingContext'

import useRewardAmountQuery from 'hooks/useRewardAmountQuery'

type boxParam = {
  index: string;
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const FrameDiv = styled.div`
    top: 0;
    left: 0;
    width: 90%;
    margin-top: 90%;
    margin-left: auto; 
    margin-right: auto; 
`

const InsideFrameContent = styled.img`
    position: absolute;
    top: 7%;
    left: 3%;
    width: 65%;
    margin-top: 2%;
    margin-left: 5%;
  `

const FrameImage = styled.img`
    position: absolute;
    top: 0;
    width: 80%;
    margin-top: 2%;
    left: 0;
    right: 0;
    margin-left: auto; 
    margin-right: auto; 
  `

const VideoContainer = styled.video`
    position: absolute;
    top: 10%;
    width: 65%;
    left: 0;
    right: 0;
    margin-left: auto; 
    margin-right: 24%; 
  `

const MarketplaceLink = styled.img`
    position: absolute;
    top: 23%;
    left: 60%;
    width: 12%;
    cursor: pointer;
    animation: ${fadeIn} 1s linear;
  `

const MyNftsLink = styled.img`
    position: absolute;
    top: 39%;
    left: 48%;
    width: 12%;
    cursor: pointer;
    animation: ${fadeIn} 1s linear;
  `

const MyDashboardLink = styled.img`
    position: absolute;
    top: 18%;
    left: 40%;
    width: 12%;
    cursor: pointer;
    animation: ${fadeIn} 1s linear;
  `

const ManageLink = styled.img`
    position: absolute;
    top: 48%;
    left: 26%;
    width: 15%;
    cursor: pointer;
    animation: ${fadeIn} 1s linear;
  `

const BreedLink = styled.img`
    position: absolute;
    top: 18%;
    left: 17%;
    width: 15%;
    cursor: pointer;
    animation: ${fadeIn} 1s linear;
  `

const web3 = new Web3(Web3.givenProvider);

const Map = () => {
  const { account, connect } = useWallet()
  const { setLoading } = useContext(LoadingContext)
  const { isDark } = useTheme();

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setLoading(true)
  }, [])

  return (
    <Page style={{
      backgroundImage: isDark ? `url(/images/farm_background_dark.png)` : `url(/images/farm_background.png)`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}
    >
      <FrameDiv>

        <VideoContainer 
          autoPlay 
          muted 
          onLoadedData={() => setLoading(false)} 
          onEnded={() => setPlaying(true)}
          >
          <source src="/images/map/mapa2_2.mp4" type="video/mp4" />
        </VideoContainer>

        <FrameImage src="/images/map/pantalla-horizontal.png" />

        {playing ? <>
          <MarketplaceLink src="/images/map/icons/marketplace.png" />
          <MyNftsLink src="/images/map/icons/mynft.png" />
          <MyDashboardLink src="/images/map/icons/mydashboard.png" />
          <ManageLink src="/images/map/icons/myfarm.png" />
          <BreedLink src="/images/map/icons/breed.png" />
        </> : <></>}


      </FrameDiv>
    </Page>
  )
}

export default Map
