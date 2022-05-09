import React, { useState, useEffect, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import useTheme from 'hooks/useTheme'

import NftBreeding from 'config/abi/NftBreeding.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'
import { getCowNftAddress, getBullNftAddress, getNftBreedingAddress } from 'utils/addressHelpers'
import { CATTLE_RARITY, COW_BREED,BULL_BREED, CASH_COWNFT_IMAGE_BASEURI, CASH_BULLNFT_IMAGE_BASEURI }  from "config/constants/nfts";
import Button from 'views/Pools/components/HarvestButton'
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
    cursor:pointer;
`
const chainId = process.env.REACT_APP_CHAIN_ID
const web3 = new Web3(Web3.givenProvider)

const BreedingCard = ({unLockTime, cowId, bullId, rarity, cowBreed,bullBreed}) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const { isDark } = useTheme();
    const { account } = useWallet()
    const [selectedNfts, setSelectedNfts] = useState([])
    const [cowImage, setCowImage] = useState('')
    const [bullImage, setBullImage] = useState('')
    const [isAvailable, setIsAvailable] = useState(false)

    // const cowContract = new web3.eth.Contract(CowNFT.abi as AbiItem[], getCowNftAddress());
    // const bullContract = new web3.eth.Contract(BullNFT.abi as AbiItem[], getBullNftAddress());
    const breedingContract = new web3.eth.Contract(NftBreeding.abi as AbiItem[], getBullNftAddress());
    const fetchData = useCallback( async () =>{
        // let cowData = await cowContract.methods.attrOf(cowId).call();
        // let bullData = await cowContract.methods.attrOf(cowId).call();
        let cowImage = CASH_COWNFT_IMAGE_BASEURI + CATTLE_RARITY[parseInt(rarity)] +"-"+ COW_BREED[parseInt(cowBreed)] + ".png";
        let bullImage = CASH_BULLNFT_IMAGE_BASEURI + CATTLE_RARITY[parseInt(rarity)] +"-"+ BULL_BREED[parseInt(bullBreed)] + ".png";
        setCowImage(cowImage);
        setBullImage(bullImage);
        if(unLockTime <= 0 ) {
            setIsAvailable(true);
        }
    }, [ cowBreed, bullBreed, unLockTime]);
    useEffect(() =>{
        fetchData();
    }, [fetchData])

    const claimActionHandler =async (_bullId) =>{
        await breedingContract.methods.claimCattle(_bullId).send({ from: account });
    }
    return (
        <Container>
            <ImageContainer>
                <img src={cowImage} alt="" style={{width: "80px",  height: "80px"}}/>
                <img src="/images/heartsf.png" alt="" style={{width: "50px",  height: "50px"}}/>
                <img src={bullImage} alt="" style={{width: "80px",  height: "80px"}}/>
                {
                    !isAvailable?
                    <TimeContainer>
                        <img src="/images/svgs/reloj.svg" alt="" style={{width: "42px",  height: "42px"}}/>
                        <p style={{textAlign: "center", color:"#689330"}}>{unLockTime} H</p>
                    </TimeContainer>
                    :
                    <TimeContainer onClick = {()=>claimActionHandler(bullId)}>
                        <img src="/images/svgs/edad.svg" alt="" style={{width: "42px",  height: "42px"}}/>
                        <p style={{textAlign: "center", color:"#689330"}}>CLAIM</p>
                    </TimeContainer>
                }
            </ImageContainer>
            
        </Container>
    )
}

export default BreedingCard
