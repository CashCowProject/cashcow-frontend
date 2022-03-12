import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Heading, Text, BaseLayout } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import FarmStakingCard from './components/FarmStakingCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'




const Hero = styled.div`
  align-items: center;
  background-image: url('/images/cow/1-home.png');
  background-repeat: no-repeat;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;  
  padding-top: 116px;
  text-align: center;
  height: 175px;
 

  ${({ theme }) => theme.mediaQueries.lg} {
    background-image: url('/images/cow/2milkgenerator.png'), url('/images/cow/2bottle.png'), url('/images/cow/2cowdrinkmilk.png');
    background-position: left center, center bottom, right center;
    height: 300px, 185px, 185px;  
    width:  300px, 185px, 185px;  
    padding-top: 0;
  }
`

const Cards = styled(BaseLayout)`
  align-items: stretch;
  justify-content: stretch;
  margin-bottom: 48px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }  
`
// const Bgimage = styled.div`
// // color:  {false} ? ${({ theme }) => theme.colors.background} : ${({ theme }) => theme.colors.borderColor};
// // background-image: url('/images/cow/home-backgroundlight.png')

// background-image: (true) ? url('/images/cow/home-backgroundlight.png') : url('/images/cow/3-home.png');

// `


// const tema = `${ ({theme })=> theme.isDark} `


let tema;

const Home: React.FC = () => {

  const {isDark}=useTheme();
  

  return (

    <Page
      style={{
        backgroundImage: isDark ? `url(/images/cow/home-backgrounddark.png)` : `url(/images/cow/home-backgroundlight.png)`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        
      }}
    >
      <Hero>
        <Heading as="h1" size="lg"   >
        CashCow Protocol
        </Heading>        
        <Text>Earn MILK By Simply Staking Your COW</Text>
      </Hero>
      <div>
        <Cards>
          <FarmStakingCard />
          <TwitterCard />
          <CakeStats />
          <TotalValueLockedCard />
        </Cards>
      </div>
    </Page>
  )
}

export default Home
