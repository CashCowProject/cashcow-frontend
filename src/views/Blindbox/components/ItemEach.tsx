import React from 'react'
import styled from 'styled-components'
import EachItemComponent from './EachItemComponent'

const ItemContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`


const ItemEach = () => {
    return (
        <ItemContainer>
            <EachItemComponent />
            <EachItemComponent />
            <EachItemComponent />
            <EachItemComponent />
            <EachItemComponent />
            <EachItemComponent />
            <EachItemComponent />
            <EachItemComponent />
            <EachItemComponent />
            <EachItemComponent />
        </ItemContainer>
    )
}

export default ItemEach
