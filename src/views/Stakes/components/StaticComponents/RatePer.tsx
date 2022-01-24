import React from 'react'
import { Flex, Image, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { getNumberSuffix } from 'utils/formatBalance';

const RatePer = () => {
  const TranslateString = useI18n()
  return (
    <Flex flexDirection="column">
      <Text style={{textAlign: 'left'}}>{TranslateString(10012, '1000 Mining HashRate/24H to get')}</Text>
      <Flex mt="12px">
        <Image src='/images/farms/milk.png' alt='MILK' width={32} height={32} />
        <Text color="secondary" fontSize="24px" pr="3px" ml="6px">
          {getNumberSuffix(1954, 0)}
        </Text>
        <Text textTransform="uppercase" color="textSubtle" fontSize="18px" style={{lineHeight: 2}}>
          {`≈ $${getNumberSuffix(98.265, 2)}`}
        </Text>
      </Flex>
    </Flex>
  )
}

export default RatePer