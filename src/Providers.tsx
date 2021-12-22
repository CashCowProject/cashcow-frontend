import React from 'react'
import { ModalProvider } from '@pancakeswap-libs/uikit'
// import bsc, { UseWalletProvider } from '@binance-chain/bsc-use-wallet'
import * as bsc from '@binance-chain/bsc-use-wallet'
import { Provider } from 'react-redux'
import getRpcUrl from 'utils/getRpcUrl'
import { LanguageContextProvider } from 'contexts/Localisation/languageContext'
import { ThemeContextProvider } from 'contexts/ThemeContext'
import { BlockContextProvider } from 'contexts/BlockContext'
import { RefreshContextProvider } from 'contexts/RefreshContext'
import { LoadingContextProvider } from 'contexts/LoadingContext'
import store from 'state'

const Providers: React.FC = ({ children }) => {
  const rpcUrl = getRpcUrl();

  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <LanguageContextProvider>
          <bsc.UseWalletProvider
            chainId={Number(process.env.REACT_APP_CHAIN_ID)}
            connectors={{
              walletconnect: { rpcUrl },
              bsc,
            }}
          >
            <BlockContextProvider>
              <RefreshContextProvider>
                <LoadingContextProvider>
                  <ModalProvider>{children}</ModalProvider>
                </LoadingContextProvider>
              </RefreshContextProvider>
            </BlockContextProvider>
          </bsc.UseWalletProvider>
        </LanguageContextProvider>
      </ThemeContextProvider>
    </Provider>
  )
}

export default Providers
