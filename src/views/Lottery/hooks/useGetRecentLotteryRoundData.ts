import { useContext, useEffect, useState } from 'react'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import getLotteryRoundData, { DataResponse } from 'utils/getLotteryRoundData'

type GetRecentLotteryRoundDataReturn = {
  isloading: boolean
  data: DataResponse
  mostRecentLotteryNumber: number
  error: any
}

const useGetRecentLotteryRoundData = (): GetRecentLotteryRoundDataReturn => {
  const [isloading, setisloading] = useState(true)
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const { mostRecentLotteryNumber } = useContext(PastLotteryDataContext)

  useEffect(() => {
    const fetchRecentLotteryData = async () => {
      try {
        setisloading(true)

        const roundData = await getLotteryRoundData(mostRecentLotteryNumber)
        setData(roundData)
      } catch (err) {
        setError(err)
      } finally {
        setisloading(false)
      }
    }

    if (mostRecentLotteryNumber > 0) {
      fetchRecentLotteryData()
    }
  }, [mostRecentLotteryNumber, setData, setisloading, setError])

  return { isloading, data, mostRecentLotteryNumber, error }
}

export default useGetRecentLotteryRoundData
