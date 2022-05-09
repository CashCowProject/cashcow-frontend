/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useMemo, useCallback, useEffect, useContext } from 'react'

import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import Select from '../../../../../components/Select/Select'
import { Button } from 'cashcow-uikit'
import { useSelector } from 'react-redux'
import { State } from 'state/types'
import LandNFT from 'config/abi/LandNFT.json'
import NftFarming from 'config/abi/NftFarming.json'
import { getLandNftAddress, getNftFarmingAddress, getNftBreedingAddress, getNftSaleAddress } from 'utils/addressHelpers'
import Web3 from 'web3'
import { fromWei, AbiItem, toBN, toWei } from 'web3-utils'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import SelectNFT from "./SelectNFT"
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
  width:40%;
  height:60px;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
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
  const { isDark } = useTheme()
  const itemCount = useSelector((state: State) => state.land.landItemCount)
  const { account }: { account: string;} = useWallet()
  const [isOpen, setIsOpen] = useState(false);
  const [mytokenIds, setTokenIds] = useState([])
  const nftContract = useMemo(() => {
    return new web3.eth.Contract(LandNFT.abi as AbiItem[], getLandNftAddress())
  }, [])
  const NFTFarmingContract = new web3.eth.Contract(NftFarming.abi as AbiItem[], getNftFarmingAddress())

  // const farmActionHandler = async (_tokenId: string) =>{
  //   try{
  //     await nftContract.methods.approve(getNftFarmingAddress() ,_tokenId).send({ from: account });
  //     await NFTFarmingContract.methods.depositLand(_tokenId).send({ from: account });
  //   }catch (error) {
  //     console.log(error)
  //   }
  // }
  const fetchNftItems = useCallback(async () => {
    const tokenIds = await nftContract.methods.tokenIdsOf(account).call();
    setTokenIds(tokenIds);

  }, [account])
  useEffect(() =>{
    fetchNftItems()
  }, [account])
  const openSelectModal =async () =>{

  }
  return (
    <NftHeaderContainer>
      <LeftContainer style={{ color: isDark ? 'white' : '#035569', fontWeight: 'bold', background:'white' }}>
        <Total>
          TOTAL LANDS: {itemCount}
        </Total>
        <Blank />
        <ButtonContainer>
          <Button onClick = {()=>setIsOpen(true)}>
            ADD LAND
          </Button>
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
        closeDialog={()=>setIsOpen(false)}
        tokenIds = {mytokenIds}
      />
    </NftHeaderContainer>
  )
}

export default NftHeader
