import React from 'react'
import { useParams } from 'react-router-dom'
import styled, { useTheme } from 'styled-components'
import Page from 'components/layout/Page'
import { Heading } from 'cashcow-uikit'
import NftData from './components/NftData'
import NftMarketRule from './components/NftMarketRule'
import NftDetailHeader from './components/NftDetailHeader'

type boxParam = {
    itemId: string;
};

const StyledHero = styled.div`
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 20px;
`

const NftDetailContainer = styled.div`
    margin-top: 32px;
`


const NftMarketDetail = () => {
    const { itemId } = useParams<boxParam>();
    const { isDark } = useTheme();

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
                    NFT MARKETPLACE
                </Heading>
            </StyledHero>
            <NftDetailHeader collectionName="HappyCow" />
            <NftDetailContainer>
                <NftData itemId={itemId} />
            </NftDetailContainer>
            <NftMarketRule />
        </Page>
    )
}

export default NftMarketDetail
