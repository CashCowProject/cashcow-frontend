import React from 'react'
import { Flex, Text } from 'cashcow-uikit'
import useI18n from 'hooks/useI18n'
import { getNumberSuffix } from 'utils/formatBalance';

const MyRate = ({myMilkPower}) => {
  const TranslateString = useI18n()
  return (
    <Flex flexDirection="column">
      <Text style={{textAlign: 'left'}}>{TranslateString(10011, 'My MilkPower')}</Text>
      <Flex mt="12px">
        <Text color="secondary" fontSize="24px" pr="3px" ml="6px">
          {getNumberSuffix(myMilkPower, 0)}
        </Text>
      </Flex>
    </Flex>
  )
}

export default MyRate