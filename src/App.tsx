import React, { useEffect, Suspense, lazy, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ResetCSS } from 'cashcow-uikit'
import BigNumber from 'bignumber.js'
import { useFetchPublicData } from 'state/hooks'
import { LoadingContext } from 'contexts/LoadingContext'
import BackLoader from 'components/BackLoader'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import PageLoader from './components/PageLoader'

// import NftGlobalNotification from './views/Nft/components/NftGlobalNotification'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page'
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Stakes = lazy(() => import('./views/Stakes'))
// const Lottery = lazy(() => import('./views/Lottery'))
const Pools = lazy(() => import('./views/Pools'))
// const Ifos = lazy(() => import('./views/Ifos'))
const NotFound = lazy(() => import('./views/NotFound'))
const Blindbox = lazy(() => import('./views/Blindbox2'))
const BlindboxPack = lazy(() => import('./views/Blindbox2/NftPack'))
const BlindboxPackCommon = lazy(() => import('./views/Blindbox2/NftPack/Common'))
const BlindboxPackUncommon = lazy(() => import('./views/Blindbox2/NftPack/Uncommon'))
const BlindboxPackRare = lazy(() => import('./views/Blindbox2/NftPack/Rare'))
const BlindboxIndividual = lazy(() => import('./views/Blindbox2/Individual'))
const BlindboxIndividualLand = lazy(() => import('./views/Blindbox2/Individual/Lands'))
const BlindboxIndividualCow = lazy(() => import('./views/Blindbox2/Individual/Cows'))
const BlindboxIndividualBull = lazy(() => import('./views/Blindbox2/Individual/Bulls'))
const Lands = lazy(() => import('./views/MyNfts/Lands'))
const LandDetail = lazy(() => import('./views/MyNfts/Lands/NftDetail'))
const Cows = lazy(() => import('./views/MyNfts/Cows'))
const CowDetail = lazy(() => import('./views/MyNfts/Cows/NftDetail'))
const Bulls = lazy(() => import('./views/MyNfts/Bulls'))
const BullDetail = lazy(() => import('./views/MyNfts/Bulls/NftDetail'))
const BlindboxDetail = lazy(() => import('./views/Blindbox/BlindboxDetail'))
const NftMarket = lazy(() => import('./views/NftMarket'))
const NftMarketDetail = lazy(() => import('./views/NftMarket/NftMarketDetail'))
const MyNfts = lazy(() => import('./views/MyNfts'))
const MyNftsDetail = lazy(() => import('./views/MyNfts/MyNftsDeatail'))
// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  const { account, connect } = useWallet()
  useEffect(() => {
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }

  }, [account, connect]);

  const { loading } = useContext(LoadingContext);

  useFetchPublicData()

  return (
    <Router>
      <ResetCSS />
      <GlobalStyle />
      {loading &&
        <BackLoader/>
      }
      <Toaster 
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 5000,
        }}
      />
      <Menu>
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/stakes/:index">
              <Stakes />
            </Route>
            <Route path="/milkbar">
              <Farms tokenMode />
            </Route>
            <Route path="/pools">
              <Pools />
            </Route>
            <Route exact path="/blind-box">
              <Blindbox />
            </Route>
            <Route path="/blind-box/common-pack">
              <BlindboxPackCommon />
            </Route>
            <Route path="/blind-box/uncommon-pack">
              <BlindboxPackUncommon />
            </Route>
            <Route path="/blind-box/rare-pack">
              <BlindboxPackRare />
            </Route>
            <Route path="/blind-box/pack">
              <BlindboxPack />
            </Route>
            <Route path="/blind-box/land">
              <BlindboxIndividualLand />
            </Route>
            <Route path="/blind-box/cow">
              <BlindboxIndividualCow />
            </Route>
            <Route path="/blind-box/bull">
              <BlindboxIndividualBull />
            </Route>
            <Route path="/blind-box/individual">
              <BlindboxIndividual />
            </Route>
            {/* <Route path="/blind-box/:index">
              <BlindboxDetail />
            </Route> */}
            <Route exact path="/lands/:tokenId">
              <LandDetail />
            </Route>
            <Route exact path="/lands">
              <Lands />
            </Route>
            <Route exact path="/cows/:tokenId">
              <CowDetail />
            </Route>
            <Route exact path="/cows">
              <Cows />
            </Route>
            <Route exact path="/bulls/:tokenId">
              <BullDetail />
            </Route>
            <Route exact path="/bulls">
              <Bulls />
            </Route>
            <Route exact path="/nft-market">
              <NftMarket />
            </Route>
            <Route path="/nft-market/:itemId">
              <NftMarketDetail />
            </Route>
            <Route exact path="/MyNfts">
              <MyNfts />
            </Route>
            <Route path="/MyNfts/:myTokenId">
              <MyNftsDetail />
            </Route>
            {/* <Route path="/ifo"> */}
            {/*  <Ifos /> */}
            {/* </Route> */}
            {/* <Route path="/nft"> */}
            {/*  <Nft /> */}
            {/* </Route> */}
            {/* Redirect */}
            {/* <Route path="/staking"> */}
            {/*  <Redirect to="/pools" /> */}
            {/* </Route> */}
            {/* <Route path="/syrup"> */}
            {/*  <Redirect to="/pools" /> */}
            {/* </Route> */}
            {/* 404 */}
            <Route component={NotFound} />
            
          </Switch>
        </Suspense>
      </Menu>
    </Router>
  )
}

export default React.memo(App)
