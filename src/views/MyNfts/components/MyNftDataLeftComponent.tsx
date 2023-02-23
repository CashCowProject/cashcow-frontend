import React, { useEffect, useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import AirNfts from 'config/abi/AirNft.json'
import ERC721 from 'config/abi/ERC721.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AbiItem, toBN } from 'web3-utils'
import Web3 from 'web3'
import { getHappyCowAddress, getAirNftAddress } from 'utils/addressHelpers'
import useTheme from 'hooks/useTheme'
import '../assets/styles.css'
import useLocalImage from 'hooks/useLocalImage'

const NftOnChainDataContainer = styled.div`
  display: flex;
  width: 27%;
  box-sizing: border-box;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    max-width: unset;
    align-items: center;
  }
`

const Parent = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 80%;
  max-width: 300px;
  margin-top: 3.5vh;
  margin-left: 10%;
  @media (max-width: 768px) {
    margin-left: 0;
    margin-bottom: 3em;
  }
 `

const Image1 = styled.img`
  position: relative;
  top: 10%;
  left: 10%;
  width: 80%;
  max-width: 300px;
  top: 3.5vh;
  @media (max-width: 768px) {
    top: 3.5vh;
  }
`

const Image2 = styled.img` 
  position: absolute;
  top: 0px;
  left: 0px;
`

const web3 = new Web3(Web3.givenProvider)

export interface MyNftDataLeftComponentInterface {
  myToken?: any
}

const MyNftDataLeftComponent = ({ myToken }: MyNftDataLeftComponentInterface) => {
  const { isDark } = useTheme()
  const { account } = useWallet()
  const [tokenId, setTokenId] = useState('')
  const [dna, setDna] = useState('')
  const [attr, setAttr] = useState([])
  const [imageUrl, setImageUrl] = useState('');

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
    console.log('FETCHED NFT >>>> ', json)
    setDna(json.dna)
    if (json.name == "Land") {
      setImageUrl(useLocalImage(json))
    } else {
      setImageUrl(json.image.replace('ipfs://', 'https://ipfs.io/ipfs/'))
    }
    setAttr(json.attributes)
    setTokenId(myToken.tokenId)
  }, [myToken, account, nftContract])

  useEffect(() => {
    fetchNft()
  }, [myToken, fetchNft])

  return (
    <NftOnChainDataContainer>

      <Parent>
        <Image1 src={imageUrl} />
        <Image2 src="/images/nfts/marcometal.png" />
      </Parent>

    </NftOnChainDataContainer>
  )
}

export default MyNftDataLeftComponent;
