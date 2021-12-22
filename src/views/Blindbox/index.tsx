import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Heading } from '@pancakeswap-libs/uikit'
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

    return (
        <Page>
            <StyledHero>
                <Heading as="h1" size="lg" color="secondary" mb="20px">
                    Blind Box
                </Heading>
            </StyledHero>
            {
                boxData.map((boxItem) => {
                    return <Link key={boxItem.id} to={`/blind-box/${boxItem.id}`}><BlindBoxItem background={boxItem.image} itemId={boxItem.id} itemTitle={boxItem.itemTitle}/></Link>
                })
            }
        </Page>
    )
}

export default Blindbox
