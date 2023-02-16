import React, { useState, useEffect, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import useTheme from 'hooks/useTheme'
import BullNFT from 'config/abi/BullNFT.json'
import NftFarming from 'config/abi/NftFarming.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { AbiItem } from 'web3-utils'
import Web3 from 'web3'
import { getBullNftAddress, getNftBreedingAddress, getNftFarmingAddress } from 'utils/addressHelpers'
import { CATTLE_RARITY, BULL_BREED, CASH_BULLNFT_IMAGE_BASEURI } from "config/constants/nfts";
import { MDBMask, MDBView, MDBContainer } from 'mdbreact';

const Container = styled.div`
    max-width: 200px;
    overflow: hidden;
    position: relative;
    @media (max-width: 768px) {
        margin: 2em auto;
    }
`
const TitleContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    border-radius: 22px;
    background-color: rgb(11,51,75);
`

const ActionContainer = styled.div`
    margin-top: 20px;
    margin-left: 0px;
    margin-right: 16px;
    padding: 16px;
    font-size: 20px;
    font-weight: 1000;
    line-height: 1.5;
    width: 100%;
    display: flex;
    align-items: center;
    align-items: center;
    justify-content: space-evenly;
    color: white;
    background-color: rgb(11,51,75);
    border-radius: 22px;
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

const BullCard = ({ selectTokenId, updateFlag }) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [selectedTokenId, setSelectedTokenId] = useState(0)
    const { isDark } = useTheme();
    const { account } = useWallet()
    const [selectedNfts, setSelectedNfts] = useState([])
    const [selectedImage, setTokenImage ] = useState('');

    const handleSelectNft = (tid : any, imageUrl: string) => {
        setModalOpen(false)
        setSelectedTokenId(tid)
        setTokenImage(imageUrl);
        selectTokenId(tid)
    }

    const nftContract = useMemo(() => {
        return new web3.eth.Contract(BullNFT.abi as AbiItem[], getBullNftAddress())
    }, [])
    const farmingContract = useMemo(() => {
        return new web3.eth.Contract(NftFarming.abi as AbiItem[], getNftFarmingAddress())
    }, [])

    const fetchNftItems = useCallback(async () => {

        const tokenIds = await farmingContract.methods.breedingBullTokenIdsOf(account).call({from: account})
        console.log(tokenIds)
        const promises = []
        for (let i = 0; i < tokenIds.length; i++) {
            promises.push(nftContract.methods.attrOf(tokenIds[i]).call())
        }
        const attrs = await Promise.all(promises)
        console.log(attrs)
        const filteredItems = []
        for (let i = 0; i < tokenIds.length; i++) {
            const nftItem = {
                collectionName: "Cow",
                tokenId: tokenIds[i],
                rarity: attrs[i].rarity,
                breed: attrs[i].breed,
                image: CASH_BULLNFT_IMAGE_BASEURI + CATTLE_RARITY[parseInt(attrs[i].rarity)] + "-" + BULL_BREED[parseInt(attrs[i].breed)] + ".png"
            };
            filteredItems.push(nftItem);
        }
        setSelectedNfts(filteredItems);
        setSelectedTokenId(0)
    }, [account, nftContract, updateFlag])

    useEffect(() => {
        fetchNftItems()
    }, [account, nftContract, updateFlag])
    return (
        <Container>
            <TitleContainer>
                <MDBContainer className = "mt-1">
                    {selectedTokenId == 0?
                        <MDBView>
                          < img src="/images/breeding/marcometal.png" alt="" style={{position:"relative", zIndex:"1", margin:"0 auto", width: "200px",  height: "200px"}}/>
                         <img src="/images/svgs/masculino.svg" alt="" style={{position:"absolute", zIndex:"3", bottom:"90px", left:"25px", width: "140px",  height: "140px"}}/>
                         <img src="/images/breeding/rejilla1.png" alt="" style={{margin:"5px", width: "200px",  height: "50px"}}/>

                        </MDBView>
                        :
                        <MDBView rounded>
                            <img src={selectedImage} alt="" style={{width: "200px",  height: "180px", borderRadius: '75px'}}/>
                            <MDBMask className = 'flex-center' >
                                <img src="/images/breeding/marcometal.png" alt="" />
                            </MDBMask>
                        </MDBView>
                    }
                </MDBContainer>
            </TitleContainer>
            <ActionContainer onClick={(e) => setModalOpen(true)}>
                {selectedTokenId === 0 ? "ADD NFT" : "CHANGE NFT"}
                {selectedTokenId == 0?
                    <div style = {{height: '30px'}}>
                        <img src="/images/breeding/boton-gris.png" alt="" style = {{width: '30px'}}/>
                    </div>
                    :
                    <div style = {{height: '30px'}}>
                        <img src="/images/breeding/boton-verde.png" alt="" style = {{width: '30px'}}/>
                    </div>
                }
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
                    {selectedNfts.map((nftEachItem, idx) => {
                        return <NftItemContainer onClick={() => handleSelectNft(nftEachItem.tokenId, nftEachItem.image)} key = {nftEachItem.tokenId + "_" + idx}>
                            <img src={nftEachItem.image} alt="" style={{ width: "160px", height: "160px" }} key={nftEachItem.tokenId} />
                        </NftItemContainer>
                    })}
                </ModalNftsContainer>
            </Modal>
        </Container>
    )
}

export default BullCard
