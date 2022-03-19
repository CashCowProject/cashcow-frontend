import _ from 'lodash'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import styled, { useTheme } from 'styled-components'
import { Link } from 'react-router-dom'
import { Heading } from 'cashcow-uikit'
import { AbiItem } from 'web3-utils'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Web3 from 'web3'
import AirNfts from 'config/abi/AirNft.json'
import HappyCows from 'config/abi/HappyCows.json'
import Market from 'config/abi/Market.json'
import Page from 'components/layout/Page'
import airNFTs from 'config/constants/airnfts'
import { getHappyCowAddress, getMarketAddress, getAirNftAddress } from 'utils/addressHelpers'
import EachNft from './components/EachNft'

const StyledHero = styled.div`
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 20px;
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

  const happyCowsContract = useMemo(() => {
    return new web3.eth.Contract(HappyCows.abi as AbiItem[], getHappyCowAddress())
  }, [])

  const marketContract = useMemo(() => {
    return new web3.eth.Contract(Market.abi as AbiItem[], getMarketAddress())
  }, [])

  const airnftContract = useMemo(() => {
    return new web3.eth.Contract(AirNfts.abi as AbiItem[], getAirNftAddress())
  }, [])

  const getTokenHashes = useCallback(async () => {
    const tmpMyTokens = []
    const happyCowTokens = await happyCowsContract.methods.fetchMyNfts().call({ from: account })
    const tokenIds = []
    _.map(happyCowTokens, (itm) => {
      tokenIds.push({ tokenId: itm, isAIR: false })
    })

    // retrieve my nft from air
    const airNftOwners = []
    _.map(airNFTs, (nft) => {
      airNftOwners.push(airnftContract.methods.ownerOf(nft).call())
    })
    const owners = await Promise.all(airNftOwners)
    _.map(owners, (owner, idx) => {
      if (owner !== account) return

      tokenIds.push({ tokenId: airNFTs[idx], isAIR: true })
    })
    const items = await marketContract.methods.fetchItemsCreated().call({ from: account })
    const tokenIdLength = tokenIds.length
    for (let i = 0; i < tokenIdLength; i++) {
      if (!tmpMyTokens[i]) tmpMyTokens[i] = {}
      tmpMyTokens[i].itemId = '0'
    }
    let currentIndex = 0
    for (let i = 0; i < items.length; i++) {
      if (items[i].isSold === false) {
        tokenIds.push({ tokenId: items[i].tokenId, isAIR: items[i].nftContract === getAirNftAddress() })
        if (!tmpMyTokens[currentIndex + tokenIdLength]) tmpMyTokens[currentIndex + tokenIdLength] = {}
        tmpMyTokens[currentIndex + tokenIdLength].itemId = items[i].itemId
        currentIndex++
      }
    }

    const myTokenHashes = []
    for (let i = 0; i < tokenIds.length; i++) {
      if (!tokenIds[i].isAIR) myTokenHashes.push(happyCowsContract.methods.tokenURI(tokenIds[i].tokenId).call())
      else myTokenHashes.push(airnftContract.methods.tokenURI(tokenIds[i].tokenId).call())
    }
    const result = await Promise.all(myTokenHashes)

    for (let i = 0; i < tokenIds.length; i++) {
      if (!tmpMyTokens[i]) tmpMyTokens[i] = {}
      tmpMyTokens[i].tokenId = tokenIds[i].tokenId
      tmpMyTokens[i].tokenHash = result[i]
      tmpMyTokens[i].isAIR = tokenIds[i].isAIR
    }
    setMyTokens(tmpMyTokens)
  }, [account, happyCowsContract, marketContract, airnftContract])
  useEffect(() => {
    getTokenHashes()
  }, [getTokenHashes])

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
        <Heading as="h1" size="lg" color="text" mb="20px">
          My NFTs
        </Heading>
      </StyledHero>
      <NftItemContainer>
        {myTokens.map((EachMyToken, index) => {
          return (
            <Link key={EachMyToken.tokenHash} to={`/myNFTs/${index}`} className="LinkItemContainer">
              <EachNft eachMyToken={EachMyToken} key={EachMyToken.tokenId} />
            </Link>
          )
        })}
      </NftItemContainer>
    </Page>
  )
}

export default MyNfts
