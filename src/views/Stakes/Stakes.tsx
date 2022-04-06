import _ from 'lodash'
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from 'styled-components'
import Page from 'components/layout/Page'
import { StakeContext } from 'contexts/StakeContext'
import { LoadingContext } from 'contexts/LoadingContext'
import { AbiItem } from 'web3-utils'
import { Heading } from 'cashcow-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { getHappyCowAddress, getAirNftAddress, getStakingAddress } from 'utils/addressHelpers'
import Web3 from 'web3'
import AirNfts from 'config/abi/AirNft.json'
import Staking from 'config/abi/Staking.json'
import HappyCows from 'config/abi/HappyCows.json'
import airNFTs from 'config/constants/airnfts'
import { StatisticsInfo, StakeItems } from './components'

const web3 = new Web3(Web3.givenProvider)
const happyCowsContract = new web3.eth.Contract(HappyCows.abi as AbiItem[], getHappyCowAddress())

const stakingContract = new web3.eth.Contract(Staking.abi as AbiItem[], getStakingAddress())

const airnftContract = new web3.eth.Contract(AirNfts.abi as AbiItem[], getAirNftAddress())

type boxParam = {
  index: string
}

const Stakes = () => {
  const { index } = useParams<boxParam>()
  const { account } = useWallet()
  const { initMyNFTS, initSelectedNFTs } = useContext(StakeContext)
  const { setLoading } = useContext(LoadingContext)
  const { isDark } = useTheme()

  useEffect(() => {
    if (!account) return

    async function fetchMyNFTS() {
      setLoading(true)
      const tokenIds = []
      const tmpMyTokens = []
      if (index === '1') {
        const happyCowTokens = await happyCowsContract.methods.fetchMyNfts().call({ from: account })

        _.map(happyCowTokens, (itm) => {
          tokenIds.push({ tokenId: itm, isAIR: false })
        })
      }

      // retrieve my nft from air
      else {
        const airNftOwners = []
        _.map(airNFTs, (nft) => {
          airNftOwners.push(airnftContract.methods.ownerOf(nft).call())
        })
        const owners = await Promise.all(airNftOwners)
        _.map(owners, (owner, idx) => {
          if (owner.toLowerCase() !== account.toLowerCase()) return
          tokenIds.push({ tokenId: airNFTs[idx], isAIR: true })
        })
      }

      const myTokenHashes = []
      for (let i = 0; i < tokenIds.length; i++) {
        if (!tokenIds[i].isAIR) myTokenHashes.push(happyCowsContract.methods.tokenURI(tokenIds[i].tokenId).call())
        else myTokenHashes.push(airnftContract.methods.tokenURI(tokenIds[i].tokenId).call())
      }
      const result = await Promise.all(myTokenHashes)
      for (let i = 0; i < tokenIds.length; i++) {
        if (!tmpMyTokens[i]) tmpMyTokens[i] = {}
        tmpMyTokens[i].tokenId = tokenIds[i].tokenId
        tmpMyTokens[i].tokenHash = result[i]
        tmpMyTokens[i].isAIR = tokenIds[i].isAIR
        if (!tokenIds[i].isAIR) tmpMyTokens[i].contractAddress = getHappyCowAddress()
        else tmpMyTokens[i].contractAddress = getAirNftAddress()
      }

      initMyNFTS(tmpMyTokens)

      const tmpStakingItems = await stakingContract.methods.getStakedItems(account).call()
      const stakingItems = []
      for (let i = 0; i < tmpStakingItems.length; i++) {
        if (index === '1' && tmpStakingItems[i].contractAddress === getHappyCowAddress())
          stakingItems.push(tmpStakingItems[i])
        else if (index === '2' && tmpStakingItems[i].contractAddress === getAirNftAddress())
          stakingItems.push(tmpStakingItems[i])
      }
      initSelectedNFTs(stakingItems)
      setLoading(false)
    }

    fetchMyNFTS()
    // eslint-disable-next-line
  }, [account, index])

  return (
    <Page
      style={{
        backgroundImage: isDark ? `url(/images/cow/home-backgrounddark.png)` : `url(/images/cow/home-backgroundlight.png)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Heading as="h1" size="lg" color="text" mb="25px" style={{ textAlign: 'center' }}>
        <StatisticsInfo index={index} />
      </Heading>
      <StakeItems index={index} />
    </Page>
  )
}

export default Stakes
