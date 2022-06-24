import React, {useCallback, useEffect, useMemo, useState} from 'react'
import styled, { useTheme } from 'styled-components'
import { Link } from 'react-router-dom'
import { Heading } from 'cashcow-uikit'
import Page from 'components/layout/Page'
import BlindBoxItem from './components/BlindBoxItem'
import Web3 from "web3";
import { fromWei, toWei, AbiItem, toBN } from "web3-utils";
import NftSale from 'config/abi/NftSale.json'
import { getNftSaleAddress } from 'utils/addressHelpers'

const web3 = new Web3(Web3.givenProvider);

const boxData = [
    {
        id: 1,
        image: 'banner_tamano_desenfocado_2940x510.png',
        itemTitle: 'HappyCows Box'
    },
    {
        id: 2,
        image: 'BANNER-FARM.png',
        itemTitle: ''
    },
]

const StyledHero = styled.div`
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 20px;
`

const Blindbox = () => {

    const { isDark } = useTheme()
    const [packState, setPackState] = useState(2);
    const saleContract = useMemo(() =>{
        return new web3.eth.Contract(NftSale.abi as AbiItem[], getNftSaleAddress());
    },[]) 
    const fetchPackSaleState = useCallback(async () => {
        const endTime = await saleContract.methods.packSaleEnd().call()
        const startTIme = await saleContract.methods.packSaleStart().call()
        const currentTime = (await web3.eth.getBlock("latest")).timestamp;
        if(toBN(currentTime.toString()).lt( startTIme ) ) {
            setPackState(0);
        } else if(toBN(currentTime.toString()).gt( endTime ) ) {
            setPackState(2);
        } else {
            setPackState(1);
        }
    },[]);
    useEffect(() =>{
        fetchPackSaleState();
    },[])

    return (
        <Page
            style={{
                backgroundImage: isDark ? `url(/images/cow/home-backgrounddark.png)` : `url(/images/cow/home-backgroundlight.png)`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <StyledHero>
                <Heading as="h1" size="lg" color="text" mb="20px">
                    Blind Box
                </Heading>
            </StyledHero>
            <Link key={0} to={`/blind-box/1`}><BlindBoxItem background="banner_tamano_desenfocado_2940x510.png" itemId={0} itemTitle="HappyCows Box" /></Link>
            {
                packState == 1 && <Link key={2} to={`/blind-box/pack`}><BlindBoxItem background="BANNER-FARM.png" itemId={1} itemTitle="" /></Link>
            }
            {
                packState == 2 && <Link key={2} to={`/blind-box/individual`}><BlindBoxItem background="BANNER-FARM.png" itemId={0} itemTitle="" /></Link>
            }            

        </Page>
    )
}

export default Blindbox
