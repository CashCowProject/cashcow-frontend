import React, { useState, useEffect, useContext } from 'react'
import styled, { keyframes } from 'styled-components';
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Web3 from "web3";
import Page from 'components/layout/Page'
import useTheme from 'hooks/useTheme'
import { LoadingContext } from 'contexts/LoadingContext'

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

// @media (max-width: 768px) {
//   height: 10%;
//   width: 90%;
//   min-width: 100px;
//   justify-content: space-around;
// }

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
    @media (max-width: 750px) {
      width: 80%;
    }
  `

const VideoContainer = styled.video`
    position: absolute;
    top: 10%;
    width: 65%;
    left: 0;
    right: 0;
    margin-left: auto; 
    margin-right: 24%; 
    @media (max-width: 750px) {
      top: 3%;
      width: 73%;
      left: 15%;
      margin-left: unset; 
    }
  `

const MarketplaceLink = styled.img`
    position: absolute;
    top: 23%;
    left: 60%;
    width: 12%;
    cursor: pointer;
    animation: ${fadeIn} 1s linear;
    transition: all 1s;
    &:hover { transform: scale(1.07); }
    @media (max-width: 750px) {
      top: 10%;
      left: 70%;
    }
  `

const MyNftsLink = styled.img`
    position: absolute;
    top: 39%;
    left: 48%;
    width: 12%;
    cursor: pointer;
    animation: ${fadeIn} 1s linear;
    transition: all 1s;
    &:hover { transform: scale(1.07); }
    @media (max-width: 750px) {
      top: 23%;
      left: 55%;
    }
  `

const MyDashboardLink = styled.img`
    position: absolute;
    top: 18%;
    left: 40%;
    width: 12%;
    cursor: pointer;
    animation: ${fadeIn} 1s linear;
    transition: all 1s;
    &:hover { transform: scale(1.07); }
    @media (max-width: 750px) {
      top: 9%;
      left: 45%;
    }
  `

const ManageLink = styled.img`
    position: absolute;
    top: 48%;
    left: 26%;
    width: 15%;
    cursor: pointer;
    animation: ${fadeIn} 1s linear;
    transition: all 1s;
    &:hover { transform: scale(1.07); }
    @media (max-width: 750px) {
      top: 25%;
      left: 36%;
    }
  `

const BreedLink = styled.img`
    position: absolute;
    top: 18%;
    left: 17%;
    width: 15%;
    cursor: pointer;
    animation: ${fadeIn} 1s linear;
    transition: all 1s;
    &:hover { transform: scale(1.07); }
    @media (max-width: 750px) {
      top: 10%;
      left: 18%;
    }
  `

const FirstButton = styled.img`
    position: absolute;
    top: 30%;
    left: 82.5%;
    width: 4%;
`

const SecondButton = styled.img`
    position: absolute;
    top: 36%;
    left: 82.5%;
    width: 4%;
`

const ThirdButton = styled.img`
    position: absolute;
    top: 42%;
    left: 82.5%;
    width: 4%;
`

const FourthButton = styled.img`
    position: absolute;
    top: 48%;
    left: 82.5%;
    width: 4%;
`

const FifthButton = styled.img`
    position: absolute;
    top: 54%;
    left: 82.5%;
    width: 4%;
`


const web3 = new Web3(Web3.givenProvider);

const Map = () => {
  const { account, connect } = useWallet()
  const { setLoading } = useContext(LoadingContext)
  const { isDark } = useTheme();

  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setLoading(true)
    console.log(window.innerWidth)
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
          <source 
            src={window.innerWidth > 750 ? "/images/map/mapa2_2.mp4" : "/images/map/MAPAcuadrado.mp4"}
            type="video/mp4" 
            />
        </VideoContainer>

        <FrameImage 
          src={window.innerWidth > 750 ? "/images/map/pantalla-horizontal.png" : "/images/map/tele-movil.png"} 
        />

        {/* Buttons fot TV */}
        <FirstButton src="/images/map/icons/botongris.png" />
        <SecondButton src={playing ? "/images/map/icons/botonverde.png" : "/images/map/icons/botongris.png"} />
        <ThirdButton src="/images/map/icons/botongris.png" />
        <FourthButton src="/images/map/icons/botongris.png" />
        <FifthButton src="/images/map/icons/botongris.png" />

        {playing ? <>
          <MarketplaceLink
            src="/images/map/icons/marketplace.png"
            onClick={() => window.location.href = "/market"}
          />
          <MyNftsLink
            src="/images/map/icons/mynft.png"
            onClick={() => window.location.href = "/myNFTs"}
          />
          <MyDashboardLink
            src="/images/map/icons/mydashboard.png"
            onClick={() => window.location.href = "/farm/dashboard"}
          />
          <ManageLink
            src="/images/map/icons/myfarm.png"
            onClick={() => window.location.href = "/farm/management"}
          />
          <BreedLink
            src="/images/map/icons/breed.png"
            onClick={() => window.location.href = "/farm/breeding"}
          />
        </> : <></>}


      </FrameDiv>
    </Page>
  )
}

export default Map
