import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react'
import styled from 'styled-components'
import NftFarming from 'config/abi/NftFarming.json'
import BullNFT from 'config/abi/BullNFT.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'
import { useSelector } from 'react-redux'
import { getNftFarmingAddress, getBullNftAddress } from 'utils/addressHelpers'
import NftEachItem from './NftEachItem'
import { State } from 'state/types'
import { CASH_BULLNFT_IMAGE_BASEURI, CATTLE_RARITY, BULL_BREED } from 'config/constants/nfts'

import { useDispatch } from 'react-redux'
import { setBullNftCount } from 'state/bullManagement'
import { LoadingContext } from 'contexts/LoadingContext'

const NftItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
  @media (max-width: 700px) {
    justify-content: center;
  }
`
const chainId = process.env.REACT_APP_CHAIN_ID
const web3 = new Web3(Web3.givenProvider)

const NftItems = () => {
  const { account } = useWallet()
  const [nftItems, setNftItems] = useState([])
  const { setLoading } = useContext(LoadingContext)
  const dispatch = useDispatch()
  const updated = useSelector((state: State) => state.bull.updated)
  const farmContract = useMemo(() => {
    return new web3.eth.Contract(NftFarming.abi as AbiItem[], getNftFarmingAddress())
  }, [])
  const nftContract = useMemo(() => {
    return new web3.eth.Contract(BullNFT.abi as AbiItem[], getBullNftAddress())
  }, [account])
  const fetchNftItems = useCallback(async () => {
    setLoading(true)
    try {
      const bullTokenIds = await farmContract.methods.bullTokenIdsOf(account).call({ from: account })
      let items = []
      for (let id of bullTokenIds) {
        let attr = await nftContract.methods.attrOf(id).call()
        let _image =
          CASH_BULLNFT_IMAGE_BASEURI +
          CATTLE_RARITY[parseInt(attr.rarity)] +
          '-' +
          BULL_BREED[parseInt(attr.breed)] +
          '.png'
        let item = {
          image: _image,
          tokenId: id,
          rarity: attr.rarity,
        }
        items.push(item)
      }
      setLoading(false)
      dispatch(setBullNftCount(items.length))
      setNftItems(items)
    } catch (error) {
      setLoading(false)
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
          />
        )
      })}
    </NftItemContainer>
  )
}

export default NftItems
