import React, { useEffect, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AirNfts from 'config/abi/AirNft.json'
import Market from 'config/abi/Market.json'
import HappyCows from 'config/abi/HappyCows.json'
import CowNFT from 'config/abi/CowNFT.json'
import BullNFT from 'config/abi/BullNFT.json'
import LandNFT from 'config/abi/LandNFT.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AbiItem, toBN } from 'web3-utils'
import Web3 from 'web3'
import {
  getHappyCowAddress,
  getMarketAddress,
  getAirNftAddress,
  getCowNftAddress,
  getBullNftAddress,
  getLandNftAddress,
} from 'utils/addressHelpers'
import useTheme from 'hooks/useTheme'

const NftOnChainDataContainer = styled.div`
  display: flex;
  min-width: 280px;
  max-width: 330px;
  width: 30%;
  padding: 32px;
  box-sizing: border-box;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: unset;
    width: 100%;
  }
`

const NftOnChainDataTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #431216;
`

const NftOnChainDetailContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px 0;
`

const NftOnChainDetail = styled.div`
  padding: 18px 0 0;
  font-size: 14px;
`

const NftOnChainEachData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const NftOnChainLinkStyle = styled.div`
  color: #431216;
  font-weight: 500;
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
`

const web3 = new Web3(Web3.givenProvider)

export interface NftDataRightComponentInterface {
  itemId?: string
}

const NftDataRightComponent = ({ itemId }: NftDataRightComponentInterface) => {
  const { isDark } = useTheme()
  const { account } = useWallet()
  const [isAIR, setIsAIR] = useState(false)
  const [tokenId, setTokenId] = useState('')
  const [ownerAddress, setOwnerAddress] = useState('')
  const [dna, setDna] = useState('')
  const [attr, setAttr] = useState([])
  const [collectionAddress, setAddress] = useState('')
  // FIXME: Add NFT Metadata
  const [nftMetaData, setNftMetaData] = useState('')
  const [nftType, setNftType] = useState('')

  const marketContract = useMemo(() => {
    return new web3.eth.Contract(Market.abi as AbiItem[], getMarketAddress())
  }, [])

  const happyCowsContract = useMemo(() => {
    return new web3.eth.Contract(HappyCows.abi as AbiItem[], getHappyCowAddress())
  }, [])

  const airnftContract = useMemo(() => {
    return new web3.eth.Contract(AirNfts.abi as AbiItem[], getAirNftAddress())
  }, [])

  const CowContract = useMemo(() => {
    return new web3.eth.Contract(CowNFT.abi as AbiItem[], getCowNftAddress())
  }, [])

  const BullContract = useMemo(() => {
    return new web3.eth.Contract(BullNFT.abi as AbiItem[], getBullNftAddress())
  }, [])

  const LandContract = useMemo(() => {
    return new web3.eth.Contract(LandNFT.abi as AbiItem[], getLandNftAddress())
  }, [])

  const fetchNft = useCallback(async () => {
    const marketItems = await marketContract.methods.fetchMarketItems().call({ from: account })
    let index = 0
    let isTokenAir = false
    let isCowNFT = false
    let isBullNFT = false
    let isHappyCow = false
    let isLandNFT = false

    for (let i = 0; i < marketItems.length; i++) {
      if (marketItems[i].itemId === itemId) {
        isTokenAir = marketItems[i].nftContract === getAirNftAddress()
        isCowNFT = marketItems[i].nftContract === getCowNftAddress()
        isBullNFT = marketItems[i].nftContract === getBullNftAddress()
        isHappyCow = marketItems[i].nftContract === getHappyCowAddress()
        isLandNFT = marketItems[i].nftContract === getLandNftAddress()
        setTokenId(marketItems[i].tokenId.toString())
        setOwnerAddress(marketItems[i].seller.toString())
        index = i
        break
      }
    }

    let nftHash = null
    if (isTokenAir) {
      nftHash = await airnftContract.methods.tokenURI(toBN(marketItems[index].tokenId)).call({ from: account })
      setAddress(getAirNftAddress())
    } else if (isHappyCow) {
      nftHash = await happyCowsContract.methods.tokenURI(toBN(marketItems[index].tokenId)).call({ from: account })
      setAddress(getHappyCowAddress())
    } else if (isCowNFT) {
      nftHash = await CowContract.methods.tokenURI(toBN(marketItems[index].tokenId)).call({ from: account })
      const cowAge = await fetchCowAge(marketItems[index].tokenId)
      setNftType('COW')
      setNftMetaData(cowAge)
      setAddress(getCowNftAddress())
    } else if (isBullNFT) {
      nftHash = await BullContract.methods.tokenURI(toBN(marketItems[index].tokenId)).call({ from: account })
      setNftType('BULL')
      const bullRT = await fetchBullRecoveryTime(marketItems[index].tokenId)
      setNftMetaData(bullRT)
      setAddress(getBullNftAddress())
    } else {
      nftHash = await LandContract.methods.tokenURI(toBN(marketItems[index].tokenId)).call({ from: account })
      setAddress(getLandNftAddress())
    }

    const res = await fetch(nftHash)
    const json = await res.json()
    setIsAIR(isTokenAir)
    setDna(json.dna)
    setAttr(json.attributes)
  }, [account, marketContract, CowContract, BullContract, LandContract, airnftContract, itemId, happyCowsContract])

  useEffect(() => {
    fetchNft()
  }, [itemId, fetchNft])

  const fetchCowAge = async (cowID) => {
    console.log('Fetching Age For: ', cowID)
    const currentTimestamp = new Date().getTime() / 1000
    const maxAge = 200 * 24 * 60 * 60
    const res = await CowContract.methods.attrOf(cowID).call({ from: account })

    const cowBreed = parseInt(res.breed)
    const cowRarity = parseInt(res.rarity)

    const cowAge = currentTimestamp - res.birth
    let cowAgingMultiplier = 0

    if (maxAge > cowAge) {
      cowAgingMultiplier = 1 - cowAge / maxAge
    }

    const cowRarityMilkPower = [2000, 3000, 5000, 8000, 13000]

    const cowMilkPower = cowRarityMilkPower[cowRarity] * cowAgingMultiplier

    return cowMilkPower.toFixed(0)
  }

  const fetchBullRecoveryTime = async (bullID) => {
    console.log('Fetching recuperation time for bull: ', bullID)

    const currentTimestamp = new Date().getTime() / 1000
    const maxRecoveryTime = 15 * 24 * 60 * 60
    const maxAge = 200 * 24 * 60 * 60

    const res = await BullContract.methods.attrOf(bullID).call({ from: account })

    const bullAge = currentTimestamp - res.birth

    const bullBreed = res.breed
    const bullRarity = parseInt(res.rarity)

    const baseRecoveryTimes = [3000, 2400, 1800, 1200, 600]
    let bullRecoveryTime =
      (baseRecoveryTimes[bullRarity] + (maxRecoveryTime - baseRecoveryTimes[bullRarity]) * (bullAge / maxAge)) /
      (60 * 60)

    console.log('>>>>> ', bullRecoveryTime)
    return bullRecoveryTime.toFixed(0)
  }

  return (
    <NftOnChainDataContainer>
      <NftOnChainDataTitle style={{ color: isDark ? 'white' : '' }}>Properties</NftOnChainDataTitle>
      <NftOnChainDetailContainer>
        <NftOnChainDetail>
          <NftOnChainEachData>
            <div style={{ color: isDark ? 'white' : '#694f4e' }}>Owner</div>
            <NftOnChainLinkStyle>
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://bscscan.com/address/${ownerAddress}`}
                style={{ textDecoration: 'underline', color: isDark ? 'white' : '#431216' }}
              >
                {ownerAddress}
              </a>
            </NftOnChainLinkStyle>
          </NftOnChainEachData>
          <NftOnChainEachData>
            <div style={{ color: isDark ? 'white' : '#694f4e' }}>Contract Address</div>
            <NftOnChainLinkStyle>
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://bscscan.com/address/${collectionAddress}`}
                style={{ textDecoration: 'underline', color: isDark ? 'white' : '#431216' }}
              >
                {collectionAddress}
              </a>
            </NftOnChainLinkStyle>
          </NftOnChainEachData>
          <NftOnChainEachData>
            <div style={{ color: isDark ? 'white' : '#694f4e' }}>Token ID</div>
            <NftOnChainLinkStyle style={{ color: isDark ? 'white' : '' }}>{`#${tokenId}`}</NftOnChainLinkStyle>
          </NftOnChainEachData>
          {/* <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Asset Protocol</div>
                        <NftOnChainLinkStyle>
                            ERC721
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData>
                    <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Asset public chain</div>
                        <NftOnChainLinkStyle>
                            BSC
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData> */}
          {dna && (
            <NftOnChainEachData>
              <div style={{ color: isDark ? 'white' : '#694f4e' }}>DNA</div>
              <NftOnChainLinkStyle style={{ color: isDark ? 'white' : '' }}>{dna}</NftOnChainLinkStyle>
            </NftOnChainEachData>
          )}
          {attr.map((item) => (
            <NftOnChainEachData key={item.trait_type}>
              <div style={{ color: isDark ? 'white' : '#694f4e' }}>{item.trait_type}</div>
              <NftOnChainLinkStyle style={{ color: isDark ? 'white' : '' }}>{item.value}</NftOnChainLinkStyle>
            </NftOnChainEachData>
          ))}
          {nftMetaData != '' && (
            <NftOnChainEachData>
              <div style={{ color: isDark ? 'white' : '#694f4e' }}>
                {nftType == 'COW' && <>Milk Power</>}
                {nftType == 'BULL' && <>Recovery Time</>}
              </div>
              <NftOnChainLinkStyle style={{ color: isDark ? 'white' : '' }}>{nftMetaData}</NftOnChainLinkStyle>
            </NftOnChainEachData>
          )}
        </NftOnChainDetail>
      </NftOnChainDetailContainer>
    </NftOnChainDataContainer>
  )
}

export default NftDataRightComponent
