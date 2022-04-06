import React from 'react'
import { Text } from 'cashcow-uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from 'hooks/useTickets'

const LotteryJackpot = () => {
  const lotteryPrizeAmount = useTotalRewards()

  return (
    <Text bold fontSize="24px">
      {getBalanceNumber(lotteryPrizeAmount).toLocaleString(undefined, {
        maximumFractionDigits: 2,
      })}
    </Text>
  )
}

export default LotteryJackpot
