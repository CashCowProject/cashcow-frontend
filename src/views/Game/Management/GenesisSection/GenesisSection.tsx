import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Web3 from "web3";
import { fromWei, AbiItem } from "web3-utils";
import NftFarmingV2 from 'config/abi/NftFarmingV2.json'
import { getNftFarmingAddress } from 'utils/addressHelpers'
import { useWallet } from '@binance-chain/bsc-use-wallet'

const Container = styled.div`
    width: 50%;
    height: 150px;
    overflow: hidden;
    position: relative;
    border-radius: 32px;
    background-color: rgb(11,51,75);
    color: white;
    @media (max-width: 768px) {
        margin-top: 1em;
        margin-left: 5%;
        width: 90%;
    }
    `

const TitleContainer = styled.div`
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 1.6vw;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        font-size: 5vw;
    }
    `
const ValueContainer = styled.div`
    width: 100%;
    font-size: 1.6vw;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        font-size: 5vw;
    }
    `
const StatusContainer = styled.div`
    border-radius: 16px;
    padding-top: 4px;
    margin-left: 8px;
    `

const web3 = new Web3(Web3.givenProvider);

const GenesisSection = () => {

    useEffect(() => {
        fetchUserGenesis();
    }, [])

    const { account, connect } = useWallet()
    const [genesisNftStatus, setGenesisNftStatus] = useState(true)

    const farmingContract = new web3.eth.Contract(NftFarmingV2.abi as AbiItem[], getNftFarmingAddress());

    const fetchUserGenesis = async () => {
        try {
            const userGenesis = await farmingContract.methods.genesisTokenIdsOf(account).call();
            if (userGenesis.length > 0) {
                console.log('Genesis Tokens ', userGenesis);
                setGenesisNftStatus(true);
            } else {
                console.log('No Genesis Staked');
                setGenesisNftStatus(false);
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container>
            <TitleContainer>
                Genesis NFT
            </TitleContainer>
            <ValueContainer>
                <StatusContainer>
                    {genesisNftStatus ?
                        <img src="/images/svgs/check.svg" alt="" style={{ width: "50px", height: "50px", marginRight: '8px' }} />
                        :
                        <img src="/images/svgs/none.svg" alt="" style={{ width: "50px", height: "50px", marginRight: '8px' }} />
                    }

                </StatusContainer>
            </ValueContainer>
        </Container>
    )
}

export default GenesisSection;
