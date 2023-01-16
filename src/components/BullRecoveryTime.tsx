import React, { useEffect, useState, useMemo } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTheme from 'hooks/useTheme'
import BullNFT from 'config/abi/BullNFT.json'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils';
import { getBullNftAddress } from 'utils/addressHelpers'
import cowRarityMilkPower from 'config/constants/cowMilkPower';
import styled from 'styled-components';

const ItemMetaData = styled.div`
    color: white;
    font-size: 18px;
    font-weight: 400;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: .3em;
    margin-bottom: .3em;
`

const web3 = new Web3(Web3.givenProvider);

const BullRecoveryTime = ({ tokenID }: { tokenID: any }) => {

    const { account } = useWallet()
    const { isDark } = useTheme()

    const [loading, setLoading] = useState(true);
    const [recoveryTime, setRecoveryTime] = useState('');

    useEffect(() => {
        fetchBullRecoveryTime(tokenID);
    }, [])

    const bullnftContract = useMemo(() => {
        return new web3.eth.Contract(BullNFT.abi as AbiItem[], getBullNftAddress())
    }, [])

    const fetchBullRecoveryTime = async (bullID) => {
        console.log('Fetching recuperation time for bull: ', bullID)

        const currentTimestamp = new Date().getTime() / 1000;
        const maxRecoveryTime = 15 * 24 * 60 * 60;
        const maxAge = 200 * 24 * 60 * 60;

        const res = await bullnftContract.methods.attrOf(bullID).call({ from: account })

        const bullAge = currentTimestamp - res.birth;

        const bullBreed = res.breed;
        const bullRarity = parseInt(res.rarity);

        const baseRecoveryTimes = [3000, 2400, 1800, 1200, 600]
        let bullRecoveryTime = (baseRecoveryTimes[bullRarity] + ((maxRecoveryTime - baseRecoveryTimes[bullRarity]) * (bullAge / maxAge))) / (60 * 60)
        setRecoveryTime(bullRecoveryTime.toFixed(0));
        setLoading(false);
    }

    return (
        <ItemMetaData
            style={{ color: isDark ? 'white' : 'white' }}
        >
            <img
                src="/images/svgs/relojgreen.svg"
                alt="token"
                style={{ width: '18px', height: '18px' }}
            />
            &nbsp;&nbsp;
            {loading ? 'Loading...' : recoveryTime}
        </ItemMetaData>
    )
}

export default BullRecoveryTime