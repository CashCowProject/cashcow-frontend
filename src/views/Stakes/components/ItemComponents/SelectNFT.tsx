import _ from 'lodash';
import React, {useContext, useState, useMemo} from 'react'
import styled from 'styled-components'
import { StakeContext } from 'contexts/StakeContext'
import { Heading } from 'cashcow-uikit'
import useTheme from 'hooks/useTheme'
import useI18n from 'hooks/useI18n'
import Modal from 'react-modal';
import StakeCandidate from './StakeCandidate'



const SelectNFT = ({isOpen, closeDialog, addNFTHandler, index}) => {
  const { myNFTS } = useContext(StakeContext)
  const [modalIsOpen, setIsOpen] = useState(false);
    const closeModal = () => {
      setIsOpen(false);
  }
  const TranslateString = useI18n()
  const { isDark } = useTheme()
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
              {TranslateString(10013, 'NFT Staking Candidates')}
            </BoxShadow>
          </Heading>
          <div style={{cursor: 'pointer', position:'absolute', right: 0}} onClick={closeDialog} onKeyDown={closeDialog} role = "button" tabIndex={0}>
              <img src="/images/close.png" style={{width: "25px", height: "25px", cursor: 'pointer'}} alt="close"/>
          </div>
      </div>
      
      <div style={{display: 'flex', width: '100%', flexWrap: 'wrap', justifyContent: 'center'}}>
        {_.map(myNFTS, nft=>(
          <StakeCandidate data={nft} closeRequest={closeDialog} index={index}/>
        ))}
      </div>
    </Modal>
  )
}

export default SelectNFT
