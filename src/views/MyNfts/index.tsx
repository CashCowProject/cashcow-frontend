import _ from 'lodash'
import React, { useEffect, useState, useMemo,useContext, useCallback } from 'react'
import styled, { useTheme } from 'styled-components'
import { Link } from 'react-router-dom'
import { Heading } from 'cashcow-uikit'
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

 const filterByCollection = [
  { label: 'All NFTs', value: { field: 'All', direction: 'asc' } },
  { label: 'HappyCows', value: { field: 'HappyCows', direction: 'desc' } },
  { label: 'Genesis', value: { field: 'airnft', direction: 'asc' } },
  { label: 'Land', value: { field: 'land', direction: 'asc' } },
  { label: 'Cow', value: { field: 'cow', direction: 'asc' } },
  { label: 'Bull', value: { field: 'bull', direction: 'asc' } },
]

const StyledHero = styled.div`
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 20px;
  display: flex;
`
const LeftHeader = styled.div`
  display: flex;
  width: 60%;

`
const Blank = styled.div`
  display: flex;
  flex: auto;
`
const RightHeader = styled.div`
  display: flex;
  // flex: 3;
  width: 150px;
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
  const { isDark } = useTheme();
  const { setLoading } = useContext(LoadingContext)
  const [allNfts, setAllNfts] = useState([]);
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
      tokenIds.push({ tokenId: item, collection: getAirNftAddress()});
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
        tokenIds.push({ tokenId: items[i].tokenId, collection: items[i].nftContract})
        if (!tmpMyTokens[currentIndex + tokenIdLength]) tmpMyTokens[currentIndex + tokenIdLength] = {}
        tmpMyTokens[currentIndex + tokenIdLength].itemId = items[i].itemId
        currentIndex++
      }
    }

    const myTokenHashes = []
    for (let i = 0; i < tokenIds.length; i++) {
      if (tokenIds[i].collection == getHappyCowAddress()) myTokenHashes.push(happyCowsContract.methods.tokenURI(tokenIds[i].tokenId).call())
      else if(tokenIds[i].collection == getAirNftAddress()) myTokenHashes.push(airnftContract.methods.tokenURI(tokenIds[i].tokenId).call())
      else if(tokenIds[i].collection == getCowNftAddress()) myTokenHashes.push(cownftContract.methods.tokenURI(tokenIds[i].tokenId).call())
      else if(tokenIds[i].collection == getBullNftAddress()) myTokenHashes.push(bullnftContract.methods.tokenURI(tokenIds[i].tokenId).call())
      else if(tokenIds[i].collection == getLandNftAddress()) myTokenHashes.push(landnftContract.methods.tokenURI(tokenIds[i].tokenId).call())
    }
    const result = await Promise.all(myTokenHashes)

    for (let i = 0; i < tokenIds.length; i++) {
      if (!tmpMyTokens[i]) tmpMyTokens[i] = {}
      tmpMyTokens[i].tokenId = tokenIds[i].tokenId
      tmpMyTokens[i].tokenHash = result[i]
      tmpMyTokens[i].collection = tokenIds[i].collection
    }
    setMyTokens(tmpMyTokens);
    setAllNfts(tmpMyTokens);
    setLoading(false)
  }, [account, happyCowsContract, marketContract, airnftContract])
  
  useEffect(() => {
    getTokenHashes()
  }, [account])
  const filterHandler = (value) =>{
    console.log(value.field)
    let filteredMarketItems = [];
    let index = 0;
    switch (value.field) {
      case 'All':
        filteredMarketItems = allNfts
        break
      case 'HappyCows':
        for (let i = 0; i < allNfts.length; i++) {
          if (allNfts[i].collection === getHappyCowAddress()) {
            filteredMarketItems[index] = allNfts[i]
            index++
          }
        }
        break
      case 'airnft':
        for (let i = 0; i < allNfts.length; i++) {
          if (allNfts[i].collection === getAirNftAddress()) {
            filteredMarketItems[index] = allNfts[i]
            index++
          }
        }
        break
      case 'land':
        for (let i = 0; i < allNfts.length; i++) {
          if (allNfts[i].collection === getLandNftAddress()) {
            filteredMarketItems[index] = allNfts[i]
            index++
          }
        }
        break
      case 'cow':
        for (let i = 0; i < allNfts.length; i++) {
          if (allNfts[i].collection === getCowNftAddress()) {
            filteredMarketItems[index] = allNfts[i]
            index++
          }
        }
        break
      case 'bull':
        for (let i = 0; i < allNfts.length; i++) {
          if (allNfts[i].collection === getBullNftAddress()) {
            filteredMarketItems[index] = allNfts[i]
            index++
          }
        }
        break
      default:
        break
    }
    setMyTokens(filteredMarketItems);

  }
  return (
    <Page
      style={{
        backgroundImage: isDark ? `url(/images/cow/home-backgrounddark.png)` : `url(/images/cow/home-backgroundlight.png)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
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
            onOptionChange={(option) => filterHandler(option.value)}
            style={{ marginRight: '15px', background: isDark ? '#27262c' : '' }}
          />
        </RightHeader>
      </StyledHero>
      <NftItemContainer>
        {myTokens.map((EachMyToken, index) => {
          console.log('To Map: ', myTokens)
          return (
            <Link key={EachMyToken.tokenId + "_" + index} to={`/myNFTs/${EachMyToken.tokenId}/${EachMyToken.collection}`} className="LinkItemContainer" onClick = {()=>{localStorage.setItem("collection", EachMyToken.collection);localStorage.setItem("marketItemId", EachMyToken.itemId)}}>
              <EachNft eachMyToken={EachMyToken} key={EachMyToken.tokenId} />
            </Link>
          )
        })}
      </NftItemContainer>
    </Page>
  )
}

export default MyNfts
