import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import Page from 'components/layout/Page'
import FlexLayout from 'components/layout/Flex'
import { Heading } from 'cashcow-uikit'
import useTheme from 'hooks/useTheme'
import CategoryItem from './CategoryItem'
import ViewNFT from 'views/Blindbox/components/ViewNft'

type boxParam = {
  index: string;
};

const nftIndividualData = [
  {
    id: "cow",
    image: 'cows.png',
    title: 'Cows',
    tab: 1
  },
  {
    id: "bull",
    image: 'bulls.png',
    title: 'Bulls',
    tab: 2
  },
  {
    id: "land",
    image: 'lands.png',
    title: 'Lands',
    tab: 3
  }
]

const NftIndividual = () => {
  const { index } = useParams<boxParam>();
  const { isDark } = useTheme();

  const StyledHero = styled.div`
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 20px;
  `

  const StyledWrapper = styled(Page)`
    position: relative;
  `
  return (
    <Page style={{
      backgroundImage: isDark ? `url(/images/farm_background_dark.png)` : `url(/images/farm_background.png)`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}
    >
      <StyledHero>
        <Heading as="h1" size="lg" color="secondary" mb="20px" style={{ color: isDark ? "white" : '' }}>
          Blind Box
        </Heading>
      </StyledHero>
      <Heading as="h1" size="no" color="primary" mb="20px" style={{ color: isDark ? "white" : '' }}>
        CashCow Farm
      </Heading>
      <FlexLayout>
        {
          nftIndividualData.map((item) => {
            return (
              <Link key={item.id} to={`/blind-box/${item.id}`}>
                <CategoryItem background={item.image} />
              </Link>
            )
          })
        }
      </FlexLayout>
    </Page>
  )
}

export default NftIndividual
