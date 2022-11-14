import React, { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import Market from 'config/abi/Market.json'
import { fromWei, AbiItem } from 'web3-utils'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { usePriceCakeBusd } from 'state/hooks'
import useTheme from 'hooks/useTheme'
import { PINATA_BASE_URI } from 'config/constants/nfts'
import { getNumberSuffix } from 'utils/formatBalance'
import {
  getHappyCowAddress,
  getMarketAddress,
  getAirNftAddress,
  getCowNftAddress,
  getBullNftAddress,
  getLandNftAddress
} from 'utils/addressHelpers'
import baseMilkPower from 'config/constants/baseMilkPower';
import toast from 'react-hot-toast'
import bullRecoveryTimes from 'config/constants/bullRecoveryTimes'
import landTypes from 'config/constants/landTypes'

const NftEachItemContainer = styled.div`
  cursor: pointer;
  flex: 1;
  margin-right: 15px;
  margin-bottom: 15px;
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
  width: 100%;
  font-size: 18px;
  line-height: 1.2;
  color: #431216;
  word-break: break-word;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  line-clamp: 2;
  display: flex;
  justify-content: space-between;
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
  font-size: 16px;
`

const ItemMetaData = styled.div`
  font-size: 18px;
  font-weight: 400;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const web3 = new Web3(Web3.givenProvider)

export interface EachNftInterface {
  eachMyToken?: any
}

const EachNft = ({ eachMyToken }: EachNftInterface) => {
  const { account } = useWallet()
  const { isDark } = useTheme()

  const [imageIpfsHash, setImageIpfsHash] = useState('')
  const [name, setName] = useState('')
  const [flgList, setFlgList] = useState(false)
  const [listedPrice, setListedPrice] = useState('')
  // const [itemId, setItemId] = useState(0);
  const [milkPrice, setMilkPrice] = useState(0)
  // NFT Clasifier dev@topospec
  const [nftMetaData, setNftMetaData] = useState('');
  const [nftType, setNftType] = useState('');

  const cakePriceUsd = usePriceCakeBusd()

  const marketContract = useMemo(() => {
    return new web3.eth.Contract(Market.abi as AbiItem[], getMarketAddress())
  }, [])

  const fetchMyNftImage = useCallback(async () => {
    try {
      const res = await fetch(eachMyToken.tokenHash)
      const json = await res.json()
      let imageUrl = json.image

      switch (eachMyToken.collection) {
        case getHappyCowAddress():
          // Case Happy Cow
          imageUrl = imageUrl.slice(7);
          setNftType('HC');
          setImageIpfsHash(`${PINATA_BASE_URI}${imageUrl}`);
          setNftMetaData(json.attributes[1].value);
          setName(json.name);
          break;
        case getAirNftAddress():
          // Case Genesis
          setNftType('AIR');
          setImageIpfsHash(imageUrl);
          setNftMetaData('Genesis NFT');
          setName(json.name);
          break;
        case getCowNftAddress():
          // Case Cow NFT
          const cowBreed = json.attributes[1].value;
          setNftType('COW');
          setNftMetaData(baseMilkPower[cowBreed]);
          setImageIpfsHash(imageUrl);
          setName(json.name + " #" + eachMyToken.tokenId);
          break;
        case getBullNftAddress():
          // Case Bull NFT
          setNftType('BULL');
          const bullBreed = json.attributes[1].value;
          setNftMetaData(bullRecoveryTimes[bullBreed]);
          console.log(json)
          setImageIpfsHash(imageUrl);
          setName(json.name + " #" + eachMyToken.tokenId);
          break;
        case getLandNftAddress():
          // Case Land NFT
          setImageIpfsHash(await fetchLandImage(json));
          setNftMetaData('Land NFT');
          setNftMetaData(json.attributes[1].value);
          // fetchLandImage(json)
          setNftType('LAND');
          setName(json.name + " #" + eachMyToken.tokenId);
          break;
        default:
          console.log('No Nft Found');
          break;
      }
    } catch (e) {
      toast.error('Error fetching your NFTs.')
    }
  }, [eachMyToken]);

  const fetchLandImage = async (json) => {
    console.log('fetching image for land:')
    const landBreed = json.attributes[1].value;
    const landRarity = json.attributes[0].value;
    return landTypes[landBreed][landRarity];
  }

  const fetchItemsCreated = useCallback(async () => {
    const res = await marketContract.methods.fetchItemsCreated().call({ from: account })
    for (let i = 0; i < res.length; i++) {
      if (eachMyToken.tokenId === res[i].tokenId && res[i].isSold === false) {
        setFlgList(true)
        setListedPrice(fromWei(res[i].price, 'ether'))
        break
      }
    }

    // const owner = await happyCowContract.methods.ownerOf(eachMyToken.tokenId).call();
    // setItemId(eachMyToken.itemId);

    setMilkPrice(cakePriceUsd.toNumber())
  }, [account, marketContract, eachMyToken, cakePriceUsd])

  useEffect(() => {
    fetchMyNftImage()
    fetchItemsCreated()
  }, [fetchMyNftImage, fetchItemsCreated])

  return (
    <div>
      <NftEachItemContainer
        style={{ background: isDark ? '#27262c' : '' }}
      >
        <ItemTop>
          <ItemMetaData
            style={{ color: isDark ? 'white' : '#27262c' }}
          >
            {nftType == "COW" ? <>
              <img
                src="/images/svgs/vida.svg"
                alt="token"
                style={{ width: '18px', height: '18px' }}
              />
              &nbsp;&nbsp;
              {nftMetaData}
            </>
              : <></>}
            {nftType == "BULL" ? <>
              <img
                src="/images/svgs/relojgreen.svg"
                alt="token"
                style={{ width: '18px', height: '18px' }}
              />
              &nbsp;&nbsp;
              {nftMetaData}
            </>
              : <></>}
            {nftType == "HC" ? <i>{nftMetaData}&nbsp;HC</i> : <></>}
            {nftType == "AIR" ? <i>{nftMetaData}</i> : <></>}
            {nftType == "LAND" ? <i>{nftMetaData}</i> : <></>}
          </ItemMetaData>
          <NftImageContainer>
            {nftType == "AIR" ?
              <NftImage
                style={{ backgroundImage: `url(/images/nfts/18-DancingCow.png)` }}
              />
              :
              <NftImage
                style={{ backgroundImage: `url(${imageIpfsHash})` }}
              />
            }

          </NftImageContainer>
          <Title>
            <TitleText
              style={{ color: isDark ? 'white' : '' }}
            >
              {nftType == "AIR" ?
                <div>Genesis</div>
                :
                <div>{name}</div>
              }
            </TitleText>
          </Title>
        </ItemTop>
        <ItemSeperation />
        {flgList ? (
          <ItemBottom>
            <ItemTitle style={{ color: isDark ? 'white' : '' }}>
              Sale Price
              <span> ≈ ${getNumberSuffix(Math.round(milkPrice * parseInt(listedPrice) * 100) / 100)}</span>
            </ItemTitle>
            <ItemValue style={{ color: isDark ? 'white' : '' }}>
              <ItemValueText>{getNumberSuffix(listedPrice)}</ItemValueText>
              <ItemValueToken>
                <img
                  src="/images/farms/milk.png"
                  alt="token"
                  style={{ width: '18px', height: '18px', marginRight: '4px' }}
                />
                MILK
              </ItemValueToken>
            </ItemValue>
          </ItemBottom>
        ) : (
          <ItemBottom>
            <div style={{ height: 50, color: isDark ? 'white' : '' }}>Not Listed</div>
          </ItemBottom>
        )}
      </NftEachItemContainer>
    </div>
  )
}

export default EachNft
