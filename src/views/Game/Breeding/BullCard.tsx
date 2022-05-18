import React, { useState, useEffect, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import useTheme from 'hooks/useTheme'
import BullNFT from 'config/abi/BullNFT.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'
import { getBullNftAddress } from 'utils/addressHelpers'
import {CATTLE_RARITY, BULL_BREED, CASH_BULLNFT_IMAGE_BASEURI } from "config/constants/nfts";


const Container = styled.div`
    max-width: 200px;
    overflow: hidden;
    position: relative;
    border-radius: 32px;
    background-color: white;
    `

const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    `

const ActionContainer = styled.div`
    margin-left: 16px;
    margin-right: 16px;
    padding: 16px;
    font-size: 20px;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-style: solid;
    border-top: 2px solid #689330;
    color: #689330;
    cursor: pointer;
    `
const ModalTitleContainer = styled.div`
    width: 100%;
    margin-top: 8px;
    margin-bottom: 8px;
    font-size: 24px;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    `

const ModalNftsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
    justify-content: center;
    & > * {
        margin: 5px;
    }
    `
const NftItemContainer = styled.div`
    
    `
const chainId = process.env.REACT_APP_CHAIN_ID
const web3 = new Web3(Web3.givenProvider)

const BullCard = ({selectTokenId}) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [selectedTokenId, setSelectedTokenId] = useState(0)
    const { isDark } = useTheme();
    const { account } = useWallet()
    const [selectedNfts, setSelectedNfts] = useState([])

    const handleSelectNft = (tid : any) => {
        setModalOpen(false)
        setSelectedTokenId(tid)
        selectTokenId(tid)
    }

    const nftContract = useMemo(() => {
        return new web3.eth.Contract(BullNFT.abi as AbiItem[], getBullNftAddress())
      }, [])
      
    const fetchNftItems = useCallback(async () => {
        const tokenIds = await nftContract.methods.tokenIdsOf(account).call()
        
        const promises = []
        for (let i = 0; i < tokenIds.length;i ++) {
            promises.push(nftContract.methods.attrOf(tokenIds[i]).call())
        }
        const attrs = await Promise.all(promises)
        console.log(attrs)
        const filteredItems = []
        for (let i = 0; i < tokenIds.length;i ++) {
            const nftItem = {
                collectionName: "Cow",
                tokenId: tokenIds[i],
                rarity: attrs[i].rarity,
                breed: attrs[i].breed,
                image:CASH_BULLNFT_IMAGE_BASEURI + CATTLE_RARITY[parseInt(attrs[i].rarity)] +"-"+ BULL_BREED[parseInt(attrs[i].breed)] + ".png"
            };
            filteredItems.push(nftItem);
        }
        setSelectedNfts(filteredItems);
    }, [account, nftContract])
    
    useEffect(() => {
        fetchNftItems()
    }, [account,nftContract])
    return (
        <Container>    
            <TitleContainer>
                <img src="/images/svgs/masculino.svg" alt="" style={{width: "200px",  height: "200px"}}/>
            </TitleContainer>
            <ActionContainer onClick={(e) => setModalOpen(true)}>
                { selectedTokenId === 0 ? "ADD NFT" : "CHANGE NFT" }
            </ActionContainer>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setModalOpen(false)}
                ariaHideApp={false}
                style={{
                    content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: '30vw',
                    maxWidth: '50vw',
                    borderRadius: '15px',
                    background: isDark ? '#27262c' : 'white',
                    zindex: 15,
                    }
                }}
                contentLabel="Example Modal"
                >
                <ModalTitleContainer>Bulls</ModalTitleContainer>
                <ModalNftsContainer>
                    {selectedNfts.map((nftEachItem) => {
                        return <NftItemContainer onClick={() => handleSelectNft(nftEachItem.tokenId)}>
                            <img src= {nftEachItem.image} alt=""  style={{width: "160px",  height: "160px"}} key={nftEachItem.tokenId} />
                        </NftItemContainer>
                    })}
                </ModalNftsContainer>
            </Modal>
        </Container>
    )
}

export default BullCard
