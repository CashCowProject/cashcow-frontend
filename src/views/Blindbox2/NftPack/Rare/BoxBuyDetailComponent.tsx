import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { Button } from 'cashcow-uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import NftSale from 'config/abi/NftSale.json'
import BUSD from 'config/abi/BUSD.json'
import { fromWei, AbiItem, toBN } from 'web3-utils'
import { LoadingContext } from 'contexts/LoadingContext'
import { getNftSaleAddress, getBusdAddress } from 'utils/addressHelpers'
import Web3 from 'web3'
import useTheme from 'hooks/useTheme'

const BoxTitle = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #431216;
  word-break: break-word;
`
const RemainingAmount = styled.div`
  font-size: 16px;
  color: #694f4e;
  margin-top: 24px;
  word-break: break-word;
`

const BoxPrice = styled.div`
  margin-top: 32px;
  border-radius: 16px;
  box-shadow: 0 6px 12px 0 rgb(0 0 0 / 6%), 0 -1px 2px 0 rgb(0 0 0 / 2%);
  display: flex;
`

const BoxPriceContainer = styled.div`
  padding: 16px;
  flex: 1;
`

const PriceDetailContainer = styled.div`
  font-size: 28px;
  color: #431216;
  font-weight: 700;
  margin-top: 6px;
  display: flex;
  align-items: center;
  & > button {
    margin-left: auto;
    margin-right: 0;
    width: 160px;
  }
`

const BuyNowBtnContainer = styled.div`
  margin-top: 40px;
`

const BoxBuyDetailComponent = () => {
  const { setLoading } = useContext(LoadingContext)
  const { isDark } = useTheme()
  const { account, connect } = useWallet()
  const [mintingState, setMintingState] = useState(true)
  const [whitelistedStatus, setWhitelistedStatus] = useState(false)
  const [price, setPrice] = useState('0')

  /** Styles Div */

  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  useEffect(() => {
    async function fetchPrice() {
      const web3 = new Web3(Web3.givenProvider)
      const saleContract = new web3.eth.Contract(NftSale.abi as AbiItem[], getNftSaleAddress())
      const packPrice = await saleContract.methods.packPrices(2).call()
      setPrice(packPrice)
    }

    fetchPrice()
  })

  useEffect(() => {
    async function fetchWhitelistedStatus() {
      const web3 = new Web3(Web3.givenProvider)
      const saleContract = new web3.eth.Contract(NftSale.abi as AbiItem[], getNftSaleAddress())
      const retv = await saleContract.methods.whitelisted(account, 2).call()
      console.log(retv)
      setWhitelistedStatus(retv > 0)
    }

    fetchWhitelistedStatus()
  }, [account])

  const buyButtonHandler = async () => {
    if (!whitelistedStatus) {
      toast.error('This wallet is not whitelisted to buy Rare Pack.')
      return
    }
    setMintingState(false)
    setLoading(true)

    const web3 = new Web3(Web3.givenProvider)
    const busdTokenContract = new web3.eth.Contract(BUSD.abi as AbiItem[], getBusdAddress())
    const saleContract = new web3.eth.Contract(NftSale.abi as AbiItem[], getNftSaleAddress())
    const allowance = await busdTokenContract.methods.allowance(account, getNftSaleAddress()).call()
    const busdBalance = await busdTokenContract.methods.balanceOf(account).call()
    if (toBN(busdBalance).lt(toBN(price))) {
      setLoading(false)
      toast.error('busd balance is insufficient. you must have ' + fromWei(price) + ' busd in your wallet')
      return
    }
    try {
      if (parseInt(allowance.toString()) < parseInt(price)) {
        const _approveAmount = toBN(price).mul(toBN(100))
        await busdTokenContract.methods.approve(getNftSaleAddress(), _approveAmount).send({ from: account })
      }

      // const estimatedGas = await saleContract.methods
      //     .buyRarePack()
      //     .estimateGas({from: account});

      let seed = Math.floor(Math.random() * 1000)
      await saleContract.methods
        .buyRarePack(seed)
        .send({ from: account })
        .on('transactionHash', function () {
          toast.success('Transaction submitted')
        })
        .on('receipt', function (receipt) {
          console.log(receipt)
          setMintingState(true)
          setLoading(false)
          toast.success('Mint succeed')
        })
    } catch (err: unknown) {
      console.log('ERROR: ', err)
      setMintingState(true)
      setLoading(false)

      const { message } = err as Error
      toast.error(message)
    }
    // setMintingState(true);
  }

  return (
    <div>
      <BoxTitle style={{ color: isDark ? 'white' : '' }}>RARE PACK</BoxTitle>
      <RemainingAmount style={{ color: isDark ? 'white' : '' }}>
        <p>MAX 1500</p>
        <p>5 RARE COW + 1 RARE BULL + 1 LAND</p>
      </RemainingAmount>
      <BoxPrice
        style={{
          background: isDark ? '#16151a' : '',
          boxShadow: isDark ? '0 6px 12px 0 rgb(255 255 255 / 6%), 0 -1px 2px 0 rgb(255 255 255 / 2%)' : '',
        }}
      >
        <BoxPriceContainer style={{ color: isDark ? 'white' : '' }}>
          Price
          <PriceDetailContainer style={{ color: isDark ? 'white' : '' }}>
            <img src="/images/tokens/busd.png" alt="" style={{ width: '24px', height: '24px', marginRight: '8px' }} />
            {fromWei(price, 'ether')}
            <span
              style={{ fontSize: '14px', color: isDark ? 'white' : '#694f4e', fontWeight: 400, marginLeft: '4px' }}
            >{` ≈ $${fromWei(price, 'ether')}`}</span>
            {account && mintingState === true ? (
              <Button onClick={buyButtonHandler}>Mint</Button>
            ) : (
              <Button disabled>Mint</Button>
            )}
          </PriceDetailContainer>
        </BoxPriceContainer>
      </BoxPrice>
      <BuyNowBtnContainer />
    </div>
  )
}

export default BoxBuyDetailComponent
