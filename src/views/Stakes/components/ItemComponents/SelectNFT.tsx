import _ from 'lodash';
import React, {useContext, useState, useMemo} from 'react'
import { StakeContext } from 'contexts/StakeContext'
import Modal from 'react-modal';
import StakeCandidate from './StakeCandidate'

const SelectNFT = ({isOpen, closeDialog, addNFTHandler}) => {
  const { myNFTS } = useContext(StakeContext)

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
        }
      }}
      contentLabel="Example Modal"
    >
      <div style={{display: 'flex', width: '100%', flexWrap: 'wrap'}}>
        {_.map(myNFTS, nft=>(
          <StakeCandidate data={nft} closeRequest={closeDialog} />
        ))}
      </div>
    </Modal>
  )
}

export default SelectNFT
