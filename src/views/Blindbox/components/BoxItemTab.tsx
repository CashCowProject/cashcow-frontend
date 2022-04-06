import React from 'react'
import {useRouteMatch, Link} from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Text, Toggle } from 'cashcow-uikit'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'

const BoxItemTabContainer = styled.div`
    padding: 48px 0 32px;
    text-align: center;
`

const BoxItemTabEach = styled.div`
    display: flex;
    align-items: center;
`

const BoxItemIcon = styled.span`
    margin-right: 5px;
    width: 28px;
    height: 28px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50%
`

const BoxItemTab = () => {
    const { url, isExact } = useRouteMatch()
    const TranslateString = useI18n()
    return (
        <BoxItemTabContainer>
            <ButtonMenu activeIndex={0} size="sm" variant="subtle">
                <ButtonMenuItem>
                    <BoxItemTabEach>
                        <BoxItemIcon style={{backgroundImage: 'url(../images/NFT/ItemIcons/pet.png)'}} />
                        PET
                    </BoxItemTabEach>
                </ButtonMenuItem>
                <ButtonMenuItem>
                    <BoxItemTabEach>
                        <BoxItemIcon style={{backgroundImage: 'url(../images/NFT/ItemIcons/wing.png)'}} />
                        WING
                    </BoxItemTabEach>
                </ButtonMenuItem>
                <ButtonMenuItem>
                    <BoxItemTabEach>
                        <BoxItemIcon style={{backgroundImage: 'url(../images/NFT/ItemIcons/fashion.png)'}} />
                        FASHION
                    </BoxItemTabEach>
                </ButtonMenuItem>
                <ButtonMenuItem>
                    <BoxItemTabEach>
                        <BoxItemIcon style={{backgroundImage: 'url(../images/NFT/ItemIcons/mount.png)'}} />
                        MOUNT
                    </BoxItemTabEach>
                </ButtonMenuItem>
            </ButtonMenu>
        </BoxItemTabContainer>
    )
}

export default BoxItemTab
