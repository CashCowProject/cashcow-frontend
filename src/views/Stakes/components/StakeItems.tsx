import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { StakeContext } from 'contexts/StakeContext'
import { StakeItem, NewItem } from './ItemComponents'

const StakeItemContainer = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
`
const StakeItems = ({index}) => {
  const { selectedNFTS } = useContext(StakeContext)
  return (
    <StakeItemContainer>
        {selectedNFTS.map((itm) => (
          <div style={{width: '25%'}}>
            <StakeItem key={itm.tokenId} data={itm} index={index}/>
          </div>
        ))}
        <div style={{width: '25%'}}>
          <NewItem index={index}/>
        </div>

    </StakeItemContainer>
  )
}

export default StakeItems
