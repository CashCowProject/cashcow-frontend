import _ from 'lodash';
import React, { useContext, useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { StakeContext } from 'contexts/StakeContext'
import { Heading } from 'cashcow-uikit'
import useTheme from 'hooks/useTheme'
import useI18n from 'hooks/useI18n'
import Modal from 'react-modal';
import { useWallet } from '@binance-chain/bsc-use-wallet'

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

const NftItemContainer = styled.div`
    
`

export const SelectBullCard = ({ nftEachItem, idx, handleSelectNft }) => {
    const TranslateString = useI18n()
    const { isDark } = useTheme()
    const { account } = useWallet()
    const BoxShadow = styled.div`
        background: ${!isDark ? 'white' : '#27262c'};
        box-shadow: 0px 2px 12px -8px ${!isDark ? 'rgba(25, 19, 38, 0.7)' : 'rgba(203, 203, 203, 0.7)'}, 0px 1px 1px ${!isDark ? 'rgba(25, 19, 38, 0.05)' : 'rgba(203, 203, 203, 0.05)'};
        position: relative;
        width: 100%;
    `

    return (
        <NftEachItemContainer style={{ background: isDark ? '#383740' : '' }}>
            <ItemTop>

                <ItemMetaData>
                    {/* <span style={{ color: isDark ? 'white' : 'black' }}>COW #1234</span>
                &nbsp; */}
                    <img
                        src="/images/svgs/relojgreen.svg"
                        alt="token"
                        style={{ width: '18px', height: '18px' }}
                    />
                    &nbsp;&nbsp;
                    <span style={{ color: isDark ? 'white' : 'black' }}>{nftEachItem.nftMetaData}</span>
                </ItemMetaData>
                <NftImageContainer>
                <NftImage style={{ backgroundImage: `url(${nftEachItem.image})` }} onClick={() => handleSelectNft(nftEachItem.tokenId, nftEachItem.image)} />
                {/* <img src={nft.image} alt="" style={{ cursor: 'pointer', width: "30%", marginRight: '8px', marginTop: '10px' }} onClick={() => actionHandler(nft.tokenId)} /> */}
              </NftImageContainer>
              <ItemMetaData>
                <span style={{ color: isDark ? 'white' : 'black' }}>Bull #{nftEachItem.tokenId}</span>
              </ItemMetaData>
            </ItemTop>

        </NftEachItemContainer>
        // <NftItemContainer onClick={() => handleSelectNft(nftEachItem.tokenId, nftEachItem.image)} key={nftEachItem.tokenId + "_" + idx}>
        //     <img src={nftEachItem.image} alt="" style={{ width: "160px", height: "160px" }} key={nftEachItem.tokenId} />
        // </NftItemContainer>
    )

}