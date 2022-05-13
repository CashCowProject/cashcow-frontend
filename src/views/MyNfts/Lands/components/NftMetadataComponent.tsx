import React, { useState, useMemo, useCallback, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { Button, Input } from 'cashcow-uikit'
import LandNFT from 'config/abi/LandNFT.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AbiItem, toBN, toWei } from 'web3-utils'
import Web3 from 'web3'
import useTheme from 'hooks/useTheme'
import { LoadingContext } from 'contexts/LoadingContext'

import NftFarming from 'config/abi/NftFarming.json'
import Market from 'config/abi/Market.json'
import { getLandNftAddress, getNftFarmingAddress, getMarketAddress } from 'utils/addressHelpers'
import { provider } from 'web3-core';
import { CASH_LANDNFT_IMAGE_BASEURI, LAND_RARITY, LAND_KIND } from "config/constants/nfts"

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
    background: linear-gradient( 45deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%, rgba(255,0,0,1) 100% );
    background-size: 300% 300%;
    animation: ilqnTz 2s linear infinite;
    filter: blur(10px);
    position: absolute;
    top:-2px;
    right:-2px;
    bottom:-2px;
    left:-2px;
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

const PriceInfoContainer = styled.div`
  display: flex;
  padding: 16px 32px;
  flex-wrap: nowrap;
  align-items: center;
  color: #0c5569;

  @media (max-width: 768px) {
    justify-content: center;
  }
`

const web3 = new Web3(Web3.givenProvider)

export interface NftDataLeftComponentInterface {
  tokenId?: string
}

const NftMetadataComponent = ({ tokenId }: NftDataLeftComponentInterface) => {
  const { isDark } = useTheme()
  const history = useHistory()
  const [nftImage, setNftImage] = useState('')
  const [cowCapacity, setCowCapacity] = useState(0)
  const [bullCapacity, setBullCapacity] = useState(0)
  const [rarityName, setRarity] = useState("")
  const [kindName, setKind] = useState("")
  const { setLoading } = useContext(LoadingContext)
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const [salePrice, setSalePrice] = useState(0);
  const nftContract = useMemo(() => {
    return new web3.eth.Contract(LandNFT.abi as AbiItem[], getLandNftAddress())
  }, [])
  const NFTFarmingContract = useMemo(() => {
    return new web3.eth.Contract(NftFarming.abi as AbiItem[], getNftFarmingAddress())
  }, [])

  const marketContract = useMemo(() => {
    return new web3.eth.Contract(Market.abi as AbiItem[], getMarketAddress())
  }, [])

  const fetchNftInfo = useCallback(async () => {
    const attrs = await nftContract.methods.attrOf(tokenId).call();
    const _cowCapacity = await NFTFarmingContract.methods.cowLimitPerLand(attrs.rarity).call();
    const _bullCapacity = await NFTFarmingContract.methods.bullLimitPerLand(attrs.rarity).call();
    const _image = CASH_LANDNFT_IMAGE_BASEURI + LAND_RARITY[parseInt(attrs.rarity)] + "-" + LAND_KIND[parseInt(attrs.landType)] + ".png";
    setNftImage(_image);
    setCowCapacity(_cowCapacity);
    setBullCapacity(_bullCapacity);
    setRarity(LAND_RARITY[parseInt(attrs.rarity)]);
    setKind(LAND_KIND[parseInt(attrs.landType)]);
  }, [nftContract, NFTFarmingContract, tokenId])

  useEffect(() => {
    fetchNftInfo()
  }, [fetchNftInfo])

  const farmActionHandler = async (_tokenId: string) => {
    try {
      await nftContract.methods.approve(getNftFarmingAddress(), _tokenId).send({ from: account });
      await NFTFarmingContract.methods.depositLand(_tokenId).send({ from: account });
      history.push('/lands')
      toast.success('Successfully staking')

    } catch (error) {
      console.log(error)
    }
  }
  

  const priceChangeHandler = (e) =>{
    const _price = e.target.value;
    setSalePrice(_price);
  }

  const saleActionHandler = async (_tokenId: string) => {
    try {
      if (salePrice <= 0) {
        toast.error("Please input the NFT price")
        return;
      }
      setLoading(true);
      await nftContract.methods.approve(getMarketAddress(), _tokenId).send({ from: account });
      await marketContract.methods.createMarketItem(getLandNftAddress(), _tokenId, toBN(toWei(salePrice.toString()))).send({ from: account });
      setLoading(false);
      history.push('/lands')
      toast.success('Successfully listed NFT')

    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <Container style={{ background: isDark ? "#27262c" : '' }}>
      <GradientBack />
      <MetadataContainer>
        <ImageContainer>
          <NftImage style={{ backgroundImage: `url(${nftImage})` }} />
        </ImageContainer>
        <NftInfo>
          <TitleContainer style={{ color: isDark ? 'white' : '' }}>{kindName ? kindName : "land"} #{tokenId}</TitleContainer>
          <AttributesContainer
            style={{
              background: isDark ? '#16151a' : '',
              boxShadow: isDark ? '0 6px 12px 0 rgb(255 255 255 / 6%), 0 -1px 2px 0 rgb(255 255 255 / 2%)' : '',
            }}
          >
            <NftAttributes>
              <NftAttributeItem style={{ color: isDark ? 'white' : '' }}>
                <img
                  style={{ width: '24px', height: '24px', marginRight: '8px' }}
                  src={`/images/svgs/femenino.svg`}
                  alt=""
                />
                {"CAPACITY"} : {cowCapacity}
              </NftAttributeItem>

              <NftAttributeItem style={{ color: isDark ? 'white' : '' }}>
                <img
                  style={{ width: '24px', height: '24px', marginRight: '8px' }}
                  src={`/images/svgs/masculino.svg`}
                  alt=""
                />
                {"CAPACITY"} : {bullCapacity}
              </NftAttributeItem>
              <NftAttributeItem style={{ color: isDark ? 'white' : '' }}>
                <img
                  style={{ width: '24px', height: '24px', marginRight: '8px' }}
                  src={`/images/svgs/${kindName}.svg`}
                  alt=""
                />
                {"LAND"} : {kindName}
              </NftAttributeItem>
              <NftAttributeItem style={{ color: isDark ? 'white' : '' }}>
                <img
                  style={{ width: '24px', height: '24px', marginRight: '8px' }}
                  src={`/images/svgs/${rarityName}.svg`}
                  alt=""
                />
                {"RARITY"} : {rarityName}
              </NftAttributeItem>

            </NftAttributes>
          </AttributesContainer>
          <div style={{ flex: 1 }} />

          <PriceInfoContainer>
            <span style={{ marginRight: '8px', color: '#689330' }}>Sale Price</span>
            <Input
              type="number"
              onChange={(e) => priceChangeHandler(e)}
              style={{ flex: "auto", width: "60%" }}
            />
            <div style={{ flex: 2, marginLeft: 10 }}>MILK</div>
          </PriceInfoContainer>

          <ActionContainer>
            <Button style={{ marginRight: "10px" }} onClick={() => farmActionHandler(tokenId)}>Stake to Farm</Button>
            <Button style={{ marginRight: "10px" }} onClick={() => saleActionHandler(tokenId)}>Move to Sale</Button>
          </ActionContainer>
        </NftInfo>
      </MetadataContainer>
      <ContractInfoContainer>
        <span style={{ marginRight: '8px', color: '#689330' }}>Contract Address</span>
        {getLandNftAddress()}
      </ContractInfoContainer>
    </Container>
  )
}

export default NftMetadataComponent
