import React, { useState, useEffect, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import useTheme from 'hooks/useTheme'
import CowNFT from 'config/abi/CowNFT.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'
import { getCowNftAddress } from 'utils/addressHelpers'

const Container = styled.div`
    overflow: hidden;
    position: relative;
    border-radius: 8px;
    background-color: white;
    `
const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    & > * {
        margin: 8px;
    }
    `
const TimeContainer = styled.div`

    `
const chainId = process.env.REACT_APP_CHAIN_ID
const web3 = new Web3(Web3.givenProvider)

const BreedingCard = () => {
    const [isModalOpen, setModalOpen] = useState(false)
    const { isDark } = useTheme();
    const { account } = useWallet()
    const [selectedNfts, setSelectedNfts] = useState([])
    
    return (
        <Container>
            <ImageContainer>
                <img src="/images/svgs/femenino.svg" alt="" style={{width: "48px",  height: "48px"}}/>
                <img src="/images/heartsf.png" alt="" style={{width: "32px",  height: "32px"}}/>
                <img src="/images/svgs/masculino.svg" alt="" style={{width: "48px",  height: "48px"}}/>
                <TimeContainer>
                <img src="/images/svgs/reloj.svg" alt="" style={{width: "32px",  height: "32px"}}/>
                <p style={{textAlign: "center", color:"#689330"}}>24 H</p>
                </TimeContainer>
            </ImageContainer>
            
        </Container>
    )
}

export default BreedingCard
