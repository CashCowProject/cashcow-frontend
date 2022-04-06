import React from 'react'
import styled, { useTheme } from 'styled-components'
import Page from 'components/layout/Page'
import { Heading } from 'cashcow-uikit'
import NftHeader from './components/NftHeader'
import NftItems from './components/NftItems'

const StyledHero = styled.div`
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 20px;
`
const NftMarket = () => {

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
            <NftHeader />
            <NftItems />
        </Page>
    )
}

export default NftMarket
