import React from 'react'
import styled from 'styled-components'


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
    font-size: 27px;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    `
const ValueContainer = styled.div`
    width: 100%;
    font-size: 24px;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    `
const ActionContainer = styled.div`
    margin-left: 16px;
    margin-right: 16px;
    font-size: 20px;
    font-weight: 1000;
    line-height: 1.5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top-style: solid;
    border-top: 2px solid #689330;
    cursor: pointer;
    `

const NftsCard = ({title, value}: CardInterface) => {
    return (
        <Container>    
            <TitleContainer>
                {title}
            </TitleContainer>
            <ValueContainer>
                {value}
            </ValueContainer>
            <ActionContainer>
                MORE INFO
            </ActionContainer>
        </Container>
    )
}

export default NftsCard
