import React from 'react'
import styled from 'styled-components'


export interface CardInterface {
    title?: string;
    value?: boolean[];
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
    @media (max-width: 768px) {
        font-size: 5vw;
    }
    `
const StatusContainer = styled.div`
    background-color: #689330;
    border-radius: 16px;
    padding-top: 4px;
    margin-left: 8px;
    `
const HappyCowCard = ({title, value}: CardInterface) => {
    
    return (
        <Container>    
            <TitleContainer>
                {title}
            </TitleContainer>
            <ValueContainer>
                <StatusContainer style={{background: value[0] ? '#689330' : 'gray'}}>
                    <img src="/images/svgs/holstein.svg" alt="" style={{width: "36px",  height: "36px"}}/>
                </StatusContainer>
                <StatusContainer style={{background: value[1] ? '#689330' : 'gray'}}>
                    <img src="/images/svgs/highland.svg" alt="" style={{width: "36px",  height: "36px"}}/>
                </StatusContainer>
                <StatusContainer style={{background: value[2] ? '#689330' : 'gray'}}>
                    <img src="/images/svgs/hereford.svg" alt="" style={{width: "36px",  height: "36px"}}/>
                </StatusContainer>
                <StatusContainer style={{background: value[3] ? '#689330' : 'gray'}}>
                    <img src="/images/svgs/brahman.svg" alt="" style={{width: "36px",  height: "36px"}}/>
                </StatusContainer>
                <StatusContainer style={{background: value[4] ? '#689330' : 'gray'}}>
                    <img src="/images/svgs/angus.svg" alt="" style={{width: "36px",  height: "36px"}}/>
                </StatusContainer>
            </ValueContainer>
        </Container>
    )
}

export default HappyCowCard
