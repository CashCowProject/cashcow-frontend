import React from 'react'
import { Flex, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { getNumberSuffix } from 'utils/formatBalance';

const TotalRate = () => {
  const TranslateString = useI18n()
  return (
    <Flex flexDirection="column">
      <Text style={{textAlign: 'left'}}>{TranslateString(10010, 'Total Mining HashRate')}</Text>
      <Flex mt="12px">
        <Text color="secondary" fontSize="24px" pr="3px" ml="6px">
          {getNumberSuffix(35342423, 0)}
        </Text>
      </Flex>
    </Flex>
  )
}

export default TotalRate