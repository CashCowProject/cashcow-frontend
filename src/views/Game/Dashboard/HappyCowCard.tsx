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

const HappyCowCard = ({title, value}: CardInterface) => {
    
    return (
        <Container>    
            <TitleContainer>
                {title}
            </TitleContainer>
            <ValueContainer>
                <img src="/images/svgs/holstein.svg" alt="" style={{width: "36px",  height: "36px", marginRight: '8px'}}/>
                <img src="/images/svgs/highland.svg" alt="" style={{width: "36px",  height: "36px", marginRight: '8px'}}/>
                <img src="/images/svgs/hereford.svg" alt="" style={{width: "36px",  height: "36px", marginRight: '8px'}}/>
                <img src="/images/svgs/brahman.svg" alt="" style={{width: "36px",  height: "36px", marginRight: '8px'}}/>
                <img src="/images/svgs/angus.svg" alt="" style={{width: "36px",  height: "36px", marginRight: '8px'}}/>
            </ValueContainer>
        </Container>
    )
}

export default HappyCowCard
