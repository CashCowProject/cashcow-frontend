import React, { useEffect, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import AirNfts from 'config/abi/AirNft.json'
import Market from 'config/abi/Market.json'
import HappyCows from 'config/abi/HappyCows.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AbiItem, toBN } from 'web3-utils'
import Web3 from 'web3'
import { getHappyCowAddress, getMarketAddress, getAirNftAddress } from 'utils/addressHelpers'
import useTheme from 'hooks/useTheme'

const NftOnChainDataContainer = styled.div`
  display: flex;
  min-width: 280px;
  max-width: 330px;
  width: 30%;
  padding: 32px;
  box-sizing: border-box;
  flex-direction: column;

  @media (max-width: 768px) {
    max-width: unset;
    width: 100%;
  }
`

const NftOnChainDataTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #431216;
`

const NftOnChainDetailContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 15px 0;
`

const NftOnChainDetail = styled.div`
  padding: 18px 0 0;
  font-size: 14px;
`

const NftOnChainEachData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

const NftOnChainLinkStyle = styled.div`
  color: #431216;
  font-weight: 500;
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
`

const web3 = new Web3(Web3.givenProvider)

export interface NftDataRightComponentInterface {
  itemId?: string
}

const NftDataRightComponent = ({ itemId }: NftDataRightComponentInterface) => {
  const { isDark } = useTheme()
  const { account } = useWallet()
  const [isAIR, setIsAIR] = useState(false)
  const [tokenId, setTokenId] = useState('')
  const [ownerAddress, setOwnerAddress] = useState('')
  const [dna, setDna] = useState('')
  const [attr, setAttr] = useState([])

  const marketContract = useMemo(() => {
    return new web3.eth.Contract(Market.abi as AbiItem[], getMarketAddress())
  }, [])

  const happyCowsContract = useMemo(() => {
    return new web3.eth.Contract(HappyCows.abi as AbiItem[], getHappyCowAddress())
  }, [])

  const airnftContract = useMemo(() => {
    return new web3.eth.Contract(AirNfts.abi as AbiItem[], getAirNftAddress())
  }, [])

  const fetchNft = useCallback(async () => {
    const marketItems = await marketContract.methods.fetchMarketItems().call({ from: account })
    let index = 0
    let isTokenAir = false
    for (let i = 0; i < marketItems.length; i++) {
      if (marketItems[i].itemId === itemId) {
        isTokenAir = marketItems[i].nftContract === getAirNftAddress()
        setTokenId(marketItems[i].tokenId.toString())
        setOwnerAddress(marketItems[i].seller.toString())
        index = i
        break
      }
    }

    let nftHash = null
    if (isTokenAir)
      nftHash = await airnftContract.methods.tokenURI(toBN(marketItems[index].tokenId)).call({ from: account })
    else nftHash = await happyCowsContract.methods.tokenURI(toBN(marketItems[index].tokenId)).call({ from: account })

    const res = await fetch(nftHash)
    const json = await res.json()
    setIsAIR(isTokenAir)
    setDna(json.dna)
    setAttr(json.attributes)
  }, [account, marketContract, airnftContract, itemId, happyCowsContract])

  useEffect(() => {
    fetchNft()
  }, [itemId, fetchNft])
  return (
    <NftOnChainDataContainer>
      <NftOnChainDataTitle style={{ color: isDark ? 'white' : '' }}>Properties</NftOnChainDataTitle>
      <NftOnChainDetailContainer>
        <NftOnChainDetail>
          <NftOnChainEachData>
            <div style={{ color: isDark ? 'white' : '#694f4e' }}>Owner</div>
            <NftOnChainLinkStyle>
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://bscscan.com/address/${ownerAddress}`}
                style={{ textDecoration: 'underline', color: isDark ? 'white' : '#431216' }}
              >
                {ownerAddress}
              </a>
            </NftOnChainLinkStyle>
          </NftOnChainEachData>
          <NftOnChainEachData>
            <div style={{ color: isDark ? 'white' : '#694f4e' }}>Contract Address</div>
            <NftOnChainLinkStyle>
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://bscscan.com/address/${isAIR ? getAirNftAddress() : getHappyCowAddress()}`}
                style={{ textDecoration: 'underline', color: isDark ? 'white' : '#431216' }}
              >
                {isAIR ? getAirNftAddress() : getHappyCowAddress()}
              </a>
            </NftOnChainLinkStyle>
          </NftOnChainEachData>
          <NftOnChainEachData>
            <div style={{ color: isDark ? 'white' : '#694f4e' }}>Token ID</div>
            <NftOnChainLinkStyle style={{ color: isDark ? 'white' : '' }}>{`#${tokenId}`}</NftOnChainLinkStyle>
          </NftOnChainEachData>
          {/* <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Asset Protocol</div>
                        <NftOnChainLinkStyle>
                            ERC721
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData>
                    <NftOnChainEachData>
                        <div style={{color: isDark ? 'white' : '#694f4e'}}>Asset public chain</div>
                        <NftOnChainLinkStyle>
                            BSC
                        </NftOnChainLinkStyle>
                    </NftOnChainEachData> */}
          {dna && (
            <NftOnChainEachData>
              <div style={{ color: isDark ? 'white' : '#694f4e' }}>DNA</div>
              <NftOnChainLinkStyle style={{ color: isDark ? 'white' : '' }}>{dna}</NftOnChainLinkStyle>
            </NftOnChainEachData>
          )}
          {attr.map((item) => (
            <NftOnChainEachData key={item.trait_type}>
              <div style={{ color: isDark ? 'white' : '#694f4e' }}>{item.trait_type}</div>
              <NftOnChainLinkStyle style={{ color: isDark ? 'white' : '' }}>{item.value}</NftOnChainLinkStyle>
            </NftOnChainEachData>
          ))}
        </NftOnChainDetail>
      </NftOnChainDetailContainer>
    </NftOnChainDataContainer>
  )
}

export default NftDataRightComponent
