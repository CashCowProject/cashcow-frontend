import _ from 'lodash';
import React, {useContext, useState, useCallback, useMemo} from 'react'
import styled from 'styled-components'
import { StakeContext } from 'contexts/StakeContext'
import { Heading } from 'cashcow-uikit'
import useTheme from 'hooks/useTheme'
import useI18n from 'hooks/useI18n'
import Modal from 'react-modal';
import { useWallet } from '@binance-chain/bsc-use-wallet'

const NftImage = styled.div`
  transition: transform 0.3s ease, -webkit-transform 0.3s ease;
  transform-origin: center;
  background-size: auto 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  &:hover {
    transform: scale(1.04);
  }
`
const SelectNFT = ({isOpen, closeDialog, myNfts, actionHandler}) => {
  const TranslateString = useI18n()
  const { isDark } = useTheme()
  const {account} = useWallet()
  const BoxShadow = styled.div`
  background: ${!isDark ? 'white' : '#27262c'};
  box-shadow: 0px 2px 12px -8px ${!isDark ? 'rgba(25, 19, 38, 0.7)' : 'rgba(203, 203, 203, 0.7)'}, 0px 1px 1px ${!isDark ? 'rgba(25, 19, 38, 0.05)' : 'rgba(203, 203, 203, 0.05)'};
  position: relative;
  width: 100%;
`

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeDialog}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: "70vw",
          maxWidth: '70vw',
          minWidth: '70vw',
          borderRadius: '15px',
          background: isDark ? '#27262c' : 'white',
          zindex: 15,
        }
      }}
      contentLabel="Example Modal"
    >
      <div style={{display: 'flex', justifyContent: 'center', position: 'relative'}}>
          <Heading as="h1" size="lg" color="primary" mb="25px" style={{ textAlign: 'center', width: "600px" }}>
            <BoxShadow style={{borderRadius: '16px', padding: '24px'}}>
              {TranslateString(10013, 'BULL NFT Farming')}
            </BoxShadow>
          </Heading>
          <div style={{cursor: 'pointer', position:'absolute', right: 0}} onClick={closeDialog} onKeyDown={closeDialog} role = "button" tabIndex={0}>
              <img src="/images/close.png" style={{width: "25px", height: "25px", cursor: 'pointer'}} alt="close"/>
          </div>
      </div>
      
      <div style={{display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'center', maxHeight: "400px", overflow:'auto'}}>
        {_.map(myNfts, nft=>(
            <img 
              src={nft.image} alt="" 
              style={{cursor:'pointer', width: "30%", marginRight: '8px', marginTop: '10px'}} 
              onClick = {() =>actionHandler(nft.tokenId)}
              key = {nft.tokenId}
            />
        ))}
      </div>
    </Modal>
  )
}

export default SelectNFT
