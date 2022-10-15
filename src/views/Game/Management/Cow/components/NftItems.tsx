import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react'
import styled from 'styled-components'
import { LoadingContext } from "contexts/LoadingContext"
import NftFarming from 'config/abi/NftFarming.json'
import CowNFT from 'config/abi/CowNFT.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'
import { useSelector } from 'react-redux'
import { getNftFarmingAddress, getCowNftAddress } from 'utils/addressHelpers'
import NftEachItem from './NftEachItem'
import { State } from 'state/types'
import { CASH_COWNFT_IMAGE_BASEURI, CATTLE_RARITY, COW_BREED } from 'config/constants/nfts'

import { useDispatch } from 'react-redux'
import { setCowNftCount } from 'state/cowManagement'

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
  const { setLoading } = useContext(LoadingContext);
  const dispatch = useDispatch()
  const updated = useSelector((state: State) => state.cow.updated)
  const farmContract = useMemo(() => {
    return new web3.eth.Contract(NftFarming.abi as AbiItem[], getNftFarmingAddress())
  }, [])
  const nftContract = useMemo(() => {
    return new web3.eth.Contract(CowNFT.abi as AbiItem[], getCowNftAddress())
  }, [])
  const fetchNftItems = useCallback(async () => {
    setLoading(true);
    try {
      const cowTokenIds = await farmContract.methods.cowTokenIdsOf(account).call({ from: account });
      const items = [];
      for (let id of cowTokenIds) {
        let attr = await nftContract.methods.attrOf(id).call();
        let _image = CASH_COWNFT_IMAGE_BASEURI + CATTLE_RARITY[parseInt(attr.rarity)] + "-" + COW_BREED[parseInt(attr.breed)] + ".png";
        let item = {
          "image": _image,
          "tokenId": id,
          "rarity": attr.rarity
        }
        items.push(item);
      }
      setLoading(false)
      dispatch(setCowNftCount(items.length))
      setNftItems(items)
    } catch (error) {
      setLoading(false);
    }
  }, [account, updated])

  useEffect(() => {
    fetchNftItems()
  }, [fetchNftItems, updated, account])

  return (
    <NftItemContainer>
      {nftItems.map((nftEachItem) => {
        return (
          <NftEachItem
            image={nftEachItem.image}
            tokenId={nftEachItem.tokenId}
            rarity={nftEachItem.rarity}
            key={nftEachItem.itemId}
          />)
      })}
    </NftItemContainer>
  )
}

export default NftItems
