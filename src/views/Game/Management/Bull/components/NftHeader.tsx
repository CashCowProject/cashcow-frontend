/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useMemo, useCallback, useEffect, useContext } from 'react'

import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { Button } from 'cashcow-uikit'
import { useSelector } from 'react-redux'
import { State } from 'state/types'
import BullNFT from 'config/abi/BullNFT.json'
import NftFarming from 'config/abi/NftFarming.json'
import { getNftFarmingAddress, getBullNftAddress } from 'utils/addressHelpers'
import Web3 from 'web3'
import { fromWei, AbiItem, toBN, toWei } from 'web3-utils'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import SelectNFT from "./SelectNFT"
import { CASH_BULLNFT_IMAGE_BASEURI, CATTLE_RARITY, BULL_BREED } from 'config/constants/nfts'
import { LoadingContext } from 'contexts/LoadingContext'
import { setBullNftCount, updating } from 'state/bullManagement'
import Select from '../../../../../components/Select/Select'
import '../../management.css'

const NftHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const LeftContainer = styled.div`
  display:flex;
  flex: left;
  width:50%;
  height:70px;
  align-items: center;
  padding: 10px;
  border-radius: 15px;
  @media (max-width: 900px) {
    width: 100%;
  }
`

const RightContainer = styled.div`
  display: flex;
  flex: right;
  align-items: center;

  @media (max-width: 768px) {
    margin-top: 10px;
    flex-wrap: wrap;

    > div {
      width: 40%;
      margin-top: 10px;
    }
  }
`
const Total = styled.div`
  font-size: 1.5em;
  padding-left: 1em;
  display:flex;
  flex: 5;
`
const ButtonContainer = styled.div`
  display:flex;
  flex: 5;
  justify-content: flex-end;
`
const Blank = styled.div`
  flex: auto;
`
const sortByItems = [
  { label: 'Recently listed', value: { field: 'RecentlyListed', direction: 'desc' } },
  { label: 'Lowest price', value: { field: 'LowestPrice', direction: 'asc' } },
  { label: 'Highest price', value: { field: 'HighestPrice', direction: 'desc' } },
]

const filterByCollection = [
  { label: 'All NFTs', value: { field: 'All', direction: 'asc' } },
  { label: 'HappyCows', value: { field: 'HappyCows', direction: 'desc' } },
  { label: 'Genesis', value: { field: 'AirNFT', direction: 'asc' } },
]
const web3 = new Web3(Web3.givenProvider)

const NftHeader = () => {
  const dispatch = useDispatch()
  const updated = useSelector((state: State) => state.bull.updated)
  const { isDark } = useTheme()
  const itemCount = useSelector((state: State) => state.bull.bullItemCount)
  const { account }: { account: string; } = useWallet()
  const [isOpen, setIsOpen] = useState(false);
  const [myNfts, setMyNfts] = useState([]);
  const { setLoading } = useContext(LoadingContext);
  const nftContract = useMemo(() => {
    return new web3.eth.Contract(BullNFT.abi as AbiItem[], getBullNftAddress())
  }, [])
  const NFTFarmingContract = new web3.eth.Contract(NftFarming.abi as AbiItem[], getNftFarmingAddress())

  const farmActionHandler = async (_tokenId: string) => {
    try {
      setLoading(true);
      setIsOpen(false);
      await nftContract.methods.approve(getNftFarmingAddress(), _tokenId).send({ from: account });
      await NFTFarmingContract.methods.depositBull(_tokenId).send({ from: account });
      dispatch(updating(!updated))
      setLoading(false)
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }
  const fetchNftItems = useCallback(async () => {
    const tokenIds = await nftContract.methods.tokenIdsOf(account).call();
    let attrs = []
    for (let i = 0; i < tokenIds.length; i++) {
      const temp = {};
      const attr = await nftContract.methods.attrOf(tokenIds[i]).call();
      const _image = CASH_BULLNFT_IMAGE_BASEURI + CATTLE_RARITY[parseInt(attr.rarity)] + "-" + BULL_BREED[parseInt(attr.breed)] + ".png";
      const _rarity = CATTLE_RARITY[parseInt(attr.rarity)];
      const _name = BULL_BREED[parseInt(attr.breed)];
      const _data = _name + _rarity;
      temp['data'] = _data;
      temp["image"] = _image;
      temp["rarity"] = _rarity;
      temp["tokenId"] = tokenIds[i];
      temp["nftMetaData"] = await fetchBullRecoveryTime(tokenIds[i]);
      attrs.push(temp);
    }
    setMyNfts(attrs);

  }, [account, updated])

  const fetchBullRecoveryTime = async (bullID) => {
    console.log('Fetching recuperation time for bull: ', bullID)

    const currentTimestamp = new Date().getTime() / 1000;
    const maxRecoveryTime = 1080 * 60 * 60;
    const maxAge = 730 * 24 * 60 * 60;

    const res = await nftContract.methods.attrOf(bullID).call({ from: account })

    const bullAge = currentTimestamp - res.birth;

    const bullBreed = res.breed;
    const bullRarity = parseInt(res.rarity);

    const baseRecoveryTimes = [432000, 648000, 1080000, 1728000, 2592000]
    let bullRecoveryTime = (baseRecoveryTimes[bullRarity] + ((maxRecoveryTime - baseRecoveryTimes[bullRarity]) * (bullAge / maxAge))) / (60 * 60)

    console.log('>>>>> ', bullRecoveryTime)
    return bullRecoveryTime.toFixed(0);
  }


  useEffect(() => {
    fetchNftItems()
  }, [account, updated])

  return (
    <NftHeaderContainer>
      <LeftContainer
        style={{
          color: isDark ? 'white' : 'white',
          fontWeight: 'bold',
          background: isDark ? '#0b334b' : '#0b334b',
          paddingTop: '10px',
          paddingBottom: '10px'
        }}
      >        <Total>
          Total Bulls: {itemCount}
        </Total>
        <Blank />
        <ButtonContainer>
          <div className="add-nft-div">
            <img
              className="add-nft-div-button"
              src={'/images/farms/management/addbullgreen.png'}
              onClick={() => setIsOpen(true)}
            />
          </div>
        </ButtonContainer>
      </LeftContainer>
      {/* <RightContainer>
        <Select
          options={sortByItems}
          // onOptionChange={(option) => dispatch(setSortOrder(option.value))}
          style={{ marginRight: '15px', background: isDark ? '#27262c' : '' }}
        />
        <Select
          options={filterByCollection}
          // onOptionChange={(option) => dispatch(setCollectionType(option.value))}
          style={{ marginRight: '15px' }}
        />
      </RightContainer> */}
      <SelectNFT
        isOpen={isOpen}
        closeDialog={() => setIsOpen(false)}
        myNfts={myNfts}
        actionHandler={farmActionHandler}
      />
    </NftHeaderContainer>
  )
}

export default NftHeader
