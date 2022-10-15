import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'
import Page from 'components/layout/Page'
import { Heading } from 'cashcow-uikit'
import FlexLayout from 'components/layout/Flex'
import CategoryItem from './CategoryItem'
import './management.css'

const FarmManagement = () => {

  const history = useHistory();

  const StyledHero = styled.div`
    border-bottom: 0px solid #e8e8e8;
    margin-bottom: 20px;
    background-color: rgb(11,51,75);
    padding: 10px;
    height: 30%;
    display: flex;
    margin-left: 8px;
    margin-right: 8px;
    overflow: hidden;
    border-radius: 25px;
    align-items: center;
    @media (max-width: 768px) {
      height: 10%;
      width: 90%;
      min-width: 100px;
      justify-content: space-around;
    }
`

  const HomeButton = styled.div`
    margin-left: 20px;
    background-image: url(/images/farms/dashboard/buttons/botonmapgris.png);
    background-repeat: no-repeat;
    width: 80px;
    height: 70px;
    background-size: contain;
    cursor:pointer;
    &:hover {
      background-image: url(/images/farms/dashboard/buttons/botonmapverde.png);
    }
    // height: 30%;
    @media (max-width: 768px) {
      height: 60px;
      width: 70px;
      margin-left:5px;
      min-width: 10px;
    }
`

  const nftIndividualData = [
    {
      id: "cow",
      image: 'cows.png',
      title: 'Cows',
      url: '/management/cow',
      tab: 1
    },
    {
      id: "bull",
      image: 'bulls.png',
      title: 'Bulls',
      url: '/management/bull',
      tab: 2
    },
    {
      id: "land",
      image: 'lands.png',
      title: 'Lands',
      url: '/management/land',
      tab: 3
    }
  ]

  const { isDark } = useTheme();
  return (
    <Page
      style={{
        backgroundImage: isDark ? `url(/images/farm_background_dark.png)` : `url(/images/farm_background.png)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <StyledHero>
        <HomeButton onClick={e => history.push('/farm/map')} />
      </StyledHero>

      <FlexLayout>
        {nftIndividualData.map((item) =>
          <div className="cards-mapper">
            <img
              onClick={() => history.push(item.url)}
              className="cards-mapper-image" 
              src={`/images/nftindividuals/${item.image}`} 
            />
          </div>
        )}
      </FlexLayout>
    </Page>
  )
}

export default FarmManagement
