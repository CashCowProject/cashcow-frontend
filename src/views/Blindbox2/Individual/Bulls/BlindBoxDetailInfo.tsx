import React from 'react'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'

const BoxInfo = styled.div`
    border-radius: 16px;
    box-shadow: 0 6px 12px 0 rgb(0 0 0 / 6%), 0 -1px 2px 0 rgb(0 0 0 / 2%);
    padding: 16px;
    margin-top: 50px;
`
const BoxInfoContainer = styled.div`
    overflow: auto;
`
const BoxInfoRulesContainer = styled.div`
    font-size: 14px;
    font-weight: 700;
    color: #431216;
    display: flex;
    justify-content: space-between;
`
const BoxInfoMainContainer = styled.div`
    font-size: 13px;
    color: #694f4e;
    margin-top: 20px;
`

const BlindBoxDetailInfo = () => {
    const { isDark } = useTheme()

    return (
        <BoxInfo style={{background: isDark ? 'rgb (11, 51, 75)' : 'rgb (11, 51, 75)', boxShadow: isDark ? "0 6px 12px 0 rgb(255 255 255 / 6%), 0 -1px 2px 0 rgb(255 255 255 / 2%)" : ''}}>
            <BoxInfoContainer>
                <BoxInfoRulesContainer style={{color: isDark ? 'white' : 'white'}}>
                    Blind Box Rules
                </BoxInfoRulesContainer>
                <BoxInfoMainContainer style={{color: isDark ? 'white' : 'white'}}>
                    <p style={{lineHeight: 1.2, margin: "7px 0"}}>
                        Lands will be an essential requirement for playing the game.
                    </p>
                    <p style={{lineHeight: 1.2, margin: "7px 0"}}>
                        There will be no free lands, and all farmers will need their own land in order to breed and produce $MILK.
                    </p>
                </BoxInfoMainContainer>
            </BoxInfoContainer>
        </BoxInfo>
    )
}

export default BlindBoxDetailInfo
