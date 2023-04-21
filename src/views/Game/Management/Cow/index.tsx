import { useState } from 'react'
import styled, { useTheme } from 'styled-components'
import Page from 'components/layout/Page'
import { Heading } from 'cashcow-uikit'
import '../management.css'
import NftHeader from './components/NftHeader'
import NftItems from './components/NftItems'

const StyledHero = styled.div`
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 20px;
`
const CowManage = () => {
  const { isDark } = useTheme()
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
        <Heading as="h1" size="lg" color={isDark ? 'white' : '#0b334b'} mb="20px">
          Management - Cows
        </Heading>
      </StyledHero>
      <NftHeader />
      <NftItems />
    </Page>
  )
}

export default CowManage
