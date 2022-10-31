import React, { useState, useEffect, useContext, useMemo } from 'react'
import styled from 'styled-components'
import { LoadingContext } from 'contexts/LoadingContext'
import Web3 from "web3";
import NftFarmingV2 from 'config/abi/NftFarmingV2.json'
import { fromWei, AbiItem } from "web3-utils";
import { useWallet } from '@binance-chain/bsc-use-wallet'
import toast from 'react-hot-toast'
import { getNftFarmingAddress } from 'utils/addressHelpers'
import '../management.css'

const web3 = new Web3(Web3.givenProvider);

const CowStakingCard = ({ }) => {
    const { account, connect } = useWallet()
    const { setLoading } = useContext(LoadingContext);

    const farmingContract = new web3.eth.Contract(NftFarmingV2.abi as AbiItem[], getNftFarmingAddress());


    return (
        <>
            <div className='individual-genesis-box'>
                Hola
            </div>
            Chau
        </>
    )
}

export default CowStakingCard;
