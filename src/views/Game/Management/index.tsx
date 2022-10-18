import React, { useState, useEffect, useContext } from 'react'
import styled, { useTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Web3 from "web3";
import NftFarmingV2 from 'config/abi/NftFarmingV2.json'
import HappyCows from 'config/abi/HappyCows.json'
import { fromWei, AbiItem } from "web3-utils";
import Page from 'components/layout/Page'
import FlexLayout from 'components/layout/Flex'
import HappyCowSection from './HappyCowSection/HappyCowSection'
import EachHappyCowCard from './HappyCowSection/EachHappyCowCard'
import './management.css'

const web3 = new Web3(Web3.givenProvider);

const FarmManagement = () => {

  const history = useHistory();
  const { account, connect } = useWallet()

  const DEFAULT_HAPPYCOW_STATUS = [false, false, false, false, false];
  const originalHappyCow = ['holstein', 'highland', 'hereford', 'brahman', 'angus'];

  const temporalFarmingContract = '0x23f1Ef47a0953E8A33982AEB5dde6daB08427544';
  const temporalHappyCowsContract = '0xD220d3E1bab3A30f170E81b3587fa382BB4A6263';
  const temporalFullTokenUriPrefix = "https://cashcowprotocol.mypinata.cloud/ipfs/QmQNivyb2MZzxw1iJ2zUKMiLd4grG5KnzDkd8f5Be7R5hB"

  const [happyCowStatus, setHappyCowStatus] = useState(DEFAULT_HAPPYCOW_STATUS)
  const [happyCowTokenIds, setHappyCowTokenIds] = useState([]);
  const [happyCowUserBreeds, setHappyCowUserBreeds] = useState([]);

  const farmingContract = new web3.eth.Contract(NftFarmingV2.abi as AbiItem[], temporalFarmingContract);
  const happyCowsContract = new web3.eth.Contract(HappyCows.abi as AbiItem[], temporalHappyCowsContract);

  useEffect(() => {
    fetchUserHappyCows();
  }, [account])

  const fetchUserHappyCows = async () => {
    console.log('fetching user happy cows:')
    setHappyCowUserBreeds([]);
    try {
      const userHappyCows = await farmingContract.methods.happyCowsTokenIdsOf(account).call();
      console.log('happy cows: ', userHappyCows);
      // Itero alrededor de los UserHappyCows dev@topospec
      userHappyCows.forEach(async element => {
        const tokenUri = `${temporalFullTokenUriPrefix}/${element}.json`
        console.log('Full token URI: ', tokenUri)
        const fullTokenData = await fetchIndividualHappyCow(tokenUri);
        const currentHappyCowBreed = [{ "tokenId": element, "breed": fullTokenData.attributes[1].value }];
        setHappyCowUserBreeds(oldBreeds => [...oldBreeds, currentHappyCowBreed]);
      });
      console.log(happyCowUserBreeds)
      setHappyCowTokenIds(userHappyCows);
    } catch (error) {
      console.log('error :', error)
    }
  }

  const fetchIndividualHappyCow = async (tokenUri) => {
    try {
      const response = await fetch(tokenUri)
      const json = await response.json()
      return json;
    } catch (e) {
      console.log('error fetching: ', e)
      return e;
    }
  }

  const StyledHero = styled.div`
    border-bottom: 0px solid #e8e8e8;
    margin-bottom: 20px;
    background-color: rgb(11,51,75);
    padding: 10px;
    height: 30%;
    display: flex;
    margin-left: 8px;
    margin-right: 8px;
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

  const nftIndividualData = [
    {
      id: "cow",
      image: 'cows.png',
      title: 'Cows',
      url: '/management/cow',
      tab: 1
    },
    {
      id: "bull",
      image: 'bulls.png',
      title: 'Bulls',
      url: '/management/bull',
      tab: 2
    },
    {
      id: "land",
      image: 'lands.png',
      title: 'Lands',
      url: '/management/land',
      tab: 3
    }
  ]

  const { isDark } = useTheme();
  return (
    <Page
      style={{
        backgroundImage: isDark ? `url(/images/farm_background_dark.png)` : `url(/images/farm_background.png)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <StyledHero>
        <HomeButton onClick={e => history.push('/farm/map')} />
      </StyledHero>

      <FlexLayout>
        {nftIndividualData.map((item) =>
          <div className="cards-mapper">
            <img
              onClick={() => history.push(item.url)}
              className="cards-mapper-image"
              src={`/images/nftindividuals/${item.image}`}
            />
          </div>
        )}
      </FlexLayout>

      <div className="happy-cow-nft-box">
        <div className='happy-cow-nft'>
          <div className='happy-cow-nft-box-left'>
            <HappyCowSection
              title='Happy Cow'
              value={happyCowStatus}
            />
          </div>
          <div className='happy-cow-nft-box-right'>
            {originalHappyCow.map((item, i) =>
              <EachHappyCowCard
                title={item}
                index={i}
                userHappyCow={happyCowUserBreeds[i]}
                fetchUserHappyCows={fetchUserHappyCows}
              />
            )}
          </div>
        </div>
      </div>

    </Page>
  )
}

export default FarmManagement
