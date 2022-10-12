import React, { useEffect, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import AirNfts from 'config/abi/AirNft.json'
import ERC721 from 'config/abi/ERC721.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AbiItem, toBN } from 'web3-utils'
import Web3 from 'web3'
import { getHappyCowAddress, getAirNftAddress } from 'utils/addressHelpers'
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
    width: 100%;
    max-width: unset;
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
  padding: 10px 0;
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

export interface MyNftDataRightComponentInterface {
  myToken?: any
}

const MyNftDataRightComponent = ({ myToken }: MyNftDataRightComponentInterface) => {
  const { isDark } = useTheme()
  const { account } = useWallet()
  const [tokenId, setTokenId] = useState('')
  const [dna, setDna] = useState('')
  const [attr, setAttr] = useState([])

  const nftContract = useMemo(() => {
    return new web3.eth.Contract(ERC721.abi as AbiItem[], myToken.collection)
  }, [myToken])

  const fetchNft = useCallback(async () => {
    if (!myToken) return
    const tmpTokenId = myToken.tokenId

    if (!tmpTokenId) return

    let nftHash = null
    nftHash = await nftContract.methods.tokenURI(toBN(tmpTokenId)).call({ from: account })
    console.log(nftHash)
    const res = await fetch(nftHash)
    const json = await res.json()
    setDna(json.dna)
    setAttr(json.attributes)
    setTokenId(myToken.tokenId)
  }, [myToken, account, nftContract])

  useEffect(() => {
    fetchNft()
  }, [myToken, fetchNft])
  return (
    <NftOnChainDataContainer>
      <NftOnChainDataTitle style={{ color: isDark ? 'white' : 'white' }}>On-chain data</NftOnChainDataTitle>
      <NftOnChainDetailContainer>
        <NftOnChainDetail>
          <NftOnChainEachData>
            <div style={{ color: isDark ? 'white' : 'white' }}>Owner</div>
            <NftOnChainLinkStyle>
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://bscscan.com/address/${account}`}
                style={{ textDecoration: 'underline', color: isDark ? 'white' : 'white' }}
              >
                {account}
              </a>
            </NftOnChainLinkStyle>
          </NftOnChainEachData>
          <NftOnChainEachData>
            <div style={{ color: isDark ? 'white' : 'white' }}>Contract Address</div>
            <NftOnChainLinkStyle>
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://bscscan.com/address/${myToken.collection}`}
                style={{ textDecoration: 'underline', color: isDark ? 'white' : 'white' }}
              >
                {myToken.collection}
              </a>
            </NftOnChainLinkStyle>
          </NftOnChainEachData>
          <NftOnChainEachData>
            <div style={{ color: isDark ? 'white' : 'white' }}>Token ID</div>
            <NftOnChainLinkStyle style={{ color: isDark ? 'white' : 'white' }}>{`# ${tokenId}`}</NftOnChainLinkStyle>
          </NftOnChainEachData>
          {dna && (
            <NftOnChainEachData>
              <div style={{ color: isDark ? 'white' : 'white' }}>DNA</div>
              <NftOnChainLinkStyle style={{ color: isDark ? 'white' : '' }}>{dna}</NftOnChainLinkStyle>
            </NftOnChainEachData>
          )}
          {attr.map((item) => (
            <NftOnChainEachData key={item.trait_type}>
              <div style={{ color: isDark ? 'white' : 'white' }}>{item.trait_type}</div>
              <NftOnChainLinkStyle style={{ color: isDark ? 'white' : 'white' }}>{item.value}</NftOnChainLinkStyle>
            </NftOnChainEachData>
          ))}
        </NftOnChainDetail>
      </NftOnChainDetailContainer>
    </NftOnChainDataContainer>
  )
}

export default MyNftDataRightComponent
