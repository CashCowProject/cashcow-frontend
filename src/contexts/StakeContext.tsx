import React, { useState, useEffect, useRef } from 'react'

const StakeContext = React.createContext({
  selectedNFTS: [], 
  myNFTS: [], 
  appendCandidate: (data) => undefined,
  initMyNFTS: (datas) => undefined
})

const StakeContextProvider = ({ children }) => {
  const [selectedNFTS, setSelectedNFTS] = useState([])
  const [myNFTS, setMyNFTS] = useState([])

  const appendCandidate = (data) => {
    setSelectedNFTS([...selectedNFTS, data])
  }

  const initMyNFTS = (datas) => {
    setMyNFTS([...datas])
  }

  return <StakeContext.Provider value={{selectedNFTS, myNFTS, appendCandidate, initMyNFTS}}>{children}</StakeContext.Provider>
}

export { StakeContext, StakeContextProvider }
