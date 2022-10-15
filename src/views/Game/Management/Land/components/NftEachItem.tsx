import React, { useContext } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
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
import { setLandNftCount, updating } from 'state/landManagement'
const web3 = new Web3(Web3.givenProvider);
import '../../management.css'

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
  top: 0;
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


const NftEachItem = ({ image, tokenId, rarity }) => {
  const { account } = useWallet()
  const { isDark } = useTheme()
  const { setLoading } = useContext(LoadingContext)
  const itemCount = useSelector((state: State) => state.land.landItemCount);
  const updated = useSelector((state: State) => state.land.updated);
  const dispatch = useDispatch();
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

      await farmContract.methods.withdrawLand(tokenId).send({ from: account });
      toast.success("success withdrawing a Land NFT")
      dispatch(setLandNftCount(itemCount - 1))
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
      style={{ background: isDark ? '#0b334b' : 'white' }}
    >
      <ItemTop>
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
