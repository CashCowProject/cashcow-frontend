import React, { useState, useEffect, useContext, useMemo } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Web3 from 'web3'
import { fromWei, AbiItem } from 'web3-utils'
import NftFarmingV2 from 'config/abi/NftFarmingV2.json'
import { LoadingContext } from 'contexts/LoadingContext'
import cow from 'config/abi/cow.json'
import milk from 'config/abi/MilkToken.json'
import { getCowTokenAddress, getMilkAddress, getNftFarmingAddress } from 'utils/addressHelpers'
import styled from 'styled-components'
import { getNumberSuffix } from 'utils/formatBalance'
import toast from 'react-hot-toast'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'

export interface CardInterface {
  title?: string
  value?: any
  image?: string
}

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  border-radius: 32px;
  background-color: rgb(11, 51, 75);
  color: white;
  display: flex;
  @media (max-width: 768px) {
    margin-top: 1em;
    margin-left: 5%;
    width: 90%;
  }
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 50%;
`
const ImageContainer = styled.div`
  display: flex;
  padding: 20px;
  flex: 50%;
  text-align: center;
  vertical-align: middle;
`
const TitleContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  font-size: 1.8em;
  font-weight: 600;
  line-height: 1.2;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 768px) {
    font-size: 5vw;
  }
`
const ValueContainer = styled.div`
  width: 100%;
  font-size: 1.7em;
  font-weight: 5000;
  line-height: 1.2;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    font-size: 5vw;
  }
`

const ButtonsContainer = styled.div`
  display: flex;
`

const EachButtonContainer = styled.div`
  text-align: center;
  flex: 50%;
`

const web3 = new Web3(Web3.givenProvider)

const StaticCard = ({ title, value, image }: CardInterface) => {
  const { account, connect } = useWallet()

  const [loadingCow, setLoadingCow] = useState(false)
  const [staking, setStaking] = useState(false)
  const [unstaking, setUnstaking] = useState(false)
  // Deposit Modal
  const [isOpen, setIsOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  // User COW Balance
  const [cowBalance, setCowBalance] = useState('')
  const [cowStaked, setCowStaked] = useState('')

  const farmingContract = new web3.eth.Contract(NftFarmingV2.abi as AbiItem[], getNftFarmingAddress())
  // const cowContract = new web3.eth.Contract(cow as AbiItem[], getCowTokenAddress());
  const cowContract = new web3.eth.Contract(cow as AbiItem[], getCowTokenAddress())

  const { setLoading } = useContext(LoadingContext)

  useEffect(() => {
    initData()
  }, [account])

  const initData = async () => {
    await fetchUserCowBalance()
    await fetchUserCowStaked()
  }

  const fetchUserCowBalance = async () => {
    console.log('Fetching user COW balance...')
    try {
      if (account) {
        const userCowBalance = await cowContract.methods.balanceOf(account).call({ from: account })
        console.log(userCowBalance / 10 ** 9)
        setCowBalance(Math.floor(userCowBalance / 10 ** 9).toFixed(0))
        console.log('COW in wallet: ', (userCowBalance / 10 ** 18).toFixed(1))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const fetchUserCowStaked = async () => {
    console.log('Fetching user staked COW...')
    try {
      if (account) {
        const userCowStaked = await farmingContract.methods.stakedCowOf(account).call({ from: account })
        console.log(userCowStaked)
        setCowStaked(Math.floor(userCowStaked / 10 ** 9).toFixed(0))
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleStakeCow = async (val) => {
    console.log(parseFloat(val), parseFloat(cowBalance))
    if (parseFloat(val) > parseFloat(cowBalance)) {
      toast.error('Insufficient COW in your wallet.')
    } else {
      console.log('Staking cow...')
      setLoading(true)
      setIsOpen(false)
      const txnAmount = (parseInt(val) * 10 ** 9).toFixed(0)
      try {
        if (account) {
          const allowance = await cowContract.methods.allowance(account, getNftFarmingAddress()).call()
          console.log('Allowance ', allowance)
          console.log('Depositing ', txnAmount)
          if (allowance < txnAmount) {
            console.log('Falta')
            const approval = await cowContract.methods
              .approve(getNftFarmingAddress(), txnAmount)
              .send({ from: account })
            console.log('Approval ', approval)
          }
          const tx = await farmingContract.methods.depositCowTokens(txnAmount).send({ from: account })
          await initData()
        }
      } catch (e) {
        console.log(e)
        toast.error('An error has ocurred. Please refresh and retry.')
      }
      setLoading(false)
    }
  }

  const handleUnstakeCow = async (val) => {
    console.log('Unstaking cow...')
    if (parseFloat(val) > parseFloat(cowStaked)) {
      toast.error('Insufficient COW staked.')
    } else {
      setLoading(true)
      setIsWithdrawOpen(false)
      try {
        if (account) {
          await farmingContract.methods.withdrawCowTokens(val * 10 ** 9).send({ from: account })
          await initData()
        }
      } catch (e) {
        console.log(e)
        toast.error('An error has ocurred. Please refresh and retry.')
      }
      setLoading(false)
    }
  }

  return (
    <Container>
      <ImageContainer>
        <img src={image} alt="mymilkpower"></img>
      </ImageContainer>
      <ContentContainer>
        <TitleContainer>$COW</TitleContainer>
        <ValueContainer>
          {/* {getNumberSuffix(value, 0)} */}
          {cowStaked}
        </ValueContainer>
        <ButtonsContainer>
          <EachButtonContainer>
            <img
              src="/images/nfts/buttons/less_cow.png"
              onClick={() => setIsWithdrawOpen(true)}
              style={{ width: '60%', paddingLeft: '10px', cursor: 'pointer' }}
            />
          </EachButtonContainer>
          <EachButtonContainer>
            <img
              src="/images/nfts/buttons/more_cow.png"
              onClick={() => setIsOpen(true)}
              style={{ width: '60%', paddingRight: '10px', cursor: 'pointer' }}
            />
          </EachButtonContainer>
        </ButtonsContainer>
      </ContentContainer>
      <DepositModal isOpen={isOpen} setIsOpen={setIsOpen} cowBalance={cowBalance} handleStakeCow={handleStakeCow} />
      <WithdrawModal
        isOpen={isWithdrawOpen}
        setIsOpen={setIsWithdrawOpen}
        cowStaked={cowStaked}
        handleUnstakeCow={handleUnstakeCow}
      />
    </Container>
  )
}

export default StaticCard
