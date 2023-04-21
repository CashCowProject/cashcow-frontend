import _ from 'lodash'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import AirNfts from 'config/abi/AirNft.json'
import HappyCows from 'config/abi/HappyCows.json'
import Market from 'config/abi/Market.json'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { Heading } from 'cashcow-uikit'
import {
  getHappyCowAddress,
  getMarketAddress,
  getAirNftAddress,
  getBullNftAddress,
  getCowNftAddress,
  getLandNftAddress,
} from 'utils/addressHelpers'
import airNFTs from 'config/constants/airnfts'
import MyNftData from './components/MyNftData'
import MyNftDetailHeader from './components/MyNftDetailHeader'
import ERC721 from 'config/abi/ERC721.json'
import useTheme from 'hooks/useTheme'

const StyledHero = styled.div`
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 20px;
`
const NftDetailContainer = styled.div`
  margin-top: 32px;
`

const web3 = new Web3(Web3.givenProvider)

type boxParam = {
  myTokenId: string
}

const MyNftsDeatail = () => {
  const { isDark } = useTheme()

  const { myTokenId } = useParams<boxParam>()
  const { account } = useWallet()
  const [myToken, setMyToken] = useState({})
  const [collectionName, setCollectionName] = useState('')
  const [collectionAddress, setCollectionAddress] = useState('')

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
    const collectionAddress = localStorage.getItem('collection')
    const marketItemId = localStorage.getItem('marketItemId')
    console.log(collectionAddress)
    const nftContract = new web3.eth.Contract(ERC721.abi as AbiItem[], collectionAddress)
    const tokenhash = await nftContract.methods.tokenURI(myTokenId)
    let collectionName = ''
    if (collectionAddress == getAirNftAddress()) {
      collectionName = 'Air NFT'
    }
    if (collectionAddress == getHappyCowAddress()) {
      collectionName = 'HappyCow'
    }
    if (collectionAddress == getCowNftAddress()) {
      collectionName = 'Cow NFT'
    }
    if (collectionAddress == getLandNftAddress()) {
      collectionName = 'Land NFT'
    }
    if (collectionAddress == getBullNftAddress()) {
      collectionName = 'Bull NFT'
    }
    const _temp = {
      tokenId: myTokenId,
      collection: collectionAddress,
      tokenHash: tokenhash,
      itemId: marketItemId,
    }
    setCollectionName(collectionName)

    setMyToken(_temp)
  }, [account, happyCowsContract, marketContract, airnftContract, myTokenId])
  useEffect(() => {
    getTokenHashes()
  }, [getTokenHashes])

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
        <Heading as="h1" size="lg" color={isDark ? 'white' : '#0B3D4C'} mb="20px">
          My NFT Detail
        </Heading>
      </StyledHero>
      <MyNftDetailHeader collectionName={collectionName} />
      <NftDetailContainer>
        <MyNftData myToken={myToken} />
      </NftDetailContainer>
    </Page>
  )
}

export default MyNftsDeatail
