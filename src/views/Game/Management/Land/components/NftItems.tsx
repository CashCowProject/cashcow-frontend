import React, { useState, useEffect, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import NftFarming from 'config/abi/NftFarming.json'
import LandNFT from 'config/abi/LandNFT.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'
import { useSelector } from 'react-redux'
import { getNftFarmingAddress, getLandNftAddress } from 'utils/addressHelpers'
import addresses from 'config/constants/contracts'
import NftEachItem from './NftEachItem'
import { State } from 'state/types'
import {CASH_LANDNFT_IMAGE_BASEURI, LAND_RARITY, LAND_KIND } from 'config/constants/nfts'

import { useDispatch } from 'react-redux'
import { setLandNftCount  } from 'state/landManagement'


const NftItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`
const chainId = process.env.REACT_APP_CHAIN_ID
const web3 = new Web3(Web3.givenProvider)

const NftItems = () => {
  const { account } = useWallet()
  const [nftItems, setNftItems] = useState([])
  const dispatch = useDispatch()
  const updated = useSelector((state: State) => state.land.updated)
  const farmContract = useMemo(() => {
    return new web3.eth.Contract(NftFarming.abi as AbiItem[], getNftFarmingAddress())
  }, [])
  const nftContract = useMemo(() =>{
    return new web3.eth.Contract(LandNFT.abi as AbiItem[], getLandNftAddress())
  }, [account])
  const fetchNftItems = useCallback(async () => {
    const landTokenIds = await farmContract.methods.landTokenIdsOf(account).call({ from: account });
    let items = [];
    for(let id of landTokenIds){
      let attr = await nftContract.methods.attrOf(id).call();
      let _image = CASH_LANDNFT_IMAGE_BASEURI + LAND_RARITY[parseInt(attr.rarity)] + "-" + LAND_KIND[parseInt(attr.landType)] + ".png";
      let item = {
        "image": _image,
        "tokenId": id,
        "rarity" : attr.rarity
      }
      items.push(item);
    }
    dispatch(setLandNftCount(items.length))
    setNftItems(items)
    console.log(updated)
  }, [account, updated])

  useEffect(() => {
    fetchNftItems()
  }, [fetchNftItems, updated, account])

  return (
    <NftItemContainer>
      {nftItems.map((nftEachItem) => {
        return <NftEachItem image = {nftEachItem.image} tokenId = {nftEachItem.tokenId} rarity = {nftEachItem.rarity} key={nftEachItem.itemId} />
      })}
    </NftItemContainer>
  )
}

export default NftItems
