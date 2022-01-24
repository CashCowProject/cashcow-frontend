import React from 'react'
import styled from 'styled-components'
import StartTime from './StartTime'

const MainContainer = styled.div`
   right: 60px;
   left: 60px;
   top: 40px;
   bottom: 40px;
   color: white;
   position: absolute;
`
const PhaseContainer = styled.div`
    background: rgba(0,0,0,.12);
    height: 30px;
    font-size: 18px;
    width: fit-content;
    border-radius: 10px;
    padding: 0 12px;
    align-items: center;
    justify-content:center;
    display:flex;
`
const TitleContainer = styled.div`
    font-size: 32px;
    font-weight: 700;
    margin-top: 12px;
    line-height: 1.25;
    display: flex;
    align-items: center;
`

export interface ItemMainContainerInterface {
    itemId?: number;
    delayDay?: string;
    delayHour?: string;
    delayMinute?: string;
    delaySecond?: string;
    itemTitle?: string;
}

const ItemMainContainer = ({itemId, delayDay, delayHour, delayMinute, delaySecond, itemTitle}: ItemMainContainerInterface) => {
    return (
        <MainContainer>
            <PhaseContainer>
                Phase {itemId}
            </PhaseContainer>
            <TitleContainer>
                {itemTitle}
            </TitleContainer>
            <StartTime delayDay={delayDay} delayHour={delayHour} delayMinute={delayMinute} delaySecond={delaySecond}/>
        </MainContainer>
    )
}

export default ItemMainContainer
