/* eslint-disable */
import React, { useCallback, useMemo, useState } from 'react'
import Modal from 'react-modal';
import { Button } from 'cashcow-uikit'
import ModalActions from 'components/ModalActions'
import TokenInput from 'components/TokenInput'
import styled from 'styled-components'

const ModalTitle = styled.div`
color: white;
font-size: 1.1em;
margin-bottom: 10px;
`

const CostWarning = styled.div`
color: #bfbfbf;
margin-top: 15px;
margin-bottom: 5px;
font-size: 0.8em;
border-radius: 10px;
`

const WithdrawModal = ({ isOpen, cowStaked, setIsOpen, handleUnstakeCow }) => {

  const [val, setVal] = useState('')

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(cowStaked)
  }, [cowStaked, setVal])

  return (
    <Modal
      isOpen={isOpen}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: "25vw",
          maxWidth: '25vw',
          minWidth: '25vw',
          borderRadius: '15px',
          background: '#27262c',
          zindex: 15,
        }
      }}
    >
      <ModalTitle>
        Unstake COW Tokens
      </ModalTitle>
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={cowStaked}
        symbol={'COW'}
      // depositFeeBP={depositFeeBP}
      />

      <CostWarning>
        Remember that $COW transactions are subject to a 10% fee.
      </CostWarning>

      <ModalActions>
        <Button variant="secondary" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button onClick={() => handleUnstakeCow(val)}>
          Confirm
        </Button>
      </ModalActions>
    </Modal>
  )
}

export default WithdrawModal
