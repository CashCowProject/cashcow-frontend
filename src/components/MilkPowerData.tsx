import React, { useEffect, useState, useMemo } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useTheme from 'hooks/useTheme'
import CowNFT from 'config/abi/CowNFT.json'
import Web3 from 'web3'
import { AbiItem } from 'web3-utils';
import { getCowNftAddress } from 'utils/addressHelpers'
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

const MilkPowerData = ({tokenID}: {tokenID: any}) => {

    const { account } = useWallet()
    const { isDark } = useTheme()

    const [loading, setLoading] = useState(true);
    const [milkPower, setMilkPower] = useState('');

    useEffect(() => {
        fetchCowAge(tokenID);
    }, [])

    const cownftContract = useMemo(() => {
        return new web3.eth.Contract(CowNFT.abi as AbiItem[], getCowNftAddress())
    }, [])

    const fetchCowAge = async (cowID) => {
        console.log('Fetching Age For: ', cowID)
        const currentTimestamp = new Date().getTime() / 1000;
        const maxAge = 200 * 24 * 60 * 60;
        const res = await cownftContract.methods.attrOf(cowID).call({ from: account })

        const cowBreed = parseInt(res.breed);
        const cowRarity = parseInt(res.rarity)

        const cowAge = currentTimestamp - res.birth;
        let cowAgingMultiplier = 0;

        if (maxAge > cowAge) {
            cowAgingMultiplier = 1 - (cowAge / maxAge);
        }

        const cowMilkPower = cowRarityMilkPower[cowRarity] * cowAgingMultiplier

        setMilkPower(cowMilkPower.toFixed(0));
        setLoading(false);
    }

    return (
        <ItemMetaData
            style={{ color: isDark ? 'white' : 'white' }}
        >
            <img
                src="/images/svgs/vida.svg"
                alt="token"
                style={{ width: '18px', height: '18px' }}
            />
            &nbsp;&nbsp;
            {loading ? 'Loading...' : milkPower}
        </ItemMetaData>
    )
}

export default MilkPowerData



