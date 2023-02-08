import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Web3 from 'web3'
import { fromWei, AbiItem } from 'web3-utils'
import AirNfts from 'config/abi/AirNft.json'
import CowNFT from 'config/abi/CowNFT.json'
import BullNFT from 'config/abi/BullNFT.json'
import LandNFT from 'config/abi/LandNFT.json'
import HappyCows from 'config/abi/HappyCows.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { usePriceCakeBusd } from 'state/hooks'
import { getHappyCowAddress, getAirNftAddress, getCowNftAddress, getBullNftAddress, getLandNftAddress } from 'utils/addressHelpers'
import useTheme from 'hooks/useTheme'
import { PINATA_BASE_URI } from 'config/constants/nfts'
import { getNumberSuffix } from 'utils/formatBalance'
import landTypes from 'config/constants/landTypes'


const NftEachItemContainer = styled.div`
  cursor: pointer;
  min-width: 230px;
  max-width: calc(25% - 30px);
  flex: 1;
  margin: 30px 15px 0;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 3%), 0 4px 6px -2px rgb(0 0 0 / 1%);
  position: relative;
`
const ItemTop = styled.div`
  paddingtop: 2px;
`
const NftImageContainer = styled.div`
  position: relative;
  padding-bottom: 100%;
  height: 0;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  overflow: hidden;
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
const Title = styled.div`
  height: 68px;
  padding: 0 24px;
  display: flex;
  align-items: center;
`

const TitleText = styled.div`
  font-size: 18px;
  line-height: 1.2;
  color: #431216;
  word-break: break-word;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
  display: flex;
  align-items: center;
`

const ItemSeperation = styled.div`
  height: 1px;
  min-width: unset;
  background-image: url(../images/line.jpg);
  background-repeat: repeat-x;
  position: relative;
  background-size: contain;
  background-position: 50%;
`

const ItemBottom = styled.div`
  padding: 12px 24px 20px;
  margin: 0;
`

const ItemTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #694f4e;
`

const ItemValue = styled.div`
  align-items: center;
  color: #431216;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
`

const ItemValueText = styled.div`
  font-size: 22px;
  font-weight: 700;
`

const ItemValueToken = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
`

const ItemMetaData = styled.div`
    color: white;
    font-size: 18px;
    font-weight: 400;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: .3em;
    margin-bottom: .3em;
