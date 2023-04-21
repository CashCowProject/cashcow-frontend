import React, { useState, useMemo, useCallback, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { Button } from 'cashcow-uikit'
import NftBreeding from 'config/abi/NftBreeding.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { fromWei, AbiItem, toBN, toWei } from 'web3-utils'
import Web3 from 'web3'
import { getNftBreedingAddress } from 'utils/addressHelpers'
import useTheme from 'hooks/useTheme'
import { LoadingContext } from 'contexts/LoadingContext'

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 3%), 0 4px 6px -2px rgb(0 0 0 / 1%);
  border-radius: 32px;
  position: relative;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const GradientBack = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ilqnTz 2s linear infinite;
  filter: blur(10px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const MetadataContainer = styled.div`
  display: flex;
  padding: 16px 32px;
  flex: 1;
  flex-wrap: wrap;
  align-items: inherit;

  @media (max-width: 768px) {
    justify-content: center;
  }
`
const ImageContainer = styled.div`
  max-width: 332px;
  max-height: 100%;
  min-width: 240px;
  min-height: 240px;
  width: 46%;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
  margin: 16px 32px 16px 0;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const NftImage = styled.div`
  width: 100%;
  padding-bottom: 100%;
  height: 0;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: auto 100%;
`

const NftInfo = styled.div`
  flex: 1;
  min-width: 220px;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
`

const TitleContainer = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #431216;
  word-break: break-word;
`

const AttributesContainer = styled.div`
  margin-top: 20px;
  box-shadow: 0 6px 12px 0 rgb(0 0 0 / 6%), 0 -1px 2px 0 rgb(0 0 0 / 2%);
  border-radius: 16px;
  display: flex;
`

const NftAttributes = styled.div`
  padding: 16px;
  flex: 1;
`

const NftAttributeItem = styled.div`
  font-size: 28px;
  color: #0c5569;
  font-weight: 700;
  margin-top: 6px;
  display: flex;
  align-items: center;
`
const ActionContainer = styled.div`
  margin-top: 24px;
`
const ContractInfoContainer = styled.div`
  display: flex;
  padding: 16px 32px;
  flex: 1;
  flex-wrap: wrap;
  align-items: inherit;
  color: #0c5569;

  @media (max-width: 768px) {
    justify-content: center;
  }
`
const web3 = new Web3(Web3.givenProvider)

export interface NftDataLeftComponentInterface {
  tokenId?: string
}

const BreedButton = ({ tokenId }: NftDataLeftComponentInterface) => {
  const { isDark } = useTheme()
  const { setLoading } = useContext(LoadingContext)

  const breedContract = useMemo(() => {
    return new web3.eth.Contract(NftBreeding.abi as AbiItem[], getNftBreedingAddress())
  }, [])

  const actionHandler = async () => {}

  return (
    <Button style={{ marginRight: '10px' }} onClick={actionHandler}>
      Stake to Farm
    </Button>
  )
}

export default BreedButton
