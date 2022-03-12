import React from 'react'
import { Flex, Image, Text } from 'cashcow-uikit'
import useI18n from 'hooks/useI18n'
import { getNumberSuffix } from 'utils/formatBalance';

export interface TotalStackedInferface {
  totalStakedCount?: any;
}

const TotalStaked = ({ totalStakedCount }: TotalStackedInferface) => {
  const TranslateString = useI18n()
  return (
    <Flex flexDirection="column" justifyContent="flex-start">
      <Text style={{textAlign: 'left'}}>{TranslateString(10008, 'Total Staked')}</Text>
      <Flex mt="12px">
        {/* <Image src='/images/farms/milk.png' alt='MILK' width={32} height={32} /> */}
        <Text color="secondary" fontSize="24px" pr="3px" ml="6px">
          {getNumberSuffix(totalStakedCount, 0)}
        </Text>
        {/* <Text textTransform="uppercase" color="textSubtle" fontSize="18px" style={{lineHeight: 2}}>
          {`≈ $${getNumberSuffix(8045043, 2)}`}
        </Text> */}
      </Flex>
    </Flex>
  )
}

export default TotalStaked