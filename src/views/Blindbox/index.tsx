import React from 'react'
import styled from 'styled-components'
import { Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import BlindBoxItem from './components/BlindBoxItem'

const StyledHero = styled.div`
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 20px;
`

const boxData = [
    {
        id: 1,
        image: 'Image1.jpg',
        delayDay: '00',
        delayHour: '00',
        delayMinute: '00',
        delaySecond: '00',
        itemTitle: 'Fate/Origin BOX'
    },
    {
        id: 2,
        image: 'Image2.jpg',
        delayDay: '00',
        delayHour: '00',
        delayMinute: '00',
        delaySecond: '00',
        itemTitle: 'Fate/Origin BOX'
    },
    {
        id: 3,
        image: 'Image3.jpg',
        delayDay: '00',
        delayHour: '00',
        delayMinute: '00',
        delaySecond: '00',
        itemTitle: 'Fate/Origin BOX'
    },
    {
        id: 4,
        image: 'Image4.jpg',
        delayDay: '00',
        delayHour: '00',
        delayMinute: '00',
        delaySecond: '00',
        itemTitle: 'Fate/Origin BOX'
    },
    {
        id: 5,
        image: 'Image5.jpg',
        delayDay: '00',
        delayHour: '00',
        delayMinute: '00',
        delaySecond: '00',
        itemTitle: 'Fate/Origin BOX'
    },
]
const Blindbox = () => {
  const TranslateString = useI18n()

  return (
    <Page>
        <StyledHero>
            <Heading as="h1" size="lg" color="secondary" mb="20px">
            Blind Box
            </Heading>
        </StyledHero>
        {
            boxData.map((boxItem) => {
                return <BlindBoxItem background={boxItem.image} itemId={boxItem.id} delayDay={boxItem.delayDay} delayHour={boxItem.delayHour} delayMinute={boxItem.delayMinute} delaySecond={boxItem.delaySecond} itemTitle={boxItem.itemTitle}/>
            })
        }
    </Page>
  )
}

export default Blindbox
