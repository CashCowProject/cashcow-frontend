import React from 'react'
import styled from 'styled-components'

export interface NftPackItemInterface {
  background?: string
  title?: string
}

const ItemBackgroundCover = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;
  border-radius: 32px;
`

const NftPackItem = ({ background, title }: NftPackItemInterface) => {
  const TitleContainer = styled.div`
    position: absolute;
    bottom: 15px;
    width: 100%;
    color: white;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.25;
    display: flex;
    align-items: center;
    justify-content: center;
  `
  const ItemBackground = styled.div`
    width: 100%;
    height: 100%;
    background-image: url(/images/nftpacks/${background});
    background-size: 100% 100%;
    background-position: 0;
    background-repeat: no-repeat;
    cursor: pointer;
    transition: all 1s;
    &:hover {
      transform: scale(1.02);
    }
    @media (max-width: 768px) {
      background-position: 30%;
    }
  `
  return (
    <ItemBackgroundCover>
      <ItemBackground>
        <TitleContainer>{title}</TitleContainer>
      </ItemBackground>
    </ItemBackgroundCover>
  )
}

export default NftPackItem
