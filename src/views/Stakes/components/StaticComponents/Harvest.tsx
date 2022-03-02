import _ from 'lodash'
import React, { useContext } from 'react'
import { Flex, Image, Text, Button } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { usePriceCakeBusd } from 'state/hooks'
import { getHappyCowAddress, getStakingAddress, getAirNftAddress } from 'utils/addressHelpers'
import HappyCows from 'config/abi/HappyCows.json'
import Staking from 'config/abi/Staking.json'
import AirNfts from 'config/abi/AirNft.json'
import toast from 'react-hot-toast'
import { LoadingContext } from 'contexts/LoadingContext'
import { StakeContext } from 'contexts/StakeContext'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import useI18n from 'hooks/useI18n'
import airNFTs from 'config/constants/airnftsTemp'
import { getNumberSuffix } from 'utils/formatBalance'

const web3 = new Web3(Web3.givenProvider)

const happyCowsContract = new web3.eth.Contract(HappyCows.abi as AbiItem[], getHappyCowAddress())
const airnftContract = new web3.eth.Contract(AirNfts.abi as AbiItem[], getAirNftAddress())
const stakingContract = new web3.eth.Contract(Staking.abi as AbiItem[], getStakingAddress())

const Harvet = ({ rewardAllMilk, index }) => {
  const TranslateString = useI18n()
  const cakePriceUsd = usePriceCakeBusd()

  const { account } = useWallet()
  const { setLoading } = useContext(LoadingContext)
  const { initMyNFTS, initSelectedNFTs } = useContext(StakeContext)

  const harvestHandler = async () => {
    setLoading(true)

    try {
      await stakingContract.methods.harvest(index).send({ from: account })
      toast.success('Successfully Harvest For All NFT.')
    } catch (error) {
      const { message } = error as Error
      toast.error(message)
    }

    const tmpStakingItems = await stakingContract.methods.getStakedItems(account).call()
    const stakingItems = []
    for (let i = 0; i < tmpStakingItems.length; i++) {
      if (index === '1' && tmpStakingItems[i].contractAddress === getHappyCowAddress())
        stakingItems.push(tmpStakingItems[i])
      else if (index === '2' && tmpStakingItems[i].contractAddress === getAirNftAddress())
        stakingItems.push(tmpStakingItems[i])
    }

    initSelectedNFTs(stakingItems)

    // Init My NFTs again

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

    setLoading(false)
  }
  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between">
        <Text>Milk Earned</Text>
        <Button
          mt="8px"
          fullWidth
          onClick={harvestHandler}
          style={{
            fontSize: '14px',
            fontWeight: 400,
            height: '28px',
            lineHeight: 1.5,
            padding: '0 8px',
            whiteSpace: 'nowrap',
            borderRadius: '16px',
            width: '80px',
          }}
        >
          {TranslateString(10007, 'Harvest')}
        </Button>
      </Flex>
      <Flex mt="12px">
        <Image src="/images/farms/milk.png" alt="MILK" width={32} height={32} />
        <Text color="secondary" fontSize="24px" pr="3px" ml="6px">
          {getNumberSuffix(rewardAllMilk / 1000000, 3)}
        </Text>
        <Text textTransform="uppercase" color="textSubtle" fontSize="18px" style={{ lineHeight: 2 }}>
          {`≈ $${cakePriceUsd.toNumber() * rewardAllMilk}`}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Harvet
