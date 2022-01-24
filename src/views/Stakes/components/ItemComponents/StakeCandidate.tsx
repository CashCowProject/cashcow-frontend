import React, { useContext, useCallback, useEffect, useState } from 'react'
import { StakeContext } from 'contexts/StakeContext'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { Tag } from '@pancakeswap-libs/uikit'

const MultiplierTag = styled(Tag)`
    margin-left: 4px;
`

const TypeTag = styled(Tag)`
    backdrop-filter: blur(10px);
`

const HoverWrapper = styled.div `
    position: absolute;
    top: 12px;
    right: 8px;
`

const CandidateWrapper = styled.div`
    cursor: pointer;
    margin: 10px;
    background: #fff;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 3%), 0 4px 6px -2px rgb(0 0 0 / 1%);
    border-radius: 24px;
    padding: 16px;
    width: calc(20% - 20px);
    box-sizing: border-box;
    display: flex;
    transition: transform .3s ease,-webkit-transform .3s ease;
    padding-top: calc(20% - 50px);
    position: relative;
    background-size: cover;
    color: white;

    @media (max-width: 768px) {
      width: calc(50% - 20px);
      padding-top: calc(50% - 50px);
    }

    &:before {
      position: absolute;
      z-index: 0;
      content: '';
      width: 100%;
      height: 40px;
      bottom: 0;
      left: 0;
      backdrop-filter: blur(5px);
      border-radius: 0 0 24px 24px;
    }

    span {
      z-index: 10;
      text-shadow: 2px 2px 2px black;
      text-transform: uppercase;
    }
  `

const StakeCandidate = ({data, closeRequest}) => {
    const { isDark } = useTheme()
    const [nftInfo, setNFTInfo] = useState({tokenName: '', tokenId: '', imgUrl: '', isAIR: false})
    const { appendCandidate } = useContext(StakeContext)

    const fetchNft = useCallback(async ()=>{
        if (!data || !data.tokenId)
            return;

        const res = await fetch(data.tokenHash)
        const json = await res.json()

        let imageUrl = json.image;
        if (!data.isAIR) {
            imageUrl = imageUrl.slice(7)
        }

        setNFTInfo({tokenName: json.name, tokenId: data.tokenId, imgUrl: imageUrl, isAIR: data.isAIR});
    }, [data])

    useEffect(() => {
        fetchNft()
    },[fetchNft])

    const nftSelected = () => {
        appendCandidate(data)
        closeRequest()
    }

    return (
        <CandidateWrapper style={{backgroundImage: `url('${nftInfo.imgUrl}')`}} onClick={e=>nftSelected()}>
            <span>{nftInfo.tokenName}</span>
            <HoverWrapper>
                <TypeTag variant="success" outline>
                    {nftInfo.isAIR ? 'Genise' : 'HappyCow'}
                </TypeTag>
                <MultiplierTag variant="secondary">{nftInfo.isAIR ? '10X' : '1X'}</MultiplierTag>
            </HoverWrapper>
        </CandidateWrapper>
    )
}

export default StakeCandidate
