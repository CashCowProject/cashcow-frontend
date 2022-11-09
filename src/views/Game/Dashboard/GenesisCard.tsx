import React from 'react'
import styled from 'styled-components'

export interface CardInterface {
    title?: string;
    hasGenesisNft?: boolean;
}

const Container = styled.div`
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
    border-radius: 32px;
    background-color: rgb(11,51,75);
    color: white;
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
    @media (max-width: 768px) {
        font-size: 5vw;
    }
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

const GenesisCard = ({title, hasGenesisNft}: CardInterface) => {
    return (
        <Container>
            <TitleContainer>
                {title}
            </TitleContainer>
            <ValueContainer>
                {hasGenesisNft ? <img src="/images/svgs/check.svg" alt="" style={{width: "36px",  height: "36px", marginRight: '8px'}}/> : <img src="/images/svgs/none.svg" alt="" style={{width: "36px",  height: "36px", marginRight: '8px'}}/>}
            </ValueContainer>
        </Container>
    )
}

export default GenesisCard
