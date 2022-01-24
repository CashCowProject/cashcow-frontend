import React from 'react'
import styled from 'styled-components'
import { Flex,  BaseLayout } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useTheme from 'hooks/useTheme'
import { Harvest, TotalStaked, MyStacked, TotalRate, MyRate, RatePer } from './StaticComponents'

const StaticInfoCard = styled(BaseLayout)`
  ${({ theme }) => theme.mediaQueries.xs} {
    grid-template-columns: repeat(1, 1fr);
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
  width: 100%;
`

const StatisticsInfo = () => {
  const TranslateString = useI18n()
  const { isDark } = useTheme()

  const BoxShadow = styled.div`
    background: ${!isDark ? 'white' : '#27262c'};
    box-shadow: 0px 2px 12px -8px ${!isDark ? 'rgba(25, 19, 38, 0.7)' : 'rgba(203, 203, 203, 0.7)'}, 0px 1px 1px ${!isDark ? 'rgba(25, 19, 38, 0.05)' : 'rgba(203, 203, 203, 0.05)'};
    position: relative;
    width: 100%;
  `
  const InfoWrapper = styled.div `
    box-shadow: 0px 2px 12px -8px ${!isDark ? 'rgba(25, 19, 38, 0.7)' : 'rgba(203, 203, 203, 0.7)'}, 0px 1px 1px ${!isDark ? 'rgba(25, 19, 38, 0.05)' : 'rgba(203, 203, 203, 0.05)'};
    width: 100%;
    border-radius: 16px;
    padding: 24px;
  `

  return (
    <BoxShadow style={{borderRadius: '32px', padding: '24px'}}>
      <Flex flexDirection="column" alignItems="cneter">
        <BoxShadow style={{borderRadius: '16px', padding: '24px'}}>
          {TranslateString(10006, 'NFT Staking Pool')}
        </BoxShadow>
        <StaticInfoCard style={{marginTop: "25px"}}>
          <InfoWrapper>
            <Harvest />
          </InfoWrapper>
          <InfoWrapper>
            <TotalStaked />
          </InfoWrapper>
          <InfoWrapper>
            <MyStacked />
          </InfoWrapper>
          <InfoWrapper>
            <TotalRate />
          </InfoWrapper>
          <InfoWrapper>
            <MyRate />
          </InfoWrapper>
          <InfoWrapper>
            <RatePer />
          </InfoWrapper>
        </StaticInfoCard>
      </Flex>
    </BoxShadow>
  )
}

export default StatisticsInfo