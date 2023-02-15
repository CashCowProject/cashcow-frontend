import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 50%;
    height: 150px;
    overflow: hidden;
    position: relative;
    border-radius: 32px;
    background-color: rgb(11,51,75);
    color: white;
    @media (max-width: 768px) {
        margin-top: 1em;
        margin-left: 5%;
        width: 90%;
    }
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
    @media (max-width: 768px) {
        font-size: 5vw;
    }
    `
const StatusContainer = styled.div`
    border-radius: 16px;
    padding-top: 4px;
    margin-left: 8px;
    `
const GenesisSection = () => {
    
    return (
        <Container>    
            <TitleContainer>
                Genesis NFT
            </TitleContainer>
            <ValueContainer>
                <StatusContainer>
                    <img src="/images/farms/management/check.svg" alt="" style={{width: "50px",  height: "50px"}}/>
                </StatusContainer>
            </ValueContainer>
        </Container>
    )
}

export default GenesisSection;
