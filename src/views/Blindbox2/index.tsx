import React, {useCallback, useEffect, useMemo, useState} from 'react'
import styled, { useTheme } from 'styled-components'
import { Link } from 'react-router-dom'
import { Heading } from 'cashcow-uikit'
import Page from 'components/layout/Page'
import BlindBoxItem from './BlindBoxItem'
import Web3 from "web3";
import { fromWei, toWei, AbiItem, toBN } from "web3-utils";
import NftSale from 'config/abi/NftSale.json'
import { getNftSaleAddress } from 'utils/addressHelpers'
import NftPack from './NftPack';
import NftIndividual from './Individual'

const web3 = new Web3(Web3.givenProvider);

const StyledHero = styled.div`
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 20px;
`

const BlindboxCow = () => {
    const { isDark } = useTheme();
    const [packState, setPackState] = useState(1);
    const saleContract = useMemo(() =>{
        return new web3.eth.Contract(NftSale.abi as AbiItem[], getNftSaleAddress());
    },[]) 
    const fetchPackSaleState = useCallback(async () => {
        const endTime = await saleContract.methods.packSaleEnd().call()
        const startTIme = await saleContract.methods.packSaleStart().call()
        const currentTime = (await web3.eth.getBlock("latest")).timestamp;
        if(currentTime <= startTIme ) {
            setPackState(0);
        } else if(currentTime  > endTime) {
            setPackState(2);
        }
    },[]);
    useEffect(() =>{
        fetchPackSaleState();
    },[])
    return (
        <Page style={{
            backgroundImage: isDark ? `url(/images/cow/home-backgrounddark.png)` : `url(/images/cow/home-backgroundlight.png)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',}}
        >
            <StyledHero>
                <Heading as="h1" size="lg" color="secondary" mb="20px">
                    Blind Box CashCow
                </Heading>
            </StyledHero>
            {
                packState === 2&& <NftPack />
                // packState === 2&& <NftIndividual />
            }
            {/* <Link to='/blind-box/pack'><BlindBoxItem background='BANNER-FARM.png' itemTitle='Pack Sale'/></Link>
            <Link to='/blind-box/individual'><BlindBoxItem background='BANNER-FARM.png' itemTitle='Individual Sale'/></Link> */}
        </Page>
    )
}

export default BlindboxCow
