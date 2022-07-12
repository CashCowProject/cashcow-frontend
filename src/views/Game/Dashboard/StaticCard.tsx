import React from 'react'
import styled from 'styled-components'
import { getNumberSuffix } from 'utils/formatBalance'

export interface CardInterface {
    title?: string;
    value?: string;
    image?: string;
}

const Container = styled.div`
    width: 100%;
    height: 150px;
    overflow: hidden;
    position: relative;
    border-radius: 32px;
    background-color: rgb(11,51,75);
    color: white;
    display: flex;
`
const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 50%;
`
const ImageContainer = styled.div`
    display: flex;
    padding: 20px;
    flex: 50%;
`
const TitleContainer = styled.div`
    width: 100%;
    margin-top: 16px;
    margin-bottom: 10px;
    font-size: 1.5vw;
    font-weight: 500;
    line-height: 1.2;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        font-size: 5vw;
    }
      
`
const ValueContainer = styled.div`
    width: 100%;
    font-size: 1.5vw;
    font-weight: 5000;
    line-height: 1.2;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
        font-size: 5vw;
    }
`

const StaticCard = ({title, value, image}: CardInterface) => {
    
    return (
        <Container>    
            <ImageContainer>
                <img src={image} 
                    alt = "mymilkpower"
                ></img>
            </ImageContainer>
            <ContentContainer>
                <TitleContainer>
                    {title}
                </TitleContainer>
                <ValueContainer>
                    {getNumberSuffix(value, 0)}
                </ValueContainer>
            </ContentContainer>
        </Container>
    )
}

export default StaticCard
