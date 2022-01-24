import React from 'react'
import styled from 'styled-components'
import ItemMainContainer from './ItemMainContainer'


export interface BlindBoxItemInterface {
    itemId?: number;
    background?: string;
    delayDay?: string;
    delayHour?: string;
    delayMinute?: string;
    delaySecond?: string;
    itemTitle?: string;
}

const ItemBackgroundCover = styled.div`
    width: 100%;
    height: 250px;
    overflow: hidden;
    position: relative;
    margin-bottom: 25px;
    margin-top: 25px;
    border-radius: 32px;

`

const BlindBoxItem = ({itemId, background, delayDay, delayHour, delayMinute, delaySecond, itemTitle}: BlindBoxItemInterface) => {
    const ItemBackground = styled.div`
        width: 100%;
        height: 100%;
        background-image : url(images/NFT/${background});
        background-size: cover;
        background-position: 0;
        background-repeat: no-repeat;
        cursor: pointer;
        transition: all 1s;
        &:hover{
            transform: scale(1.02);
        }
        `
    return (
        <ItemBackgroundCover>
            <ItemBackground>
                <ItemMainContainer itemId={itemId} delayDay={delayDay} delayHour={delayHour} delayMinute={delayMinute} delaySecond={delaySecond} itemTitle={itemTitle}/>                
            </ItemBackground>
        </ItemBackgroundCover>
    )
}



export default BlindBoxItem
