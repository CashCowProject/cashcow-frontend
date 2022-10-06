import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import useTheme from 'hooks/useTheme'
import Web3 from "web3";
import { fromWei, toWei, AbiItem, toBN } from "web3-utils";
import {useWallet } from '@binance-chain/bsc-use-wallet'
import { getNftFarmingAddress, getCowNftAddress, getBullNftAddress } from 'utils/addressHelpers'
import CowNFT from 'config/abi/CowNFT.json';
import BullNFT from 'config/abi/BullNFT.json';
import NftFarming from 'config/abi/NftFarming.json'

export interface CardInterface {
    title?: string;
    value?: string;
    tokenIds?: string[];
    isCowNFT?: boolean;
}
const web3 = new Web3(Web3.givenProvider);

const Container = styled.div`
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
    border-radius: 32px;
    background-color: rgb(11,51,75);
    color: white;
    display: flex;
    `
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 50%;
`
const ImageContainer = styled.div`
    display: flex;
    padding: 20px;
    flex: 50%;
`
const TitleContainer = styled.div`
    width: 100%;
    margin-top: 16px;
    margin-bottom: 5px;
    font-size: 1.5vw;
    font-weight: 600;
    line-height: 1.2;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        font-size: 5vw;
    }
    `
const ValueContainer = styled.div`
    width: 100%;
    font-size: 1.5vw;
    font-weight: 500;
    line-height: 1.2;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        font-size: 5vw;
    }
    `
const ActionContainer = styled.div`
    margin-left: 16px;
    margin-right: 16px;
    font-size: 20px;
    font-weight: 500;
    line-height: 1.2;
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
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 24px;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    `
const TableContainer = styled.div`
    & td {
        border: solid 1px gray;
        padding: 2px;
        width: 40px;
        height: 40px;
        text-align: center;
    }
`
const CattleCard = ({ title, value, tokenIds, isCowNFT }: CardInterface) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const { isDark } = useTheme();
    const { account } = useWallet()
    const [viewData, setViewData] = useState([[]])
    const cowContract = new web3.eth.Contract(CowNFT.abi as AbiItem[], getCowNftAddress());
    const BullContract = new web3.eth.Contract(BullNFT.abi as AbiItem[], getBullNftAddress());
    const FarmContract = new web3.eth.Contract(NftFarming.abi as AbiItem[], getNftFarmingAddress());
    const [capacity, setCapacity] = useState("0");
    useEffect(() => {
        async function fetchInfo() {
            const temp = Array(5).fill(0).map(row => new Array(5).fill(0));
            tokenIds.map(async (id) => {
                let metadata = isCowNFT ? await cowContract.methods.attrOf(id).call() : await BullContract.methods.attrOf(id).call()
                let rarity = parseInt(metadata.rarity);
                let kind = parseInt(metadata.breed);
                temp[kind][rarity] += 1;
            });
            const _capacity = isCowNFT? await FarmContract.methods._totalCowLimitOf(account).call() : await FarmContract.methods._totalBullLimitOf(account).call();
            console.log(_capacity)
            setCapacity(_capacity);
            setViewData(temp)
        }
        fetchInfo();
    }, [tokenIds, isCowNFT, account]);

    return (
        <Container>
            <ImageContainer>
                {isCowNFT?
                <img src = "/images/farms/dashboard/illustrations/mycows.png" />
                :
                <img src = "/images/farms/dashboard/illustrations/mybulls.png" />
            }
            </ImageContainer>
            <ContentContainer>
                <TitleContainer>
                    {title}
                </TitleContainer>
                <ValueContainer>
                    {value} / {capacity}
                </ValueContainer>
                <ActionContainer onClick={(e) => setModalOpen(true)}>
                    <img src ="/images/farms/dashboard/buttons/moreinfogray.png" 
                            onMouseOver={e => e.currentTarget.src = "/images/farms/dashboard/buttons/moreinfo.png"}
                            onMouseOut={e => e.currentTarget.src = "/images/farms/dashboard/buttons/moreinfogray.png"}
                    />
                </ActionContainer>
            </ContentContainer>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setModalOpen(false)}
                iaHideApp={false}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        /* width: "70vw",
                        maxWidth: '70vw',
                        minWidth: '70vw', */
                        borderRadius: '15px',
                        background: isDark ? '#27262c' : 'white',
                        zindex: 15,
                    }
                }}
                contentLabel="Example Modal"
            >
                <ModalTitleContainer>
                    <div style = {{color: isDark?"white":""}}>
                        {title}
                    </div>
                </ModalTitleContainer>
                <TableContainer>
                    <table style = {{fontSize:20, color: isDark?"white":""}}>
                        <tr>
                            <td />
                            <td><img src="/images/svgs/common.svg" alt="" style={{ width: "32px", height: "32px" }} /></td>
                            <td><img src="/images/svgs/uncommon.svg" alt="" style={{ width: "32px", height: "32px" }} /></td>
                            <td><img src="/images/svgs/rare.svg" alt="" style={{ width: "32px", height: "32px" }} /></td>
                            <td><img src="/images/svgs/legendary.svg" alt="" style={{ width: "32px", height: "32px" }} /></td>
                            <td><img src="/images/svgs/holy.svg" alt="" style={{ width: "32px", height: "32px" }} /></td>
                        </tr>
                        <tr>
                            <td><img src="/images/svgs/highland.svg" alt="" style={{ width: "32px", height: "32px" }} /></td>
                            {
                                viewData[0] && viewData[0].map((item, id) => {
                                    return <td style={{verticalAlign:'middle'}} key = {"0_" + id}>{item != 0 ? item : ""}</td>
                                })
                            }
                        </tr>
                        <tr>
                            <td><img src="/images/svgs/holstein.svg" alt="" style={{ width: "32px", height: "32px" }} /></td>
                            {
                                viewData[1] && viewData[1].map((item,id) => {
                                    return <td style={{verticalAlign:'middle'}} key = {"1_" + id}>{item != 0 ? item : ""}</td>
                                })
                            }
                        </tr>
                        <tr>
                            <td><img src="/images/svgs/hereford.svg" alt="" style={{ width: "32px", height: "32px" }} /></td>
                            {
                                viewData[2] && viewData[2].map((item,id) => {
                                    return <td style={{verticalAlign:'middle'}} key = {"2_" + id}>{item != 0 ? item : ""}</td>
                                })
                            }
                        </tr>
                        <tr>
                            <td><img src="/images/svgs/brahman.svg" alt="" style={{ width: "32px", height: "32px" }} /></td>
                            {
                                viewData[3]&&viewData[3].map((item, id) => {
                                    return <td style={{verticalAlign:'middle'}} key = {"3_" + id}>{item != 0 ? item : ""}</td>
                                })
                            }
                        </tr>
                        <tr>
                            <td><img src="/images/svgs/angus.svg" alt="" style={{ width: "32px", height: "32px" }} /></td>
                            {
                                viewData[4]&&viewData[4].map((item,id) => {
                                    return <td style={{verticalAlign:'middle'}} key = {"4_" + id}>{item != 0 ? item : ""}</td>
                                })
                            }
                        </tr>
                    </table>
                </TableContainer>
            </Modal>
        </Container>
    )
}

export default CattleCard
