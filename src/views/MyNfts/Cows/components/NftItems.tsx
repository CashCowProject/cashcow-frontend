import React, { useState, useEffect, useMemo, useContext, useCallback } from 'react'
import styled from 'styled-components'
import CowNFT from 'config/abi/CowNFT.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'
import { useSelector } from 'react-redux'
import { getCowNftAddress } from 'utils/addressHelpers'
import NftEachItem from './NftEachItem'
import { State } from '../../../../state/types'
import { LoadingContext } from 'contexts/LoadingContext'
const NftItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
`
const chainId = process.env.REACT_APP_CHAIN_ID
const web3 = new Web3(Web3.givenProvider)

const NftItems = () => {
  const { account } = useWallet()
  const [selectedNfts, setSelectedNfts] = useState([])
  const { setLoading } = useContext(LoadingContext)
  const sortOrder = useSelector((state: State) => state.markets.sortOrder)

  const nftContract = useMemo(() => {
    return new web3.eth.Contract(CowNFT.abi as AbiItem[], getCowNftAddress())
  }, [])

  const fetchNftItems = useCallback(async () => {
    setLoading(true)
    const tokenIds = await nftContract.methods.tokenIdsOf(account).call()
    const filteredItems = []
    // const filteredTmpMarketItems = []
    for (let i = 0; i < tokenIds.length; i++) {
      const nftItem = {
        collectionName: 'Cow',
        tokenId: tokenIds[i],
      }
      console.log(tokenIds[i])
      filteredItems.push(nftItem)
    }
    setLoading(false)
    setSelectedNfts(filteredItems)
  }, [account, nftContract])

  useEffect(() => {
    fetchNftItems()
  }, [fetchNftItems])

  return (
    <NftItemContainer>
      {selectedNfts.map((nftEachItem) => {
        return <NftEachItem itemInfo={nftEachItem} key={nftEachItem.tokenId} />
      })}
    </NftItemContainer>
  )
}

export default NftItems
