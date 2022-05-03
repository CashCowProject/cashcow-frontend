import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils';
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTheme from 'hooks/useTheme'
import CowNFT from 'config/abi/CowNFT.json';
import { getCowNftAddress } from 'utils/addressHelpers';
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
const web3 = new Web3(Web3.givenProvider)

export interface NftItemInterface {
  itemInfo?: any
}

const NftEachItem = ({ itemInfo }: NftItemInterface) => {
  const { account } = useWallet()
  const { isDark } = useTheme()
  const [image, setImage] = useState('');
  const nftContract = useMemo(() => {
    return new web3.eth.Contract(CowNFT.abi as AbiItem[], getCowNftAddress());
  }, [])

  const fetchNftItems = useCallback(async () => {
    let nftHash = null;
    nftHash = await nftContract.methods.tokenURI(itemInfo.tokenId).call({from: account})
    const res = await fetch(nftHash);
    const json = await res.json();
    let imageUrl = json.image;
    setImage(imageUrl);
  }, [])

  useEffect(() => {
    fetchNftItems();
  }, [fetchNftItems])
  return (
    <Link to={`/cows/${itemInfo.tokenId}`}>
      <NftEachItemContainer style={{ background: isDark ? '#27262c' : '' }}>
        <ItemTop>
          <NftImageContainer>
            <NftImage style={{ backgroundImage: `url(${image})` }} />
          </NftImageContainer>
          <Title>
            <TitleText style={{ color: isDark ? 'white' : '' }}>
              {itemInfo.collectionName}
              #
              {itemInfo.tokenId}
            </TitleText>
          </Title>
        </ItemTop>
        <ItemSeperation />
        <ItemBottom>
          Description
        </ItemBottom>
      </NftEachItemContainer>
    </Link>
  )
}

export default NftEachItem
