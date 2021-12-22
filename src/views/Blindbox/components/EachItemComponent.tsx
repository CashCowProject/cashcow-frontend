import React from 'react'
import styled from 'styled-components'

const ItemEachContainer = styled.div`
    margin: 10px;
    background: #fff;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 3%), 0 4px 6px -2px rgb(0 0 0 / 1%);
    border-radius: 24px;
    padding: 16px;
    width: calc(33.33333% - 20px);
    min-width: 290px;
    box-sizing: border-box;
    display: flex;
    transition: transform .3s ease,-webkit-transform .3s ease;
`
const ItemImage = styled.div`
    width: 40%;
    margin-right: 15px;
`

const ItemImageContainer = styled.div`
    position: relative;
    background-color: #f5f5f5;
    overflow: hidden;
    padding-bottom: 100%;
    height: 0;
    border-radius: 16px;
`

const ItemImageBack = styled.div`
    background-size: 600%;
    filter: blur(30px);
    background-position: 40% 50%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
`

const ItemImageBody = styled.div`
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: 50%;
`

const ItemDetail = styled.div`
    width: calc(60% - 15px);
    display: flex;
    flex-direction: column;
`

const ItemTitle = styled.div`
    flex: 1;
    font-size: 20px;
    font-weight: 700;
    color: #431216;
    line-height: 1.1;
    padding-top: 6px;
    word-break: break-word;
`
const ItemIcon = styled.img`
    cursor: wait;
    height: 23px;
    margin-top: 0;
    margin-right: 6px;
`

const ItemDetailInfo = styled.div`
    font-size: 14px;
`

const ItemInfoTitle = styled.div`
    margin: 6px 0;
    color: #694f4e;
`
const ItemInfo = styled.span`
    color: #431216;
    font-weight: 700;
    margin-left: 6px;
`
const EachItemComponent = () => {
    return (
        <ItemEachContainer>
            <ItemImage>
                <ItemImageContainer>
                    <ItemImageBack style={{backgroundImage: 'url(../images/NFT/Items/1.png)'}}/>
                    <ItemImageBody style={{backgroundImage: 'url(../images/NFT/Items/1.png)'}}/>
                </ItemImageContainer>
            </ItemImage>
            <ItemDetail>
                <ItemTitle>
                    <ItemIcon src='../images/NFT/ItemIcons/1.png'/>
                    God · Behemoth
                </ItemTitle>
                <ItemDetailInfo>
                    <ItemInfoTitle>
                        Probability:
                        <ItemInfo>3.4%</ItemInfo>
                    </ItemInfoTitle>
                    <ItemInfoTitle>
                        Supply:
                        <ItemInfo>250</ItemInfo>
                    </ItemInfoTitle>
                    <ItemInfoTitle style={{paddingBottom: "20px"}}>
                        HashRate:
                        <ItemInfo style={{color: '#f15f61'}}>x1000</ItemInfo>
                    </ItemInfoTitle>
                </ItemDetailInfo>
            </ItemDetail>
        </ItemEachContainer>
    )
}

export default EachItemComponent
