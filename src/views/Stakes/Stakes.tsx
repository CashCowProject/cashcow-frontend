import _ from 'lodash'
import React, { useCallback, useContext, useEffect, useMemo } from 'react'
import Page from 'components/layout/Page'
import { StakeContext } from 'contexts/StakeContext'
import { AbiItem } from "web3-utils"
import { Heading } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getHappyCowAddress, getMarketAddress, getAirNftAddress } from 'utils/addressHelpers'
import Web3 from "web3";
import AirNfts from 'config/abi/AirNft.json'
import HappyCows from 'config/abi/HappyCows.json'
import Market from 'config/abi/Market.json'
import airNFTs from 'config/constants/airnfts'
import { StatisticsInfo, StakeItems } from './components'

const web3 = new Web3(Web3.givenProvider)

const Stakes = () => {
  const { account } = useWallet()

  const happyCowsContract = useMemo(() => {
    return new web3.eth.Contract(HappyCows.abi as AbiItem[], getHappyCowAddress())
  }, []) 

  const marketContract = useMemo(() => {
      return new web3.eth.Contract(Market.abi as AbiItem[], getMarketAddress())
  }, [])

  const airnftContract = useMemo(() => {
      return new web3.eth.Contract(AirNfts.abi as AbiItem[], getAirNftAddress())
  }, [])

  const { myNFTS, initMyNFTS } = useContext(StakeContext)

  useEffect(() => {
    if (!account || myNFTS.length > 0)
      return;

    async function fetchMyNFTS () {
      const tmpMyTokens = []
      const happyCowTokens = await happyCowsContract.methods.fetchMyNfts().call({from: account})
      const tokenIds = []
      _.map(happyCowTokens, itm => {
          tokenIds.push({tokenId: itm, isAIR: false})
      });
      
      // retrieve my nft from air
      const airNftOwners = []
      _.map(airNFTs, nft => {
          airNftOwners.push(airnftContract.methods.ownerOf(nft).call())
      });
      const owners = await Promise.all(airNftOwners)
      _.map(owners, (owner, idx) => {
          if (owner.toLowerCase() !== account.toLowerCase())
              return
          
          tokenIds.push({tokenId: airNFTs[idx], isAIR: true})
      });

      const items = await marketContract.methods.fetchItemsCreated().call({from: account});
      const tokenIdLength = tokenIds.length;
      for(let i = 0; i < tokenIdLength; i ++) {
          if (!tmpMyTokens[i]) tmpMyTokens[i] = {}
          tmpMyTokens[i].itemId = '0'
      }
      let currentIndex = 0;
      for(let i = 0; i < items.length; i ++) {
          if(items[i].isSold === false) {
              tokenIds.push({tokenId: items[i].tokenId, isAIR: items[i].nftContract === getAirNftAddress()})

              if (!tmpMyTokens[currentIndex + tokenIdLength]) tmpMyTokens[currentIndex + tokenIdLength] = {}
              tmpMyTokens[currentIndex + tokenIdLength].itemId = items[i].itemId
              currentIndex ++;
          }
      }
      
      const myTokenHashes = [];
      for (let i = 0; i < tokenIds.length; i ++) {
          if (!tokenIds[i].isAIR)
              myTokenHashes.push(happyCowsContract.methods.tokenURI(tokenIds[i].tokenId).call());
          else
              myTokenHashes.push(airnftContract.methods.tokenURI(tokenIds[i].tokenId).call());
      }
      const result = await Promise.all(myTokenHashes);
      
      for (let i = 0; i < tokenIds.length; i ++) {
          if (!tmpMyTokens[i]) tmpMyTokens[i] = {}
          tmpMyTokens[i].tokenId = tokenIds[i].tokenId
          tmpMyTokens[i].tokenHash = result[i]
          tmpMyTokens[i].isAIR = tokenIds[i].isAIR
      }

      tmpMyTokens.push(tmpMyTokens[0])
      tmpMyTokens.push(tmpMyTokens[0])
      tmpMyTokens.push(tmpMyTokens[0])
      tmpMyTokens.push(tmpMyTokens[0])
      tmpMyTokens.push(tmpMyTokens[0])

      initMyNFTS(tmpMyTokens);
    }

    fetchMyNFTS()

  }, [happyCowsContract, airnftContract, account, initMyNFTS, marketContract, myNFTS])

  return (
    <Page>
      <Heading as="h1" size="lg" color="primary" mb="25px" style={{ textAlign: 'center' }}>
        <StatisticsInfo />
      </Heading>
      <StakeItems />
    </Page>
  )
}

export default Stakes
