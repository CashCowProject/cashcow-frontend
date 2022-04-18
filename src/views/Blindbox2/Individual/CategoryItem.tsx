import React from 'react'
import styled from 'styled-components'


export interface CategoryItemInterface {
    background?: string;
}

const ItemBackgroundCover = styled.div`
    width: 100%;
    height: 250px;
    overflow: hidden;
    position: relative;
    border-radius: 32px;

`

const CategoryItem = ({background}: CategoryItemInterface) => {
    const ItemBackground = styled.div`
        width: 100%;
        height: 100%;
        background-image : url(/images/nftindividuals/${background});
        background-size: 100% 100%;
        background-position: 0;
        background-repeat: no-repeat;
        cursor: pointer;
        transition: all 1s;
        &:hover{
            transform: scale(1.02);
        }
        @media (max-width: 768px) {
            background-position: 30%;
        }
        `
    return (
        <ItemBackgroundCover>
            <ItemBackground />
        </ItemBackgroundCover>
    )
}

export default CategoryItem
