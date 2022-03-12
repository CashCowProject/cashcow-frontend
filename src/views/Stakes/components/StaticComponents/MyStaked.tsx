import React from 'react'
import { Flex, Image, Text } from 'cashcow-uikit'
import useI18n from 'hooks/useI18n'
import { getNumberSuffix } from 'utils/formatBalance';

export interface MyStakedInferface {
  myStakedCount?: any;
}

const MyStaked = ({ myStakedCount }: MyStakedInferface) => {
  const TranslateString = useI18n()
  return (
    <Flex flexDirection="column">
      <Text style={{textAlign: 'left'}}>{TranslateString(10009, 'My Staked')}</Text>
      <Flex mt="12px">
        {/* <Image src='/images/farms/milk.png' alt='MILK' width={32} height={32} /> */}
        <Text color="secondary" fontSize="24px" pr="3px" ml="6px">
          {getNumberSuffix(myStakedCount, 0)}
        </Text>
        {/* <Text textTransform="uppercase" color="textSubtle" fontSize="18px" style={{lineHeight: 2}}>
          {`≈ $${getNumberSuffix(494543, 2)}`}
        </Text> */}
      </Flex>
    </Flex>
  )
}

export default MyStaked