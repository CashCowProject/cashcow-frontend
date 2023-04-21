import React, { useState, useEffect, useContext, useCallback } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import useTheme from 'hooks/useTheme'
import { useHistory } from 'react-router-dom'
import NftFarming from 'config/abi/NftFarming.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'
import { getNftFarmingAddress } from 'utils/addressHelpers'
import {
  CATTLE_RARITY,
  COW_BREED,
  BULL_BREED,
  CASH_COWNFT_IMAGE_BASEURI,
  CASH_BULLNFT_IMAGE_BASEURI,
} from 'config/constants/nfts'
import Button from 'views/Pools/components/HarvestButton'
import { LoadingContext } from 'contexts/LoadingContext'
import toast from 'react-hot-toast'
const Container = styled.div`
  overflow: hidden;
  position: relative;
  border-radius: 8px;
  background-color: rgb(11, 51, 75);
`
const ImageContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 4px;
  & > * {
    margin: 1px;
  }
`
const TimeContainer = styled.div`
  cursor: pointer;
  margin-left: 18px;
`
const chainId = process.env.REACT_APP_CHAIN_ID
const web3 = new Web3(Web3.givenProvider)

const BreedingCard = ({ unLockTime, unit, bullId, rarity, cowBreed, bullBreed }) => {
  const [isModalOpen, setModalOpen] = useState(false)
  const { isDark } = useTheme()
  const { account } = useWallet()
  const [selectedNfts, setSelectedNfts] = useState([])
  const [cowImage, setCowImage] = useState('')
  const [bullImage, setBullImage] = useState('')
  const [isAvailable, setIsAvailable] = useState(false)
  const { setLoading } = useContext(LoadingContext)
  const [isClaimed, setIsClaimed] = useState(false)
  const farmContract = new web3.eth.Contract(NftFarming.abi as AbiItem[], getNftFarmingAddress())
  const fetchData = useCallback(async () => {
    let cowImage =
      CASH_COWNFT_IMAGE_BASEURI + CATTLE_RARITY[parseInt(rarity)] + '-' + COW_BREED[parseInt(cowBreed)] + '.png'
    let bullImage =
      CASH_BULLNFT_IMAGE_BASEURI + CATTLE_RARITY[parseInt(rarity)] + '-' + BULL_BREED[parseInt(bullBreed)] + '.png'
    setCowImage(cowImage)
    setBullImage(bullImage)
    if (unLockTime <= 0) {
      setIsAvailable(true)
    }
  }, [cowBreed, bullBreed, unLockTime])
  useEffect(() => {
    fetchData()
  }, [fetchData])

  const claimActionHandler = async (_bullId) => {
    try {
      setLoading(true)
      let _seed = []
      for (let i = 0; i < 3; i++) {
        let _rand = Math.floor(Math.random() * 1000)
        _seed.push(_rand)
      }
      await farmContract.methods.claimCattle(_bullId, _seed).send({ from: account })
      setIsClaimed(true)
      setLoading(false)
      // toast.success("Claimed Successfully!");
    } catch (error) {
      setLoading(false)
    }
  }
  return (
    <div>
      {!isClaimed ? (
        <Container>
          <ImageContainer>
            <img src={cowImage} alt="" style={{ width: '80px', height: '80px' }} />
            <img src="/images/breeding/hearts.png" alt="" style={{ width: '80px', height: '80px' }} />
            <img src={bullImage} alt="" style={{ width: '80px', height: '80px' }} />
            {!isAvailable ? (
              <TimeContainer>
                <img src="/images/svgs/reloj.svg" alt="" style={{ width: '42px', height: '42px' }} />
                <p style={{ textAlign: 'center', color: '#689330' }}>
                  {unLockTime} {unit}
                </p>
              </TimeContainer>
            ) : (
              <TimeContainer onClick={() => claimActionHandler(bullId)}>
                <img src="/images/svgs/edad.svg" alt="" style={{ width: '42px', height: '42px' }} />
                <p style={{ textAlign: 'center', color: '#689330' }}>CLAIM</p>
              </TimeContainer>
            )}
          </ImageContainer>
        </Container>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default BreedingCard
