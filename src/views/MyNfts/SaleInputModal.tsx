import _ from 'lodash'
import React, { useContext, useState, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { StakeContext } from 'contexts/StakeContext'
import { Heading } from 'cashcow-uikit'
import useTheme from 'hooks/useTheme'
import useI18n from 'hooks/useI18n'
import Modal from 'react-modal'
import { useWallet } from '@binance-chain/bsc-use-wallet'

const ModalTitleContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 1000;
  line-height: 1.5;
  display: flex;
  align-items: center;
  justify-content: center;
`
const SaleInputModal = ({ isOpen, closeDialog, nftData }) => {
  const TranslateString = useI18n()
  const { isDark } = useTheme()
  const { account } = useWallet()
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => closeDialog(false)}
      iaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '15px',
          background: isDark ? '#27262c' : 'white',
          zindex: 15,
        },
      }}
      contentLabel="Example Modal"
    >
      <ModalTitleContainer>NFT SALE</ModalTitleContainer>
    </Modal>
  )
}

export default SaleInputModal
