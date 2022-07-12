import React from 'react'
import styled from 'styled-components'
import { getNumberSuffix } from 'utils/formatBalance'

export interface CardInterface {
    title?: string;
    value?: string;
}

const Container = styled.div`
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
    border-radius: 32px;
    background-color: white;
    `

const TitleContainer = styled.div`
    width: 100%;
    margin-top: 16px;
    margin-bottom: 16px;
    font-size: 1.6vw;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    `
const ValueContainer = styled.div`
    width: 100%;
    font-size: 1.6vw;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    `

const StaticCard = ({title, value}: CardInterface) => {
    
    return (
        <Container>    
            <TitleContainer>
                {title}
            </TitleContainer>
            <ValueContainer>
                {getNumberSuffix(value, 0)}
            </ValueContainer>
        </Container>
    )
}

export default StaticCard
