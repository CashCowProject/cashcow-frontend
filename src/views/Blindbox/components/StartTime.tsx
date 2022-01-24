import React from 'react'
import styled from 'styled-components'

const StartTimeContainer = styled.div`
    margin-top: 20px;
    
`

const StartTimeTitle = styled.div`
    font-size: 14px;
    color: hsla(0,0%,100%,.8);
`
const StartTimeItems = styled.div`
    display: flex;
    align-items: center;
    margin-top: 8px;
`

const StartTimeItem = styled.div`
    display: flex;
    align-items: center;
`

const Num = styled.div`
    box-sizing: border-box;
    padding: 0 6px;
    min-width: 40px;
    font-size: 18px;
    font-weight: 700;
    height: 40px;
    background: rgba(0,0,0,.5);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Sep = styled.div`
    margin: 0 8px;
    font-size: 18px;
    font-weight: 700;
`

export interface StartTimeInterface {
    delayDay?: string;
    delayHour?: string;
    delayMinute?: string;
    delaySecond?: string;
}

const StartTime = ({delayDay, delayHour, delayMinute, delaySecond}:StartTimeInterface) => {
    return (
        <StartTimeContainer>
            <StartTimeTitle>
                Start Time
            </StartTimeTitle>
            <StartTimeItems>
                <StartTimeItem>
                    <Num>
                        {delayDay}
                    </Num>
                </StartTimeItem>
                <StartTimeItem>
                    <Sep>
                        :
                    </Sep>
                    <Num>
                        {delayHour}
                    </Num>
                </StartTimeItem>
                <StartTimeItem>
                    <Sep>
                        :
                    </Sep>
                    <Num>
                        {delayMinute}
                    </Num>
                </StartTimeItem>
                <StartTimeItem>
                    <Sep>
                        :
                    </Sep>
                    <Num>
                        {delaySecond}
                    </Num>
                </StartTimeItem>
                
            </StartTimeItems>
        </StartTimeContainer>
    )
}

export default StartTime
