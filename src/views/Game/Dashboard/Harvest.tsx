import React, { useState, useEffect, useContext, useMemo } from 'react'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import toast from 'react-hot-toast'

import { LoadingContext } from 'contexts/LoadingContext'
import { getNftFarmingAddress } from 'utils/addressHelpers'
import NftFarming from 'config/abi/NftFarming.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { fromWei, toWei, AbiItem, toBN } from "web3-utils";
import Web3 from "web3";

export interface CardInterface {
    title?: string;
    value?: string;
}

const Container = styled.div`
    width: 20%;
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    border-radius: 12px;
    background-color: white;
    align-items: center;
    background-color: transparent;
    flex-direction: column;
    @media (max-width: 768px) {
        width: 40%;
    }
`
const ContentContainer = styled.div`
    display : flex;
    // flex: 60%;
    flex-direction: column;
    color: white;
    margin-bottom: 7px;
`
const Title = styled.div`
    width: 100%;
    font-size: 1.2vw;
    font-weight: 1000;
    line-height: 1.5;
    text-align: center;
    @media (max-width: 768px) {
        font-size: 1.1em;
        font-weight: 100;
        line-height: 1.0;
    }
`
const Value = styled.div`
    width: 100%;
    font-size: 1.2vw;
    font-weight: 1000;
    text-align: center;
    @media (max-width: 768px) {
        margin-top: 4px;
        font-size: 1.1em;
        font-weight: 100;

    }
`
const ActionContainer = styled.div`
    font-size: 20px;
    color: #689330;
    cursor: pointer;
    width: 70%;
`

const Harvest = ({title, value}: CardInterface) => {
    const web3 = new Web3(Web3.givenProvider);
    const { account, connect } = useWallet();
    const farmContract = useMemo(() => {
        return new web3.eth.Contract(NftFarming.abi as AbiItem[], getNftFarmingAddress())
      }, [account])

    const { setLoading } = useContext(LoadingContext);
    const { isDark } = useTheme();

    
    const harvestController = async () =>{
        try{
          if(account) {
            setLoading(true);
            // let estimatedGas = await farmContract.methods.harvest().estimateGas({from: account});
            await farmContract.methods.harvest().send({ from: account});
            setLoading(false);
          } else {
            connect('injected');
          }
        }catch(err: unknown) {
            setLoading(false);
            console.log(err);
            toast.error("havesting failed");
        }
    }
    return (
        <Container>   
            <ContentContainer>
                <Title>
                    {title}
                </Title>
                <Value>
                    {value}
                </Value>
            </ContentContainer>

            <ActionContainer >
                <img src="/images/farms/dashboard/buttons/harvestgray.png" alt="harvest image" style = {{width: "100%"}} 
                    onClick = {harvestController}
                    onMouseOver = {e => e.currentTarget.src = "/images/farms/dashboard/buttons/harvestgreen.png"}
                    onMouseOut = {e => e.currentTarget.src = "/images/farms/dashboard/buttons/harvestgray.png"}
                />
            </ActionContainer>
        </Container>
    )
}

export default Harvest
