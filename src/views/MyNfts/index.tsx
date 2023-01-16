import _ from 'lodash'
import React, { useEffect, useState, useMemo, useContext, useCallback } from 'react'
import styled, { useTheme } from 'styled-components'
import { Link } from 'react-router-dom'
import { Button, Heading } from 'cashcow-uikit'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Page from 'components/layout/Page'
import AirNfts from 'config/abi/AirNft.json'
import Genesis from 'config/abi/Genesis.json'
import CowNFT from 'config/abi/CowNFT.json'
import BullNFT from 'config/abi/BullNFT.json'
import LandNFT from 'config/abi/LandNFT.json'
import HappyCows from 'config/abi/HappyCows.json'
import Market from 'config/abi/Market.json'
import airNFTs from 'config/constants/airnfts'
import EachNft from './components/EachNft'
import { LoadingContext } from 'contexts/LoadingContext'
import Select from 'components/Select/Select'
import {
  getHappyCowAddress,
  getMarketAddress,
  getAirNftAddress,
  getCowNftAddress,
  getBullNftAddress,
  getLandNftAddress
} from 'utils/addressHelpers'
import toast from 'react-hot-toast'

const filterByCollection = [
  { label: 'All NFTs', value: { field: 'All', direction: 'asc', collection: '' } },
  { label: 'HappyCows', value: { field: 'HappyCows', direction: 'desc', collection: getHappyCowAddress() } },
  { label: 'Genesis', value: { field: 'airnft', direction: 'asc', collection: getAirNftAddress() } },
  { label: 'Land', value: { field: 'land', direction: 'asc', collection: getLandNftAddress() } },
  { label: 'Cow', value: { field: 'cow', direction: 'asc', collection: getCowNftAddress() } },
  { label: 'Bull', value: { field: 'bull', direction: 'asc', collection: getBullNftAddress() } },
]

// 0 = Highland
// 1 = Holstein
// 2 = Hereford
// 3 = Brahman
// 4 = Angus

const filterByBreed = [
  { label: 'All Breeds', value: { field: 'All', direction: 'asc', collection: '' } },
  { label: 'Highlands', value: { field: 'Highlands', direction: 'asc', collection: '' } },
  { label: 'Holstein', value: { field: 'Holstein', direction: 'asc', collection: '' } },
  { label: 'Hereford', value: { field: 'Hereford', direction: 'asc', collection: '' } },
  { label: 'Brahman', value: { field: 'Brahman', direction: 'asc', collection: '' } },
  { label: 'Angus', value: { field: 'Angus', direction: 'asc', collection: '' } },
]

const filterByType = [
  { label: 'All Types', value: { field: 'All', direction: 'asc', collection: '' } },
  { label: 'Hills', value: { field: 'Hills', direction: 'asc', collection: '' } },
  { label: 'Jungle', value: { field: 'Jungle', direction: 'asc', collection: '' } },
  { label: 'Mountains', value: { field: 'Mountains', direction: 'asc', collection: '' } },
  { label: 'Plains', value: { field: 'Plains', direction: 'asc', collection: '' } },
  { label: 'Woods', value: { field: 'Woods', direction: 'asc', collection: '' } },
]

const filterByRarity = [
  { label: 'All Rarity', value: { field: 'All', direction: 'asc', collection: '' } },
  { label: 'Common', value: { field: 'Common', direction: 'asc', collection: '' } },
  { label: 'Uncommon', value: { field: 'Uncommon', direction: 'asc', collection: '' } },
  { label: 'Rare', value: { field: 'Rare', direction: 'asc', collection: '' } },
  { label: 'Legendary', value: { field: 'Legendary', direction: 'asc', collection: '' } },
  { label: 'Holy', value: { field: 'Holy', direction: 'asc', collection: '' } },
]

