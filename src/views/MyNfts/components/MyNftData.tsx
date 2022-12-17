import React from 'react'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import MyNftDataLeftComponent from './MyNftDataLeftComponent'
import MyNftDataRightComponent from './MyNftDataRightComponent'
import MyNftDataCenterComponent from './MyNftDataCenterComponent'

const NftDataContainer = styled.div`
    position: relative;
    display: flex;
    background: #fff;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 3%), 0 4px 6px -2px rgb(0 0 0 / 1%);
    border-radius: 32px;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`

export interface NftDataInterface {
    myToken?: any;
}

const MyNftData = ({ myToken }: NftDataInterface) => {
    const { isDark } = useTheme()
    return (
        <NftDataContainer
            style={{ background: isDark ? "#0B3D4C" : '#0B3D4C' }}
        >
            {/* <GradientBack /> */}
            {/* NFT Image */}
            <MyNftDataLeftComponent
                myToken={myToken}
            />
            {/* <NftDataSeperation /> */}
            {/* NFT Data and actions */}
            <MyNftDataCenterComponent
                myToken={myToken}
            />
            {/* <NftDataSeperation /> */}
            {/* NFT Propertries */}
            <MyNftDataRightComponent
                myToken={myToken}
            />
        </NftDataContainer>
    )
}

export default MyNftData
