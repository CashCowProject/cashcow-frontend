import React, { useState } from 'react'
import { Flex, Text, Tag } from 'cashcow-uikit'
import useI18n from 'hooks/useI18n'
import useTheme from 'hooks/useTheme'
import styled from 'styled-components'
import SelectNFT from './SelectNFT'

const ImageContainer = styled.div`
  position: relative;
  padding-bottom: 100%;
  height: 0;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
  background-color: rgb(249, 244, 211);
  cursor: pointer;
`

const AddImage = styled.div`
  transition: transform .3s ease,-webkit-transform .3s ease;
  transform-origin: center;
  background-size: auto 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  background-image: url('/images/add.svg');
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  &:hover{
    transform: scale(1.04);
  }
`

const Divider = styled.div`
    height: 1px;
    min-width: unset;
    background-image: url(../images/line.jpg);
    background-repeat: repeat-x;
    position: relative;
    background-size: contain;
    background-position: 50%;
`

const NewItem = ({index}) => {
  const TranslateString = useI18n()
  const { isDark } = useTheme()
  const [isOpen, setModalOpen] = useState(false)

  const ItemContainer = styled.div`
    margin-right: 15px;
    margin-bottom: 15px;
    border-radius: 16px;
    background: ${!isDark ? 'white' : '#27262c'};
    box-shadow: 0px 2px 12px -8px ${!isDark ? 'rgba(25, 19, 38, 0.7)' : 'rgba(203, 203, 203, 0.7)'}, 0px 1px 1px ${!isDark ? 'rgba(25, 19, 38, 0.05)' : 'rgba(203, 203, 203, 0.05)'};
    position: relative;
  `
  const StakeBtn = styled(Tag)`
    border-color: ${!isDark ? '#a99653' : '#101820'};
    background-color: ${!isDark ? '#a99653' : '#101820'};
    color: ${!isDark ? '#361B72' : 'white'};
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 16px 12px;
    font-size: 18px;
    margin-bottom: 12px;
    border-radius: 12px;
  `

  const UpgradeBtn = styled(Tag)`
    border-color: ${!isDark ? '#a99653' : '#101820'};
    background-color: ${!isDark ? 'rgba(250,213,81,.1)' : 'rgba(16,24,32,.2)'};
    color: ${!isDark ? '#361B72' : 'white'};
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 16px 12px;
    font-size: 18px;
    border-radius: 12px;
  `

  const closeDialog = () => {
    setModalOpen(false);
  }

  const addNFT2Stake = (val) => {
    return false;
  }

  return (
    <ItemContainer style={{background : isDark ? '#27262c' : ''}}>
      <Flex flexDirection="column">
        <ImageContainer style={{background: isDark ? '#101820' : 'white'}} onClick={e=>setModalOpen(true)}>
          <AddImage />
        </ImageContainer>
        <Divider />
        <Flex flexDirection="column" style={{padding: '24px'}}>
          <Text fontSize="24px" style={{textAlign: 'center'}}>Add NFT</Text>
        </Flex>
      </Flex>
      <SelectNFT 
        isOpen={isOpen}
        closeDialog={closeDialog}
        addNFTHandler={addNFT2Stake}
        index={index}
      />
    </ItemContainer>
  )
}

export default NewItem