import React from 'react'
import { Flex, Image, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { usePriceCakeBusd } from 'state/hooks'
import { getNumberSuffix } from 'utils/formatBalance';

const RatePer = ({dailyMilkRate}) => {
  const cakePriceUsd = usePriceCakeBusd()

  console.log("Daily Milk Rate: ", dailyMilkRate);
  const TranslateString = useI18n()
  return (
    <Flex flexDirection="column">
      <Text style={{textAlign: 'left'}}>{TranslateString(10012, 'Daily Milk / 100 MilkPower')}</Text>
      <Flex mt="12px">
        <Image src='/images/farms/milk.png' alt='MILK' width={32} height={32} />
        <Text color="secondary" fontSize="24px" pr="3px" ml="6px">
          {getNumberSuffix(dailyMilkRate / 1000000, 0)}
        </Text>
        <Text textTransform="uppercase" color="textSubtle" fontSize="18px" style={{lineHeight: 2}}>
          {`≈ $${getNumberSuffix(cakePriceUsd.toNumber() * dailyMilkRate / 1000000 , 2)}`}
        </Text>
      </Flex>
    </Flex>
  )
}

export default RatePer