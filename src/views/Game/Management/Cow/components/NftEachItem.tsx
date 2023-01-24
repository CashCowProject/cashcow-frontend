import React, { useState, useEffect, useContext, useMemo } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import CowNFT from 'config/abi/CowNFT.json'
import {
  getCowNftAddress
} from 'utils/addressHelpers'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTheme from 'hooks/useTheme'
import { Button } from 'cashcow-uikit'
import NftFarming from 'config/abi/NftFarming.json'
import { getNftFarmingAddress } from 'utils/addressHelpers'
import { AbiItem } from 'web3-utils';
import toast from 'react-hot-toast'
import { LoadingContext } from 'contexts/LoadingContext'
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'state/types'
import { setCowNftCount, updating } from 'state/cowManagement'
import '../../management.css'

const web3 = new Web3(Web3.givenProvider);
const NftEachItemContainer = styled.div`
  cursor: pointer;
  min-width: 230px;
  max-width: calc(25% - 30px);
  flex: 1;
  margin: 30px 15px 0;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 3%), 0 4px 6px -2px rgb(0 0 0 / 1%);
  position: relative;
`
const ItemTop = styled.div`
  paddingtop: 2px;
`
const NftImageContainer = styled.div`
  position: relative;
  padding-bottom: 100%;
  height: 0;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  overflow: hidden;
  display: flex;
  align-items: center; 
`

const NftImage = styled.div`
  transition: transform 0.3s ease, -webkit-transform 0.3s ease;
  transform-origin: center;
  background-size: auto 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 10%;
  left: 10%;
  &:hover {
    transform: scale(1.04);
  }
`
const Title = styled.div`
  height: 68px;
  padding: 0 24px;
  display: flex;
  align-items: center;
`

const TitleText = styled.div`
  font-size: 18px;
  line-height: 1.2;
  color: #431216;
  word-break: break-word;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  line-clamp: 2;
  display: flex;
  align-items: center;
`

const ItemSeperation = styled.div`
  height: 1px;
  min-width: unset;
  background-image: url(../images/line.jpg);
  background-repeat: repeat-x;
  position: relative;
  background-size: contain;
  background-position: 50%;
`

const ItemBottom = styled.div`
  display:flex;
  padding: 12px 24px 20px;
  margin: 0;
`

const ItemMetaData = styled.div`
    color: white;
    font-size: 18px;
    font-weight: 400;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: .3em;
    margin-bottom: .3em;
`


const NftEachItem = ({ image, tokenId, rarity }) => {
  const { account } = useWallet()
  const { isDark } = useTheme()
  const { setLoading } = useContext(LoadingContext)
  const itemCount = useSelector((state: State) => state.cow.cowItemCount);
  const updated = useSelector((state: State) => state.cow.updated);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCowAge(tokenId)
  }, [])

  const [nftMetaData, setNftMetaData] = useState('')

  const cownftContract = useMemo(() => {
    return new web3.eth.Contract(CowNFT.abi as AbiItem[], getCowNftAddress())
  }, [])

  const fetchCowAge = async (cowID) => {
    console.log('Fetching Age For: ', cowID)
    const currentTimestamp = new Date().getTime() / 1000;
    const maxAge = 200 * 24 * 60 * 60;
    const res = await cownftContract.methods.attrOf(cowID).call({ from: account })

    const cowBreed = parseInt(res.breed);
    const cowRarity = parseInt(res.rarity)

    const cowAge = currentTimestamp - res.birth;
    let cowAgingMultiplier = 0;

    if (maxAge > cowAge) {
      cowAgingMultiplier = 1 - (cowAge / maxAge);
    }

    const cowRarityMilkPower = [
      2000,
      3000,
      5000,
      8000,
      13000
    ]

    const cowMilkPower = cowRarityMilkPower[cowRarity] * cowAgingMultiplier

    setNftMetaData(cowMilkPower.toFixed(0))
  }


  const removeItemHandler = async () => {
    try {
      setLoading(true)
      const farmContract = new web3.eth.Contract(NftFarming.abi as AbiItem[], getNftFarmingAddress());
      if (!account) {
        toast.error('Please connect to your account')
        return;
      }
      const _totalCowLimit = await farmContract.methods._totalCowLimitOf(account).call()
      const _totalBullLimit = await farmContract.methods._totalBullLimitOf(account).call()
      const _cowLimitPerland = await farmContract.methods.cowLimitPerLand(rarity).call()
      const _bullLimitPerland = await farmContract.methods.bullLimitPerLand(rarity).call()
      if (_totalCowLimit - _cowLimitPerland < 0) {
        toast.error("Please withdraw the cow NFTs first");
      }
      if (_totalBullLimit - _bullLimitPerland < 0) {
        toast.error("Plese withdraw the Bull NFTs first.")
      }
      // Test function:
      // await farmContract.methods.harvest().send({from: account});

      await farmContract.methods.withdrawCow(tokenId).send({ from: account });
      toast.success("success withdrawing a Cow NFT")
      dispatch(setCowNftCount(itemCount - 1))
      dispatch(updating(!updated))
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error("captch a Network error.");
      setLoading(false)
    }
  }
  return (
    <NftEachItemContainer
      style={{ background: isDark ? '#0b334b' : '#0b334b' }}
    >
      <ItemTop>
      <ItemMetaData style={{ color: isDark ? 'white' : '#27262c' }}>              
          <img
              src="/images/svgs/vida.svg"
              alt="token"
              style={{ width: '18px', height: '18px' }}
            />
            &nbsp;&nbsp;
            {nftMetaData}

          </ItemMetaData>
        <NftImageContainer>

          <div className="metal-frame-div">
            <img className="nft-image" src={image} />
            <img className="metal-frame-image" src="/images/nfts/marcometal.png" />
          </div>

        </NftImageContainer>
      </ItemTop>

      <ItemBottom >
        <div
          className="remove-from-div">
          <img
            className="remove-from-div-button"
            src={'/images/farms/management/remove_from_gray.png'}
            onClick={removeItemHandler}
          />
        </div>
      </ItemBottom>
    </NftEachItemContainer>
  )
}

export default NftEachItem
