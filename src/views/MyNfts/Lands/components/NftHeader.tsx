/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setSortOrder, setCollectionType } from 'state/markets'
import styled from 'styled-components'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import LandNFT from 'config/abi/LandNFT.json'
import { getLandNftAddress } from 'utils/addressHelpers'
import useTheme from 'hooks/useTheme'
import Select from '../../../../components/Select/Select'

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
  flex: left;
  align-items: center;
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

const SearchBox = styled.div`
  display: flex;
  position: relative;
`

const InputTag = styled.input`
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  height: 44px;
  line-height: 44px;
  box-sizing: border-box;
  font-size: 16px;
  padding: 0 68px 0 16px;
  display: flex;
  outline: none;
  width: 230px;
  color: #431216;
  background: transparent;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const LinkTag = styled.a`
  position: absolute;
  right: 4px;
  top: 4px;
  bottom: 4px;
  height: auto;
  padding: 0 20px;
  transform: translateY(0) !important;
  border: 0 none;
  background: #00d86c;
  border-radius: 12px;
  display: flex;
  align-items: center;
`

const filterByType = [
  { label: 'All Types', value: { field: 'All', direction: 'asc' } },
  { label: 'Mountains', value: { field: 'Mountains', direction: 'desc' } },
  { label: 'Plains', value: { field: 'Plains', direction: 'asc' } },
  { label: 'Woods', value: { field: 'Woods', direction: 'asc' } },
  { label: 'Jungle', value: { field: 'Jungle', direction: 'asc' } },
  { label: 'Hills', value: { field: 'Hills', direction: 'asc' } },
]

const filterByRarity = [
  { label: 'All Rarities', value: { field: 'All', direction: 'asc' } },
  { label: 'Common', value: { field: 'Common', direction: 'desc' } },
  { label: 'Uncommon', value: { field: 'Uncommon', direction: 'asc' } },
  { label: 'Rare', value: { field: 'Rare', direction: 'asc' } },
  { label: 'Legendary', value: { field: 'Legendary', direction: 'asc' } },
  { label: 'Holy', value: { field: 'Holy', direction: 'asc' } },
]

const chainId = process.env.REACT_APP_CHAIN_ID
const web3 = new Web3(Web3.givenProvider)

const NftHeader = () => {
  const dispatch = useDispatch()
  const { isDark } = useTheme()
  const { account } = useWallet()
  const [totalAmount, setTotalAmount] = useState(0)

  const nftContract = useMemo(() => {
    return new web3.eth.Contract(LandNFT.abi as AbiItem[], getLandNftAddress())
  }, [])

  const fetchInfo = useCallback(async () => {
    const nftAmount = await nftContract.methods.balanceOf(account).call()
    setTotalAmount(nftAmount);
  }, [account, nftContract])

  useEffect(() => {
    fetchInfo()
  }, [fetchInfo])

  return (
    <NftHeaderContainer>
      <LeftContainer style={{ color: isDark ? 'white' : '' }}>
        { account ? <>Total : {totalAmount}</> : <>Connect your wallet</> }
      </LeftContainer>
      <RightContainer>
        <Select
          options={filterByType}
          onOptionChange={(option) => dispatch(setSortOrder(option.value))}
          style={{ marginRight: '15px', background: isDark ? '#27262c' : '' }}
        />
        <Select
          options={filterByRarity}
          onOptionChange={(option) => dispatch(setCollectionType(option.value))}
          style={{ marginRight: '15px' }}
        />
        {/* <SearchBox>
          <InputTag placeholder="Please enter keywords to search" />
          <LinkTag>
            <img alt="search icon" style={{ width: 30, height: 30 }} src="https://img.icons8.com/FFFFFF/search" />
          </LinkTag>
        </SearchBox> */}
      </RightContainer>
    </NftHeaderContainer>
  )
}

export default NftHeader
