import React, { useState,useMemo, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import Modal from 'react-modal'
import useTheme from 'hooks/useTheme'
import Web3 from "web3";
import { fromWei, toWei, AbiItem, toBN } from "web3-utils";
import { getLandNftAddress } from 'utils/addressHelpers'
import LandNFT from 'config/abi/LandNFT.json';

export interface CardInterface {
    title?: string;
    value?: string;
    tokenIds?: number[];
}
const web3 = new Web3(Web3.givenProvider);

const Container = styled.div`
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
    border-radius: 32px;
    background-color: white;
    `

const TitleContainer = styled.div`
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 27px;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    `
const ValueContainer = styled.div`
    width: 100%;
    font-size: 24px;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    `
const ActionContainer = styled.div`
    margin-left: 16px;
    margin-right: 16px;
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
const LandCard = ({title, value, tokenIds}: CardInterface) => {
    const [isModalOpen, setModalOpen] = useState(false)
    const { isDark } = useTheme();
    const [landData, setLandData] = useState([[]])
    const [isMounted, setMounted] = useState(false);
    const landContract = new web3.eth.Contract(LandNFT.abi as AbiItem[], getLandNftAddress());
    const landInfo = useEffect(() => {
        async function loadData() {
            const temp = Array(5).fill(0).map(row => new Array(5).fill(0));
            tokenIds.map(async(id) =>{
                let metadata = await landContract.methods.attrOf(id).call()
                let rarity = parseInt(metadata.rarity);
                let kind = parseInt(metadata.landType);
                temp[kind][rarity] +=1; 
            });
            setLandData(temp)
        }
        loadData();
    },[tokenIds]);

    return (
        <Container>    
            <TitleContainer>
                {title}
            </TitleContainer>
            <ValueContainer>
                {value}
            </ValueContainer>
            <ActionContainer onClick={(e) => setModalOpen(true)}>
                MORE INFO
            </ActionContainer>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setModalOpen(false)}
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
                        {title}
                    </ModalTitleContainer>
                    <TableContainer>
                        <table style = {{fontSize:20}}>
                            <tr>
                                <td />
                                <td><img src="/images/svgs/common.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                <td><img src="/images/svgs/uncommon.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                <td><img src="/images/svgs/rare.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                <td><img src="/images/svgs/legendary.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                <td><img src="/images/svgs/holy.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                            </tr>
                            <tr>
                                <td><img src="/images/svgs/mountains.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                {
                                    landData[0]&&landData[0].map(item =>{
                                        return <td style={{verticalAlign:'middle'}}>{item!=0?item:""}</td>
                                    })
                                }
                            </tr>
                            <tr>
                                <td><img src="/images/svgs/plains.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                {
                                    landData[1]&&landData[1].map(item =>{
                                        return <td style={{verticalAlign:'middle'}}>{item!=0?item:""}</td>
                                    })
                                }
                            </tr>
                            <tr>
                                <td><img src="/images/svgs/woods.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                {
                                    landData[2]&&landData[2].map(item =>{
                                        return <td style={{verticalAlign:'middle'}}>{item!=0?item:""}</td>
                                    })
                                }
                            </tr>
                            <tr>
                                <td><img src="/images/svgs/jungle.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                {
                                    landData[3]&&landData[3].map(item =>{
                                        return <td style={{verticalAlign:'middle'}}>{item!=0?item:""}</td>
                                    })
                                }
                            </tr>
                            <tr>
                                <td><img src="/images/svgs/hills.svg" alt="" style={{width: "32px",  height: "32px"}}/></td>
                                {
                                    landData[4]&&landData[4].map(item =>{
                                        return <td style={{verticalAlign:'middle'}}>{item!=0?item:""}</td>
                                    })
                                }
                            </tr>
                        </table>
                    </TableContainer>
                
            </Modal>
        </Container>
    )
}

export default LandCard
