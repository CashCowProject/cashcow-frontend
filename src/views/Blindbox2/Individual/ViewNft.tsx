import _ from 'lodash';
import React, { useContext, useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components'
import { StakeContext } from 'contexts/StakeContext'
import { Heading } from 'cashcow-uikit'
import useTheme from 'hooks/useTheme'
import useI18n from 'hooks/useI18n'
import Modal from 'react-modal';
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { Button } from 'cashcow-uikit'


const ModalBox = styled.div`
  text-align: center;
`

const NftImage = styled.img`
  height: 35vh;
  transition: 1s;
  border-radius: 1em;
  &:hover {
    transform: scale(1.04);
  }
`

const BoxTitle = styled.div`
    font-size: 1.5em;
    font-weight: 600;
    color: #431216;
    word-break: break-word;
    text-align: center;
    margin-bottom: 1em;
`

const BoxSubTitle = styled.div`
    font-size: 1.3em;
    font-weight: 500;
    color: #431216;
    word-break: break-word;
    text-align: center;
    margin-top: .4em;
`
interface Receipt {
  name: string,
  attributes: any,
  image: string
}

const ViewNFT = ({ isOpen, closeDialog, nft }) => {
  const TranslateString = useI18n()
  const { isDark } = useTheme()
  const { account } = useWallet()

  const [nftData, setNftData] = useState<Receipt>();
  const [nftImage, setNftImage] = useState('');
  const [nftName, setNftName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchNftMetaData(nft);
    }
  }, [isOpen])

  const fetchNftMetaData = async (nftMetaHash) => {
    console.log(nftMetaHash)
    const data = await fetch(nftMetaHash);
    const res = await data.json();
    const image = res.image.replace('ipfs://', 'https://ipfs.io/ipfs/');

    console.log(res);

    setNftData(res);
    setNftImage(image);
    setNftName(res.name);
    setLoading(false);
  }

  const BoxShadow = styled.div`
    background: ${!isDark ? 'white' : '#27262c'};
    box-shadow: 0px 2px 12px -8px ${!isDark ? 'rgba(25, 19, 38, 0.7)' : 'rgba(203, 203, 203, 0.7)'}, 0px 1px 1px ${!isDark ? 'rgba(25, 19, 38, 0.05)' : 'rgba(203, 203, 203, 0.05)'};
    position: relative;
    width: 100%;
`

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeDialog}
      ariaHideApp={false}
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
      {!loading && <>
        <ModalBox>
          <BoxTitle style={{ color: isDark ? "white" : "" }}>
            Congratulations! You have minted successfully your {nftName} NFT!
          </BoxTitle>

          <NftImage src={nftImage} />
          <BoxSubTitle style={{ color: isDark ? "white" : "" }}>
            {/* {nftName} */}
            {nftData?.attributes[0]?.trait_type}: {nftData?.attributes[0].value}
            <br />
            {nftData?.attributes[1]?.trait_type}: {nftData?.attributes[1]?.value}

          </BoxSubTitle>
          <Button onClick={closeDialog} style={{ width: "50%", marginTop: "1em" }}>
            Continue
          </Button>


        </ModalBox>
      </>}
    </Modal>
  )
}

export default ViewNFT