const StyledHero = styled.div`
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 20px;
  display: flex;
`
const LeftHeader = styled.div`
  display: flex;
  width: 43%;
`
const Blank = styled.div`
  display: flex;
  flex: auto;
`
const RightHeader = styled.div`
  display: flex;
  // flex: 3;
  width: 150px;
  justify-content: end;
`
const NftItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`

const web3 = new Web3(Web3.givenProvider)

const MyNfts = () => {
  const { account } = useWallet()
  const [myTokens, setMyTokens] = useState([])
  const [myFilteredTokens, setMyFilteredTokens] = useState([]);
  const [filteredBreed, setFilteredBreed] = useState([]);
  const { isDark } = useTheme();
  const { setLoading } = useContext(LoadingContext)
  const [allNfts, setAllNfts] = useState([]);
  const [filteredCollection, setFilteredCollection] = useState();
  // 
  const [collectionFilter, setCollectionFilter] = useState({ label: 'All NFTs', value: { field: 'All', direction: 'asc', collection: '' } });
  const [breedFilter, setBreedFilter] = useState({ label: 'All Breeds', value: { field: 'All', direction: 'asc', collection: '' } });
  const [rarityFilter, setRarityFilter] = useState({ label: 'All Rarity', value: { field: 'All', direction: 'asc', collection: '' } });
  // 
  const happyCowsContract = useMemo(() => {
    return new web3.eth.Contract(HappyCows.abi as AbiItem[], getHappyCowAddress())
  }, [])

  const marketContract = useMemo(() => {
    return new web3.eth.Contract(Market.abi as AbiItem[], getMarketAddress())
  }, [])

  const airnftContract = useMemo(() => {
    return new web3.eth.Contract(AirNfts.abi as AbiItem[], getAirNftAddress())
  }, [])

  const genesisContract = new web3.eth.Contract(Genesis.abi as AbiItem[], getAirNftAddress());

  const cownftContract = useMemo(() => {
    return new web3.eth.Contract(CowNFT.abi as AbiItem[], getCowNftAddress())
  }, [])
  
  const bullnftContract = useMemo(() => {
    return new web3.eth.Contract(BullNFT.abi as AbiItem[], getBullNftAddress())
  }, [])
  const landnftContract = useMemo(() => {
    return new web3.eth.Contract(LandNFT.abi as AbiItem[], getLandNftAddress())
  }, [])

  const getTokenHashes = useCallback(async () => {
    setLoading(true);
    const tmpMyTokens = []
    const happyCowTokens = await happyCowsContract.methods.fetchMyNfts().call({ from: account })
    const tokenIds = []
    _.map(happyCowTokens, (itm) => {
      tokenIds.push({ tokenId: itm, collection: getHappyCowAddress() })
    })

    const cowTokens = await cownftContract.methods.tokenIdsOf(account).call({ from: account })
    _.map(cowTokens, (itm) => {
      tokenIds.push({ tokenId: itm, collection: getCowNftAddress() })
    })
    const bullTokens = await bullnftContract.methods.tokenIdsOf(account).call({ from: account })
    _.map(bullTokens, (itm) => {
      tokenIds.push({ tokenId: itm, collection: getBullNftAddress() })
    })
    const landTokens = await landnftContract.methods.tokenIdsOf(account).call({ from: account })
    _.map(landTokens, (itm) => {
      tokenIds.push({ tokenId: itm, collection: getLandNftAddress() })
    })
    const userGenesis = await genesisContract.methods.fetchMyNfts().call({ from: account });
    userGenesis.map((item, i) => {
      tokenIds.push({ tokenId: item, collection: getAirNftAddress() });
    })
    // retrieve my nft from air
    // const airNftOwners = []
    // _.map(airNFTs, (nft) => {
    //   airNftOwners.push(airnftContract.methods.ownerOf(nft).call())
    // })
    // const owners = await Promise.all(airNftOwners)
    // _.map(owners, (owner, idx) => {
    //   if (owner !== account) return
    //   tokenIds.push({ tokenId: airNFTs[idx], collection: getAirNftAddress() })
    // })

    const items = await marketContract.methods.fetchItemsCreated().call({ from: account })
    const tokenIdLength = tokenIds.length
    for (let i = 0; i < tokenIdLength; i++) {
      if (!tmpMyTokens[i]) tmpMyTokens[i] = {}
      tmpMyTokens[i].itemId = '0'
    }
    let currentIndex = 0
    for (let i = 0; i < items.length; i++) {
      if (items[i].isSold === false) {
        tokenIds.push({ tokenId: items[i].tokenId, collection: items[i].nftContract })
        if (!tmpMyTokens[currentIndex + tokenIdLength]) tmpMyTokens[currentIndex + tokenIdLength] = {}
        tmpMyTokens[currentIndex + tokenIdLength].itemId = items[i].itemId
        currentIndex++
      }
    }

    const myTokenHashes = []
    for (let i = 0; i < tokenIds.length; i++) {
      if (tokenIds[i].collection == getHappyCowAddress()) myTokenHashes.push(happyCowsContract.methods.tokenURI(tokenIds[i].tokenId).call())
      else if (tokenIds[i].collection == getAirNftAddress()) myTokenHashes.push(airnftContract.methods.tokenURI(tokenIds[i].tokenId).call())
      else if (tokenIds[i].collection == getCowNftAddress()) myTokenHashes.push(cownftContract.methods.tokenURI(tokenIds[i].tokenId).call())
      else if (tokenIds[i].collection == getBullNftAddress()) myTokenHashes.push(bullnftContract.methods.tokenURI(tokenIds[i].tokenId).call())
      else if (tokenIds[i].collection == getLandNftAddress()) myTokenHashes.push(landnftContract.methods.tokenURI(tokenIds[i].tokenId).call())
    }
    const result = await Promise.all(myTokenHashes)

    for (let i = 0; i < tokenIds.length; i++) {
      if (!tmpMyTokens[i]) tmpMyTokens[i] = {}
      tmpMyTokens[i].tokenId = tokenIds[i].tokenId
      tmpMyTokens[i].tokenHash = result[i]
      tmpMyTokens[i].collection = tokenIds[i].collection
      const uniqueTokenData = await fetchNftData(result[i]);
      tmpMyTokens[i].attributes = uniqueTokenData.attributes;
    }
    setMyTokens(tmpMyTokens);
    setAllNfts(tmpMyTokens);
    setLoading(false)
  }, [account, happyCowsContract, marketContract, airnftContract])

  const fetchNftData = async (eachMyToken) => {
    try {
      const res = await fetch(eachMyToken)
      const json = await res.json()
      return json;
    } catch (e) {
      // toast.error('e', e);
      console.log('Error on: ', e)
    }
  }

  useEffect(() => {
    getTokenHashes()
  }, [account])

  const filterHandler = async (collection, breed, rarity) => {
    let filteredMarketItems = allNfts;
    let filteredByCollection;
    let filteredByBreed;
    let filteredByRarity;

    console.log(collection)
    console.log(breed)
    console.log(rarity)
    console.log(filteredMarketItems)
    //   { label: 'All NFTs', value: { field: 'All', direction: 'asc', collection: '' } },
    if (collection.value.field === "All") {
      filteredByCollection = filteredMarketItems;
    } else {
      filteredByCollection = filteredMarketItems.filter(function (item) {
        return item.collection.toLowerCase() === collection.value.collection.toLowerCase();
      })
    }

    if (breed.value.field === "All") {
      filteredByBreed = filteredByCollection;
    } else {
      filteredByBreed = filteredByCollection.filter(function (item) {
        console.log(item.attributes[1].value, breed.value.field)
        return item.attributes[1].value === breed.value.field;
      })
    }

    if (rarity.value.field === "All") {
      filteredByRarity = filteredByBreed;
    } else {
      filteredByRarity = filteredByBreed.filter(function (item) {
        return item.attributes[0].value === rarity.value.field;
      })
    }

    setMyTokens(filteredByRarity);
  }

  const handleFilterReset = () => {
    console.log('Reset Filters')
    window.location.reload();
  }

  return (
    <Page
      style={{
        backgroundImage: isDark ? `url(/images/farm_background_dark.png)` : `url(/images/farm_background.png)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <StyledHero>
        <LeftHeader >
          <Heading as="h1" size="lg" color="text" mb="20px">
            My NFTs
          </Heading>
        </LeftHeader>
        <Blank />
        <RightHeader >

          <Select
            options={filterByCollection}
            onOptionChange={(option) => {
              console.log('From Select: ', option)
              setCollectionFilter(option);
              filterHandler(option, breedFilter, rarityFilter);
            }
            }
            style={{
              marginRight: '15px',
              background: isDark ? '#27262c' : '',
              // pointerEvents: collectionFilter.value.field != "All" ? 'none' : 'auto'
            }}
          />

          <Select
            options={filterByRarity}
            onOptionChange={(option) => {
              setRarityFilter(option)
              filterHandler(collectionFilter, breedFilter, option);
            }
            }
            style={{
              marginRight: '15px',
              background: isDark ? '#27262c' : '',
              // pointerEvents: rarityFilter.value.field != "All" ? 'none' : 'auto'
            }}
          />

          {collectionFilter.value.field === "All" ? <></> : <>
            {collectionFilter.value.collection === getLandNftAddress() ? <>
              <Select
                options={filterByType}
                onOptionChange={(option) => {
                  setBreedFilter(option)
                  filterHandler(collectionFilter, option, rarityFilter);
                }
                }
                style={{ marginRight: '15px', background: isDark ? '#27262c' : '' }}
              />
            </> : <>

              <Select
                options={filterByBreed}
                onOptionChange={(option) => {
                  setBreedFilter(option)
                  filterHandler(collectionFilter, option, rarityFilter);
                }
                }
                style={{ marginRight: '15px', background: isDark ? '#27262c' : '' }}
              />

            </>}
          </>}

          <Button
            onClick={handleFilterReset}
            style={{ height: '2.5em' }}
          >
            Reset Filters
          </Button>

        </RightHeader>
      </StyledHero>
      <NftItemContainer>
        {myTokens.map((EachMyToken, index) => {
          console.log('To Map: ', myTokens)
          return (
            <Link
              key={EachMyToken.tokenId + "_" + index}
              to={`/myNFTs/${EachMyToken.tokenId}/${EachMyToken.collection}`}
              className="LinkItemContainer"
              onClick={() => { localStorage.setItem("collection", EachMyToken.collection); localStorage.setItem("marketItemId", EachMyToken.itemId) }}
            >
              <EachNft
                eachMyToken={EachMyToken}
                key={EachMyToken.tokenId}
              />
            </Link>
          )
        })}
      </NftItemContainer>
    </Page>
  )
}

export default MyNfts
