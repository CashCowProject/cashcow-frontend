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
import GenesisSection from './GenesisSection/GenesisSection';
import EachGenesisCard from './GenesisSection/EachGenesisCard';
import { TailSpin } from 'react-loader-spinner'
import { getNftFarmingAddress, getHappyCowAddress } from 'utils/addressHelpers'
import './management.css'
import CowStakingCard from './CowStakingSection/CowStakingCard';
import StaticCard from './CowStakingSection/StaticCard';

const web3 = new Web3(Web3.givenProvider);

const FarmManagement = () => {

  const history = useHistory();
  const { account, connect } = useWallet()

  const DEFAULT_HAPPYCOW_STATUS = [false, false, false, false, false];

  const happyCowOriginalBreeds = [
    {
      "id": 0,
      "name": "holstein"
    },
    {
      "id": 1,
      "name": "highland"
    },
    {
      "id": 2,
      "name": "hereford"
    },
    {
      "id": 3,
      "name": "brahman"
    },
    {
      "id": 4,
      "name": "angus"
    }
  ]

  const temporalFarmingContract = '0x7335A5c716E512FdD13667f04118B162e80345A9';
  const temporalHappyCowsContract = '0xD220d3E1bab3A30f170E81b3587fa382BB4A6263';
  const temporalFullTokenUriPrefix = "https://cashcowprotocol.mypinata.cloud/ipfs/QmQNivyb2MZzxw1iJ2zUKMiLd4grG5KnzDkd8f5Be7R5hB"
  const temporalGenesisUriPrefix = "https://cashcowprotocol.mypinata.cloud/ipfs/QmQNivyb2MZzxw1iJ2zUKMiLd4grG5KnzDkd8f5Be7R5hB"


  const [happyCowStatus, setHappyCowStatus] = useState(DEFAULT_HAPPYCOW_STATUS)
  const [happyCowTokenIds, setHappyCowTokenIds] = useState([]);
  const [happyCowUserBreeds, setHappyCowUserBreeds] = useState([]);
  const [happyCowStakedBreeds, setHappyCowStakedBreeds] = useState([]);

  const [loadingGenesis, setLoadingGenesis] = useState(true);
  const [hasGenesisStaked, setHasGenesisStaked] = useState(false);
  const [genesisTokenId, setGenesisTokenId] = useState(0);
  const [genesisToken, setGenesisToken] = useState([]);

  const farmingContract = new web3.eth.Contract(NftFarmingV2.abi as AbiItem[], getNftFarmingAddress());
  const happyCowsContract = new web3.eth.Contract(HappyCows.abi as AbiItem[], getHappyCowAddress());

  // const farmingContract = new web3.eth.Contract(NftFarmingV2.abi as AbiItem[], temporalFarmingContract);
  // const happyCowsContract = new web3.eth.Contract(HappyCows.abi as AbiItem[], temporalHappyCowsContract);

  useEffect(() => {
    fetchUserHappyCows();
    fetchUserGenesis();
  }, [account])

  const fetchUserHappyCows = async () => {
    // Empty Arrays before continue
    setHappyCowUserBreeds([]);
    setHappyCowStakedBreeds([]);
    // Fetch Staked Happy Cows dev@topospec
    try {
      const userHappyCows = await farmingContract.methods.happyCowTokenIdsOf(account).call();
      console.log('happy cows: ', userHappyCows);
      // Itero alrededor de los UserHappyCows dev@topospec
      userHappyCows.forEach(async element => {
        const tokenUri = `${temporalFullTokenUriPrefix}/${element}.json`
        console.log('Full token URI: ', tokenUri)
        const fullTokenData = await fetchIndividualHappyCow(tokenUri);
        const currentHappyCowBreed = {
          "tokenId": element,
          "breed": fullTokenData.attributes[1].value,
          "breedId": getBreedIdForNft(fullTokenData.attributes[1].value)
        };
        setHappyCowStakedBreeds(stakedBreeds => [...stakedBreeds, fullTokenData.attributes[1].value]);
        setHappyCowUserBreeds(oldBreeds => [...oldBreeds, currentHappyCowBreed]);
      });
      setHappyCowTokenIds(userHappyCows);
    } catch (error) {
      console.log('error :', error)
    }
  }

  const fetchUserGenesis = async () => {
    setLoadingGenesis(true);
    setGenesisToken([])
    try {
      const userGenesis = await farmingContract.methods.genesisTokenIdsOf(account).call();
      if (userGenesis.length > 0) {
        console.log('Genesis Tokens ', userGenesis);
        const tokenUri = `${temporalGenesisUriPrefix}/${userGenesis[0]}.json`
        console.log('Genesis URI ', tokenUri)
        const fullTokenData = await fetchIndividualHappyCow(tokenUri);
        setGenesisToken(fullTokenData);
        setGenesisTokenId(userGenesis[0]);
        setHasGenesisStaked(true);
      } else {
        setGenesisToken([])
        setHasGenesisStaked(false);
      }
      setLoadingGenesis(false);
    } catch (e) {
      console.log(e)
    }

  }

  const getBreedIdForNft = (currentBreed) => {
    switch (currentBreed) {
      case "Holstein":
        return 0;
      case "Highland":
        return 1;
      case "Hereford":
        return 2;
      case "Brahman":
        return 3;
      case "Angus":
        return 4;
      default:
        return "Error";
        break;
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

  const Separator = styled.div`
    padding-top: 100px;
    background-color: transparent;
  `

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
            {happyCowOriginalBreeds.map((item, i) =>
              <EachHappyCowCard
                title={item.name}
                index={i}
                userHappyCow={(happyCowUserBreeds.sort((a, b) => a['breedId'] - b['breedId']))[i]}
                userStakedHappyCows={happyCowUserBreeds.sort((a, b) => a['breedId'] - b['breedId'])}
                fetchUserHappyCows={fetchUserHappyCows}
                happyCowStakedBreeds={happyCowStakedBreeds}
              />
            )}
          </div>
        </div>
      </div>


      <div className="genesis-nft-box">
        <div className='genesis-nft'>
          <div className='genesis-nft-box-left'>

            <GenesisSection />

            {loadingGenesis ? <div className='loading-box'>
              <TailSpin
                height="80"
                width="80"
                color="#334B65"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </div> : <>
              <EachGenesisCard
                genesisToken={genesisToken}
                genesisTokenId={genesisTokenId}
                hasGenesisStaked={hasGenesisStaked}
                fetchUserGenesis={fetchUserGenesis}
              />
            </>}

          </div>
          <div className='genesis-nft-box-right'>
            <StaticCard
              title='$COW In Wallet'
              value={0}
              image="/images/farms/dashboard/illustrations/tokenscowfondo.png"
            />
          </div>
        </div>
      </div>

    </Page>
  )
}

export default FarmManagement