`

const web3 = new Web3(Web3.givenProvider)

export interface NftEachItemInterface {
  nftEachItem?: any
}

const NftEachItem = ({ nftEachItem }: NftEachItemInterface) => {
  const { account } = useWallet()
  const { isDark } = useTheme()
  const [flgMyNft, setFlgMyNft] = useState(false)
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [nftMetaData, setNftMetaData] = useState('')
  const [nftType, setNftType] = useState('');
  const [milkPrice, setMilkPrice] = useState(0)

  const cakePriceUsd = usePriceCakeBusd()

  const happyCowsContract = useMemo(() => {
    return new web3.eth.Contract(HappyCows.abi as AbiItem[], getHappyCowAddress())
  }, [])

  const airnftContract = useMemo(() => {
    return new web3.eth.Contract(AirNfts.abi as AbiItem[], getAirNftAddress())
  }, [])
  const cowContract = useMemo(() => {
    return new web3.eth.Contract(CowNFT.abi as AbiItem[], getCowNftAddress())
  }, [])
  const bullContract = useMemo(() => {
    return new web3.eth.Contract(BullNFT.abi as AbiItem[], getBullNftAddress())
  }, [])
  const landContract = useMemo(() => {
    return new web3.eth.Contract(LandNFT.abi as AbiItem[], getLandNftAddress())
  }, [])

  const fetchLandImage = async (json) => {
    console.log('fetching image for land:')
    const landBreed = json.attributes[1].value;
    const landRarity = json.attributes[0].value;
    return landTypes[landBreed][landRarity];
  }

  const fetchNft = useCallback(async () => {
    let nftHash = null

    const isAIR = nftEachItem.nftContract === getAirNftAddress()
    const isHappy = nftEachItem.nftContract === getHappyCowAddress();
    const isCowNft = nftEachItem.nftContract === getCowNftAddress();
    const isBullNft = nftEachItem.nftContract === getBullNftAddress();
    const isLandNft = nftEachItem.nftContract === getLandNftAddress();

    if (isAIR) nftHash = await airnftContract.methods.tokenURI(nftEachItem.tokenId).call({ from: account })
    else if (isHappy) nftHash = await happyCowsContract.methods.tokenURI(nftEachItem.tokenId).call({ from: account })
    else if (isCowNft) nftHash = await cowContract.methods.tokenURI(nftEachItem.tokenId).call({ from: account })
    else if (isBullNft) nftHash = await bullContract.methods.tokenURI(nftEachItem.tokenId).call({ from: account })
    else nftHash = await landContract.methods.tokenURI(nftEachItem.tokenId).call({ from: account })

    if (nftEachItem.seller === account) {
      setFlgMyNft(true)
    }
    const res = await fetch(nftHash)
    const json = await res.json()

    let imageUrl = json.image
    if (isAIR) {
      setImage(imageUrl);
      setName(json.name)
    } else if (isHappy) {
      imageUrl = imageUrl.slice(7);
      setName(json.name)
      setImage(`${PINATA_BASE_URI}${imageUrl}`)
    } else if (isLandNft) {
      setName(json.name);
      setImage(await fetchLandImage(json))
    } else if (isCowNft) {
      setImage(imageUrl);
      setName(json.name + "#" + nftEachItem.tokenId.toString())
      console.log('json: ', json)
      const cowAge = await fetchCowAge(nftEachItem.tokenId);
      setNftType('COW');
      setNftMetaData(cowAge);
    } else if (isBullNft) {
      setImage(imageUrl);
      setName(json.name + "#" + nftEachItem.tokenId.toString())
      const bullRT = await fetchBullRecoveryTime(nftEachItem.tokenId)
      setNftType('BULL');
      setNftMetaData(bullRT);
    } else {
      setImage(imageUrl);
      setName(json.name + "#" + nftEachItem.tokenId.toString())
    }


    setMilkPrice(cakePriceUsd.toNumber())
  }, [account, happyCowsContract, airnftContract, nftEachItem, cakePriceUsd, bullContract, cowContract, landContract])

  const fetchCowAge = async (cowID) => {
    console.log('Fetching Age For: ', cowID)
    const currentTimestamp = new Date().getTime() / 1000;
    const maxAge = 200 * 24 * 60 * 60;
    const res = await cowContract.methods.attrOf(cowID).call({ from: account })

    const cowBreed = parseInt(res.breed);
    const cowRarity = parseInt(res.rarity)

    const cowAge = currentTimestamp - res.birth;
    let cowAgingMultiplier = 0;

    if (maxAge > cowAge) {
      cowAgingMultiplier = 1 - (cowAge / maxAge);
    }

    const cowRarityMilkPower = [
      2000,
      3000,
      5000,
      8000,
      13000
    ]

    const cowMilkPower = cowRarityMilkPower[cowRarity] * cowAgingMultiplier

    return cowMilkPower.toFixed(0)
  }

  const fetchBullRecoveryTime = async (bullID) => {
    console.log('Fetching recuperation time for bull: ', bullID)

    const currentTimestamp = new Date().getTime() / 1000;
    const maxRecoveryTime = 15 * 24 * 60 * 60;
    const maxAge = 200 * 24 * 60 * 60;

    const res = await bullContract.methods.attrOf(bullID).call({ from: account })

    const bullAge = currentTimestamp - res.birth;

    const bullBreed = res.breed;
    const bullRarity = parseInt(res.rarity);

    const baseRecoveryTimes = [3000, 2400, 1800, 1200, 600]
    let bullRecoveryTime = (baseRecoveryTimes[bullRarity] + ((maxRecoveryTime - baseRecoveryTimes[bullRarity]) * (bullAge / maxAge))) / (60 * 60)

    console.log('>>>>> ', bullRecoveryTime)
    return bullRecoveryTime.toFixed(0);
  }

  useEffect(() => {
    fetchNft()
  }, [fetchNft])

  return (
    <Link to={`/nft-market/${nftEachItem.itemId}`}>
      <NftEachItemContainer style={{ background: isDark ? '#27262c' : '' }}>
        <ItemTop>
          <ItemMetaData style={{ color: isDark ? 'white' : '#431216' }}>
            {nftType == "COW" && <>
              <img
                src="/images/svgs/vida.svg"
                alt="token"
                style={{ width: '18px', height: '18px' }}
              />
              &nbsp;&nbsp;
              {nftMetaData}
            </>}
            {nftType == "BULL" && <>
              <img
                src="/images/svgs/relojgreen.svg"
                alt="token"
                style={{ width: '18px', height: '18px' }}
              />
              &nbsp;&nbsp;
              {nftMetaData}
            </>}
          </ItemMetaData>
          <NftImageContainer>
            <NftImage style={{ backgroundImage: `url(${image})` }} />
          </NftImageContainer>
          <Title>
            <TitleText style={{ color: isDark ? 'white' : '' }}>
              {`${name}`}
              {flgMyNft ? (
                <svg
                  width="20"
                  height="20"
                  style={{ marginLeft: '15px' }}
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 0C3.12667 0 0 3.12667 0 7C0 10.8733 3.12667 14 7 14C10.8733 14 14 10.8733 14 7C14 3.12667 10.8733 0 7 0ZM7 12.4444C5.42889 12.4444 3.99778 11.7756 3.01778 10.7022C3.04889 9.25556 3.84222 8.01111 5.02444 7.32667C5.11778 7.26444 5.22667 7.21778 5.33556 7.17111C4.51111 6.62667 3.95111 5.67778 3.95111 4.62C3.95111 2.98667 5.24222 1.64889 6.86 1.55556C6.87556 1.55556 6.89111 1.55556 6.89111 1.55556C6.93778 1.55556 6.96889 1.55556 7.01556 1.55556C7.03111 1.55556 7.06222 1.55556 7.07778 1.55556C7.17111 1.55556 7.26444 1.55556 7.37333 1.57111C8.69556 1.72667 9.8 2.75333 10.0333 4.06C10.2511 5.35111 9.67556 6.53333 8.69556 7.17111C8.80445 7.21778 8.91333 7.26444 9.00667 7.32667C10.1733 7.99556 10.9822 9.25556 11.0133 10.7022C10.0022 11.7756 8.57111 12.4444 7 12.4444Z"
                    fill={isDark ? 'white' : '#431216'}
                  />
                </svg>
              ) : (
                ''
              )}
            </TitleText>
          </Title>
        </ItemTop>
        <ItemSeperation />
        <ItemBottom>
          <ItemTitle style={{ color: isDark ? 'white' : '' }}>
            Sale Price
            <span>
              {' '}
              ≈ $ {getNumberSuffix(Math.floor(milkPrice * parseInt(fromWei(nftEachItem.price, 'ether')) * 100) / 100)}
            </span>
          </ItemTitle>
          <ItemValue>
            <ItemValueText style={{ color: isDark ? 'white' : '' }}>
              {getNumberSuffix(fromWei(nftEachItem.price, 'ether'))}
            </ItemValueText>
            <ItemValueToken style={{ color: isDark ? 'white' : '' }}>
              <img
                src="/images/farms/milk.png"
                alt="token"
                style={{ width: '18px', height: '18px', marginRight: '4px' }}
              />
              MILK
            </ItemValueToken>
          </ItemValue>
        </ItemBottom>
      </NftEachItemContainer>
    </Link>
  )
}

export default NftEachItem
