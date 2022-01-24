import React from 'react'
import { Flex, Image, Text, Tag } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'

const Harvet = () => {
  const TranslateString = useI18n()
  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between">
        <Text>MILK</Text>
        <Tag>{TranslateString(10007, 'Harvest')}</Tag>
      </Flex>
      <Flex mt="12px">
        <Image src='/images/farms/milk.png' alt='MILK' width={32} height={32} />
        <Text color="secondary" fontSize="24px" pr="3px" ml="6px">
          0
        </Text>
        <Text textTransform="uppercase" color="textSubtle" fontSize="18px" style={{lineHeight: 2}}>
          {`≈ $${0}`}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Harvet