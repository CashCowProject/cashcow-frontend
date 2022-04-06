import _ from 'lodash'
import React, { useContext, useCallback, useEffect, useState } from 'react'
import { Flex, Image, Text, Tag } from 'cashcow-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getHappyCowAddress, getStakingAddress, getAirNftAddress } from 'utils/addressHelpers'
import { PINATA_BASE_URI } from 'config/constants/nfts'
import HappyCows from 'config/abi/HappyCows.json'
import Staking from 'config/abi/Staking.json'
import AirNfts from 'config/abi/AirNft.json'
import toast from 'react-hot-toast'
import { LoadingContext } from 'contexts/LoadingContext'
import { StakeContext } from 'contexts/StakeContext'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import useI18n from 'hooks/useI18n'
import useTheme from 'hooks/useTheme'
import airNFTs from 'config/constants/airnfts'
import styled from 'styled-components'
import { getNumberSuffix } from 'utils/formatBalance'

const ImageContainer = styled.div`
  position: relative;
  padding-bottom: 100%;
  height: 0;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  overflow: hidden;
  cursor: pointer;
`

const NftImage = styled.div`
  transition: transform 0.3s ease, -webkit-transform 0.3s ease;
  transform-origin: center;
  background-size: auto 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  &:hover {
    transform: scale(1.04);
  }
`
const Divider = styled.div`
  height: 1px;
  min-width: unset;
  background-image: url(../images/line.jpg);
  background-repeat: repeat-x;
  position: relative;
  background-size: contain;
  background-position: 50%;
`

const ItemTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #694f4e;
`
const web3 = new Web3(Web3.givenProvider)

const happyCowsContract = new web3.eth.Contract(HappyCows.abi as AbiItem[], getHappyCowAddress())
const stakingContract = new web3.eth.Contract(Staking.abi as AbiItem[], getStakingAddress())
const airnftContract = new web3.eth.Contract(AirNfts.abi as AbiItem[], getAirNftAddress())

const StakeItem = ({ data, index }) => {
  const TranslateString = useI18n()
  const { isDark } = useTheme()
  const { account } = useWallet()
  const { setLoading } = useContext(LoadingContext)
  const { appendCandidate, initMyNFTS, initSelectedNFTs } = useContext(StakeContext)

  const [milkPower, setMilkPower] = useState(0)

  const ItemContainer = styled.div`
    margin-right: 15px;
    margin-bottom: 15px;
    border-radius: 16px;
    background: ${!isDark ? 'white' : '#27262c'};
    box-shadow: 0px 2px 12px -8px ${!isDark ? 'rgba(25, 19, 38, 0.7)' : 'rgba(203, 203, 203, 0.7)'},
      0px 1px 1px ${!isDark ? 'rgba(25, 19, 38, 0.05)' : 'rgba(203, 203, 203, 0.05)'};
    position: relative;
  `
  const StakeBtn = styled.div`
    border-color: ${!isDark ? '#00D86C' : '#101820'};
    background-color: ${!isDark ? '#00D86C' : '#101820'};
    color: ${!isDark ? 'white' : 'white'};
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 16px 12px;
    font-size: 18px;
    margin-bottom: 12px;
    border-radius: 12px;
    transition: transform 0.3s ease, -webkit-transform 0.3s ease;
    cursor: pointer;
    &:hover {
      transform: scale(1.04);
    }
  `

  const [nftInfo, setNFTInfo] = useState({ tokenName: '', tokenId: '', imgUrl: '', isAIR: false })
  const fetchNft = useCallback(async () => {
    if (!data || !data.tokenId) return
    let isAIR = false
    if (data.contractAddress === getHappyCowAddress()) isAIR = false
    else if (data.contractAddress === getAirNftAddress()) isAIR = true
    let tokenURI
    if (!isAIR) tokenURI = await happyCowsContract.methods.tokenURI(data.tokenId).call()
    else tokenURI = await airnftContract.methods.tokenURI(data.tokenId).call()
    const res = await fetch(tokenURI)
    const json = await res.json()
    let imageUrl = json.image
    if (!isAIR) {
      imageUrl = imageUrl.slice(7)
      imageUrl = `${PINATA_BASE_URI}${imageUrl}`
    }

    setNFTInfo({ tokenName: json.name, tokenId: data.tokenId, imgUrl: imageUrl, isAIR: data.isAIR })
  }, [data])

  const fetchMilkPower = useCallback(async () => {
    const poolInfo = await stakingContract.methods.pools(index).call()
    const tmpMilkPower = poolInfo.milkPower
    setMilkPower(tmpMilkPower)
  }, [index])
  useEffect(() => {
    fetchNft()
    fetchMilkPower()
  }, [fetchNft, fetchMilkPower])

  const unstakeNFT = async () => {
    setLoading(true)

    try {
      await stakingContract.methods.unstake(data.itemId).send({ from: account })
      toast.success('Successfully Harvest and Unstake For this NFT.')
    } catch (error) {
      const { message } = error as Error
      toast.error(message)
    }

    const tmpStakingItems = await stakingContract.methods.getStakedItems(account).call()
    const stakingItems = []
    for (let i = 0; i < tmpStakingItems.length; i++) {
      if (index === '1' && tmpStakingItems[i].contractAddress === getHappyCowAddress())
        stakingItems.push(tmpStakingItems[i])
      else if (index === '2' && tmpStakingItems[i].contractAddress === getAirNftAddress())
        stakingItems.push(tmpStakingItems[i])
    }

    initSelectedNFTs(stakingItems)

    // Init My NFTs Again

    const tokenIds = []
    const tmpMyTokens = []
    if (index === '1') {
      const happyCowTokens = await happyCowsContract.methods.fetchMyNfts().call({ from: account })

      _.map(happyCowTokens, (itm) => {
        tokenIds.push({ tokenId: itm, isAIR: false })
      })
    }

    // retrieve my nft from air
    else {
      const airNftOwners = []
      _.map(airNFTs, (nft) => {
        airNftOwners.push(airnftContract.methods.ownerOf(nft).call())
      })
      const owners = await Promise.all(airNftOwners)
      _.map(owners, (owner, idx) => {
        if (owner.toLowerCase() !== account.toLowerCase()) return
        tokenIds.push({ tokenId: airNFTs[idx], isAIR: true })
      })
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
      if (!tokenIds[i].isAIR) tmpMyTokens[i].contractAddress = getHappyCowAddress()
      else tmpMyTokens[i].contractAddress = getAirNftAddress()
    }

    initMyNFTS(tmpMyTokens)

    setLoading(false)
  }
  return (
    <ItemContainer style={{ background: isDark ? '#27262c' : '' }}>
      <Flex flexDirection="column">
        <ImageContainer>
          <NftImage style={{ backgroundImage: `url(${nftInfo.imgUrl})` }} />
        </ImageContainer>
        <Divider />
        <Flex flexDirection="column" style={{ padding: '24px' }}>
          <Text fontSize="20px" style={{ textAlign: 'center' }}>
            {nftInfo.tokenName}
          </Text>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '14px' }}>
            <Text>Milk Power: </Text> &nbsp;&nbsp;
            <Text fontSize="15px">{getNumberSuffix(milkPower, 0)}</Text>
          </div>
          <StakeBtn onClick={() => unstakeNFT()}>Unstake</StakeBtn>
          {/* <UpgradeBtn>Upgrade HashRate</UpgradeBtn> */}
        </Flex>
      </Flex>
    </ItemContainer>
  )
}

export default StakeItem
