import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { StakeContext } from 'contexts/StakeContext'
import { StakeItem, NewItem } from './ItemComponents'

const StakeItemContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
`
const StakeItems = () => {
  const { selectedNFTS } = useContext(StakeContext)
  return (
    <StakeItemContainer>
      <>
        {selectedNFTS.map((itm) => (
          <StakeItem key={itm.tokenId} data={itm} />
        ))}
        <NewItem />
      </>
    </StakeItemContainer>
  )
}

export default StakeItems
