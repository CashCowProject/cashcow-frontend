import _ from 'lodash';
import React, { useContext, useState, useCallback, useMemo, useEffect } from 'react'
import styled from 'styled-components'
import { LoadingContext } from 'contexts/LoadingContext'
import { StakeContext } from 'contexts/StakeContext'
import { Heading } from 'cashcow-uikit'
import useTheme from 'hooks/useTheme'
import useI18n from 'hooks/useI18n'
import Modal from 'react-modal';
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Web3 from "web3";
import HappyCows from 'config/abi/HappyCows.json'
import NftFarmingV2 from 'config/abi/NftFarmingV2.json'
import { getNftFarmingAddress, getHappyCowAddress, getAirNftAddress } from 'utils/addressHelpers'
import { fromWei, AbiItem } from "web3-utils";
import { TailSpin } from 'react-loader-spinner'
import toast from 'react-hot-toast';
import './happycowcards.css'

const web3 = new Web3(Web3.givenProvider);

const NftImage = styled.div`
  transition: transform 0.3s ease, -webkit-transform 0.3s ease;
  transform-origin: center;
  background-size: auto 100%;
  background-position: 50%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  &:hover {
    transform: scale(1.04);
  }
`
const SelectNFT = ({ isOpen, closeDialog, fetchOriginalUserHappyCows, happyCowStakedBreeds }) => {
  const TranslateString = useI18n()
  const { isDark } = useTheme()
  const { account } = useWallet()
  const [userHappyCows, setUserHappyCows] = useState([]);

  const [isAdding, setIsAdding] = useState(true);

  const { setLoading } = useContext(LoadingContext);

  // const [loading, setLoading] = useState(true);

  const BoxShadow = styled.div`
    background: ${!isDark ? 'white' : '#27262c'};
    box-shadow: 0px 2px 12px -8px ${!isDark ? 'rgba(25, 19, 38, 0.7)' : 'rgba(203, 203, 203, 0.7)'}, 0px 1px 1px ${!isDark ? 'rgba(25, 19, 38, 0.05)' : 'rgba(203, 203, 203, 0.05)'};
    position: relative;
    width: 100%;
  `

  useEffect(() => {
    fetchUserHappyCows()
  }, [isOpen])

  const temporalHappyCowsContract = '0xD220d3E1bab3A30f170E81b3587fa382BB4A6263';
  const temporalFarmingContract = '0x7335A5c716E512FdD13667f04118B162e80345A9';
  
  const temporalFullTokenUriPrefix = "https://cashcowprotocol.mypinata.cloud/ipfs/QmQNivyb2MZzxw1iJ2zUKMiLd4grG5KnzDkd8f5Be7R5hB"
  const happyCowsContract = new web3.eth.Contract(HappyCows.abi as AbiItem[], getHappyCowAddress());
  const farmingContract = new web3.eth.Contract(NftFarmingV2.abi as AbiItem[], getNftFarmingAddress());

  const fetchUserHappyCows = async () => {
    setUserHappyCows([]);
    // setLoading(true);
    setIsAdding(true);
    try {
      if (account) {
        console.log(happyCowsContract)
        const userHappyCows = await happyCowsContract.methods.fetchMyNfts().call({ from: account });
        userHappyCows.forEach(async element => {
          const tokenUri = `${temporalFullTokenUriPrefix}/${element}.json`
          console.log('Full token URI: ', tokenUri)
          const fullTokenData = await fetchIndividualHappyCow(tokenUri);
          console.log(fullTokenData)
          // const currentHappyCow = [{ "tokenId": element, "name": fullTokenData.name, "image": fullTokenData.image.replace('ipfs://', 'http://ipfs.io/ipfs/') }];
          const currentHappyCow = {
            "tokenId": element,
            "image": `/images/nfts/happycows/${fullTokenData.attributes[1].value}.png`,
            "name": fullTokenData.name,
            "breed": fullTokenData.attributes[1].value
          };
          console.log(currentHappyCow)
          setUserHappyCows(oldHappyCows => [...oldHappyCows, currentHappyCow]);
          // setHappyCowUserBreeds(oldBreeds => [...oldBreeds, currentHappyCowBreed]);
        });
      }
      console.log('finished NFT fetch')
      // setLoading(false);
      setIsAdding(false);
    } catch (e) {
      console.log(e);
      setIsAdding(false);
    }
  }

  const fetchIndividualHappyCow = async (tokenUri) => {
    try {
      const response = await fetch(tokenUri)
      const json = await response.json()
      return json;
    } catch (e) {
      console.log('error fetching: ', e)
      return e;
    }
  }

  const handleAddNft = async (_tokenId: string) => {
    setIsAdding(true);
    try {
      // setLoading(true);
      await happyCowsContract.methods.approve(getNftFarmingAddress(), _tokenId).send({ from: account });
      await farmingContract.methods.depositHappyCow(_tokenId).send({ from: account })
      await setLoading(false);
      fetchOriginalUserHappyCows();
      closeDialog()
    } catch (error) {
      // setLoading(false);
      console.log(error)
    }
    setIsAdding(true);
  }


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeDialog}
      iaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: "70vw",
          maxWidth: '70vw',
          minWidth: '70vw',
          borderRadius: '15px',
          background: isDark ? '#27262c' : 'white',
          zindex: 15,
        }
      }}
      contentLabel="Example Modal"
    >
      <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
        <Heading as="h1" size="lg" color="primary" mb="25px" style={{ textAlign: 'center', width: "600px" }}>
          <BoxShadow style={{ borderRadius: '16px', padding: '24px' }}>
            Pick your Happy Cow
          </BoxShadow>
        </Heading>
        <div style={{ cursor: 'pointer', position: 'absolute', right: 0 }} onClick={closeDialog} onKeyDown={closeDialog} role="button" tabIndex={0}>
          <img src="/images/close.png" style={{ width: "25px", height: "25px", cursor: 'pointer' }} alt="close" />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          width: '100%',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxHeight: "400px",
          overflow: 'auto'
        }}>
        {isAdding ? <>
          <TailSpin
            height="80"
            width="80"
            color="#334B65"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          /></> : <>
          {_.map(userHappyCows, nft => (
            <div
              className={"each-happy-cow-image-container"}>
              {happyCowStakedBreeds.includes(nft.breed) ? <>
                <img
                  src={nft.image}
                  alt=""
                  className='each-happy-cow-card-image-disabled'
                  onClick={() => toast.error('Cannot add more than one equal breed.')}
                />
                <div className="each-happy-cow-card-text">
                  Cannot add more {nft.breed} to farm!
                </div>
              </> : <>
                <img
                  src={nft.image}
                  alt=""
                  className='each-happy-cow-card-image'
                  onClick={() => handleAddNft(nft.tokenId)}
                />
                <div className="each-happy-cow-card-text">
                  {nft.name}
                </div>
              </>}
            </div>
          ))}
        </>}
      </div>

    </Modal>
  )
}

export default SelectNFT
