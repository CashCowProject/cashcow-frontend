import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Link } from 'react-router-dom'
import { Heading } from 'cashcow-uikit'
import Page from 'components/layout/Page'
import BlindBoxItem from './BlindBoxItem'

const boxData = [
    {
        id: 0,
        image: 'banner_tamano_desenfocado_2940x510.png',
        itemTitle: 'HappyCows Box'
    }
]

const StyledHero = styled.div`
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 20px;
`

const Blindbox = () => {
    const { isDark } = useTheme()
    return (
        <Page style={{
            backgroundImage: isDark ? `url(/images/cow/home-backgrounddark.png)` : `url(/images/cow/home-backgroundlight.png)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',}}
        >
            <StyledHero>
                <Heading as="h1" size="lg" color="secondary" mb="20px">
                    Blind Box
                </Heading>
            </StyledHero>
            <Link to='/blind-box/pack'><BlindBoxItem background='banner-farm.png' itemTitle='Pack Sale'/></Link>
            <Link to='/blind-box/individual'><BlindBoxItem background='banner-farm.png' itemTitle='Individual Sale'/></Link>
        </Page>
    )
}

export default Blindbox
