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
    width: 30%;
    height: 60px;
    overflow: hidden;
    display: flex;
    flex-wrap: nowrap;
    border-radius: 12px;
    background-color: white;
    align-items: center;
`
const ContentContainer = styled.div`
    display : flex;
    flex: 60%;
    flex-direction: column;
    justify
`
const Title = styled.div`
    width: 100%;
    font-size: 22px;
    font-weight: 1000;
    line-height: 1.5;
    text-align: center;
    `
const Value = styled.div`
    width: 100%;
    font-size: 24px;
    font-weight: 1000;
    text-align: center;
`
const ActionContainer = styled.div`
    font-size: 20px;
    color: #689330;
    cursor: pointer;
    flex: 40%;
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
            // let estimatedGas = farmContract.methods.harvest().estimateGas({from: account});
            await farmContract.methods.harvest().send({ from: account });
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
                <img src="/images/boton-harvest.png" alt="harvest image" style = {{width: "100%"}} onClick = {harvestController}/>
            </ActionContainer>
        </Container>
    )
}

export default Harvest
