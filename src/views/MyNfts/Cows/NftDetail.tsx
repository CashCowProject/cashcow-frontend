import React from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import Page from 'components/layout/Page'
import { Heading } from 'cashcow-uikit'
import useTheme from 'hooks/useTheme'
import NftMetadataComponent from './components/NftMetadataComponent'
import NftDetailHeader from './components/NftDetailHeader'

type boxParam = {
  tokenId: string
}

const StyledHero = styled.div`
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 20px;
`

const NftDetailContainer = styled.div`
  margin-top: 32px;
`

const NftDetail = () => {
  const { tokenId } = useParams<boxParam>()
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
          NFT Details
        </Heading>
      </StyledHero>
      <NftDetailHeader collectionName="Cow" />
      <NftDetailContainer>
        <NftMetadataComponent tokenId={tokenId} />
      </NftDetailContainer>
    </Page>
  )
}

export default NftDetail
