import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Link } from 'react-router-dom'
import { Heading } from 'cashcow-uikit'
import Page from 'components/layout/Page'
import BlindBoxItem from './components/BlindBoxItem'

const boxData = [
    {
        id: 0,
        image: 'banner_tamano_desenfocado_2940x510.png',
        itemTitle: 'HappyCows Box'
    },
]

const StyledHero = styled.div`
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 20px;
`

const Blindbox = () => {

    const { isDark } = useTheme()

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
            {
                boxData.map((boxItem) => {
                    return <Link key={boxItem.id} to={`/blind-box/${boxItem.id}`}><BlindBoxItem background={boxItem.image} itemId={boxItem.id} itemTitle={boxItem.itemTitle} /></Link>
                })
            }
        </Page>
    )
}

export default Blindbox
