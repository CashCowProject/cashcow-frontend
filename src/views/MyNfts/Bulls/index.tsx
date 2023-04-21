import React from 'react'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { Heading } from 'cashcow-uikit'
import useTheme from 'hooks/useTheme'
import NftHeader from './components/NftHeader'
import NftItems from './components/NftItems'

const StyledHero = styled.div`
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 20px;
`
const NftList = () => {
  const { isDark } = useTheme()
  return (
    <Page
      style={{
        backgroundImage: isDark
          ? `url(/images/cow/home-backgrounddark.png)`
          : `url(/images/cow/home-backgroundlight.png)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <StyledHero>
        <Heading as="h1" size="lg" color="secondary" mb="20px">
          Bull NFTs
        </Heading>
      </StyledHero>
      <NftHeader />
      <NftItems />
    </Page>
  )
}

export default NftList
