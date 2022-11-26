import React, { useState, useCallback, useEffect, useContext } from 'react'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { Button, Heading } from 'cashcow-uikit'
import Market from 'config/abi/Market.json'
import AirNfts from 'config/abi/AirNft.json'
import HappyCows from 'config/abi/HappyCows.json'
import Breeding from 'config/abi/NftBreeding.json'
import NftMinter from 'config/abi/NftMinter.json'
import ERC721 from 'config/abi/ERC721.json'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { fromWei, AbiItem, toBN, toWei } from 'web3-utils'
import Modal from 'react-modal'
import { usePriceCakeBusd } from 'state/hooks'
import Web3 from 'web3'
import {
  getHappyCowAddress,
  getMarketAddress,
  getAirNftAddress,
  getNftBreedingAddress,
  getCowNftAddress,
  getBullNftAddress,
  getLandNftAddress,
  getNftMinterAddress
} from 'utils/addressHelpers'
import { LoadingContext } from 'contexts/LoadingContext'
import useTheme from 'hooks/useTheme'
import { PINATA_BASE_URI } from 'config/constants/nfts'
import { getNumberSuffix } from 'utils/formatBalance'
import { useHistory } from 'react-router-dom'
import '../assets/styles.css'

const NftMetaDataContainer = styled.div`
  display: flex;
  padding: 16px 32px;
  flex: 1;
  flex-wrap: wrap;
  align-items: inherit;
  justify-content: center;
`
const NftImageContainer = styled.div`
  max-width: 332px;
  max-height: 100%;
  min-width: 240px;
  min-height: 240px;
  width: 46%;
  border-radius: 16px;
  overflow: hidden;
  margin: 16px 32px 16px 0;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const NftImage = styled.div`
  width: 100%;
  padding-bottom: 100%;
  height: 0;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: auto 100%;
`

const NftInfo = styled.div`
  flex: 1;
  min-width: 220px;
  margin: 16px 0;
  display: flex;
  flex-direction: column;
`

const NftTitleContainer = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #431216;
  word-break: break-word;
`

const NftSalePriceContainer = styled.div`
  margin-top: 20px;
  box-shadow: 0 6px 12px 0 rgb(0 0 0 / 6%), 0 -1px 2px 0 rgb(0 0 0 / 2%);
  border-radius: 16px;
  display: flex;
  height: 100%;
`

const NftSalePrice = styled.div`
  padding: 16px;
  flex: 1;
`
const NftSalePriceTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #694f4e;
`

const TokenSelectContainer = styled.div`
  display: flex;
  align-items: center;
`
const NftSalePriceDetail = styled.div`
  font-size: 28px;
  color: #431216;
  font-weight: 700;
  margin-top: 6px;
  display: flex;
  align-items: center;
`
const BuyNowBtnContainer = styled.div`
  margin-top: 24px;
`

const ItemValueToken = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  column-gap: 8px;
`

const InputTag = styled.input`
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  height: 44px;
  line-height: 44px;
  box-sizing: border-box;
  font-size: 16px;
  padding: 0 68px 0 16px;
  display: flex;
  outline: none;
  color: #431216;
  background: transparent;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 15px;
  -moz-appearance: textfield;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const customStyles = {}

const web3 = new Web3(Web3.givenProvider)

export interface NftDataCenterComponentInterface {
  myToken?: any
}

const MyNftDataCenterComponent = ({ myToken }: NftDataCenterComponentInterface) => {
  const { isDark } = useTheme()
  const { account } = useWallet()
  // const [selectedToken, setSelectedToken] = useState('Milk');
  const selectedToken = 'Milk'
  const [image, setImage] = useState('')
  const [salePrice, setSalePrice] = useState('')
  const [tokenName, setTokenName] = useState('')
  const [tokenType, setTokenType] = useState('')
  const [itemId, setItemId] = useState('0')
  const [description, setDescription] = useState('')
  const [priceNft, setPriceNft] = useState('')
  const [flgList, setFlgList] = useState(false)
  // Sell and Burn Modals
  const [modalIsOpen, setIsOpen] = useState(false)
  const [burnModalIsOpen, setBurnModalIsOpen] = useState(false)
  const [flgButtonState, setFlgButtonState] = useState(true)
  const { setLoading } = useContext(LoadingContext)
  const cakePriceUsd = usePriceCakeBusd()
  const history = useHistory()
  // const milkTokenContract = new web3.eth.Contract(MilkToken.abi as AbiItem[], getMilkAddress());
  const happyCowsContract = new web3.eth.Contract(HappyCows.abi as AbiItem[], getHappyCowAddress())
  const marketContract = new web3.eth.Contract(Market.abi as AbiItem[], getMarketAddress())
  const airnftContract = new web3.eth.Contract(AirNfts.abi as AbiItem[], getAirNftAddress())
  const breedingContract = new web3.eth.Contract(Breeding.abi as AbiItem[], getNftBreedingAddress())
  const nftminterContract = new web3.eth.Contract(NftMinter.abi as AbiItem[], getNftMinterAddress())

  const fetchNft = useCallback(async () => {
    setLoading(true);

    console.log('Fetching from Center component')
    const marketItems = await marketContract.methods.fetchMarketItems().call({ from: account })
    console.log(marketItems)
    if (!myToken) return
    for (let i = 0; i < marketItems.length; i++) {
      if (marketItems[i].itemId === myToken.itemId) {
        setSalePrice(fromWei(marketItems[i].price, 'ether'))
        setFlgList(true)
        break
      }
    }
    console.log(myToken)
    setItemId(myToken.itemId)
    const tmpTokenId = myToken.tokenId

    if (!tmpTokenId) return

    // FIXME: Deleted Code With Errors dev@topospec
    // let nftHash = null
    // if (myToken.collection) {
    //   console.log('inside conditional')
    //   nftHash = await happyCowsContract.methods.tokenURI(toBN(tmpTokenId)).call({ from: account })
    // } else {
    //   nftHash = await airnftContract.methods.tokenURI(toBN(tmpTokenId)).call({ from: account })
    // }

    const nftContract = new web3.eth.Contract(ERC721.abi as AbiItem[], myToken.collection);
    let nftHash = await nftContract.methods.tokenURI(toBN(tmpTokenId)).call({ from: account })
    const res = await fetch(nftHash)
    const json = await res.json()
    console.log(' >> Center Component Data: ', json)
    setTokenType(json.name)

    setDescription(json.description ? json.description : "")

    let imageUrl = json.image
    if (myToken.collection == getHappyCowAddress()) {
      setTokenName(json.name)
      imageUrl = imageUrl.slice(7)
      setImage(`${PINATA_BASE_URI}${imageUrl}`)
    } else if (myToken.collection == getAirNftAddress()) {
      setTokenName(json.name)
      setImage(imageUrl)
    } else {
      setTokenName(json.name + "#" + myToken.tokenId)
      setImage(imageUrl)
    }

    setLoading(false);

  }, [account, myToken])

  useEffect(() => {
    fetchNft()
  }, [fetchNft])

  const listNFTHandler = async () => {
    if (!myToken) return

    setFlgButtonState(false)
    setLoading(true)
    closeModal()
    const nftContract = new web3.eth.Contract(ERC721.abi as AbiItem[], myToken.collection)
    const approvedAddress = await nftContract.methods.getApproved(toBN(myToken.tokenId)).call()
    if (approvedAddress !== getMarketAddress()) {
      await nftContract.methods.approve(getMarketAddress(), toBN(myToken.tokenId)).send({ from: account })
      toast.success('Approved AirtNFT token.')
    }


    try {
      await marketContract.methods
        .createMarketItem(
          myToken.collection,
          toBN(myToken.tokenId),
          toWei(priceNft, 'ether'),
        )
        .send({ from: account })
        .on('transactionHash', function () {
          toast.success('Transaction submitted.')
        })
        .on('receipt', function (receipt) {
          const returnItemId = receipt.events.MarketItemCreated.returnValues.itemId
          setItemId(returnItemId)
          setSalePrice(priceNft)
          setFlgList(true)
          history.push("/myNFTs")
          toast.success('Successfully listed NFT.')
        })
    } catch (e) {
      console.log(e)
      const { message } = e as Error
      toast.error(message)
    }
    setFlgButtonState(true)
    setLoading(false)
  }

  const unlistNFTHandler = async () => {
    setFlgButtonState(false)
    setLoading(true)

    try {
      await marketContract.methods
        .unlistMarketItem(myToken.collection, itemId)
        .send({ from: account })
        .on('transactionHash', function () {
          toast.success('Transaction submitted.')
        })
        .on('receipt', function () {
          setFlgList(false)
          history.push("/myNFTs")
          toast.success('Successfully unlisted NFT.')
        })
    } catch (e) {
      const { message } = e as Error
      toast.error(message)
    }
    setFlgButtonState(true)
    setLoading(false)
  }

  const moveToBreeding = async () => {
    try {
      console.log("move to breeding")
      setLoading(true);
      if (myToken.collection == getHappyCowAddress() || myToken.collection == getAirNftAddress() || myToken.collection == getLandNftAddress()) {
        toast.success('not available to stake for the breeding.')
        setLoading(false)
        return;
      }
      const nftContract = new web3.eth.Contract(ERC721.abi as AbiItem[], myToken.collection)
      const approvedAddress = await nftContract.methods.getApproved(toBN(myToken.tokenId)).call()
      if (approvedAddress !== getNftBreedingAddress()) {
        await nftContract.methods.approve(getNftBreedingAddress(), toBN(myToken.tokenId)).send({ from: account })
        toast.success("Approved successfully")
      }
      if (myToken.collection == getCowNftAddress()) {
        await breedingContract.methods.stakeCow(myToken.tokenId).send({ from: account });
      } else if (myToken.collection == getBullNftAddress()) {
        await breedingContract.methods.stakeBull(myToken.tokenId).send({ from: account });
      }
      setLoading(false);
      history.push("/myNFTs")
    } catch {
      setLoading(false);
    }
  }
  const openModal = () => {
    setIsOpen(true)
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
  }

  const afterOpenBurnModal = () => {
    // references are now sync'd and can be accessed.
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const closeBurnModal = () => {
    setBurnModalIsOpen(false)
  }


  const handleChange = (e) => {
    const { value, maxLength } = e.target
    const message = value.slice(0, maxLength)
    setPriceNft(message)
  }

  const handleOpenBurnModal = () => {
    if (flgList) {
      toast.error('You cannot burn a listed nft.');
    } else if (tokenType === "Land") {
      toast.error('You cannot burn a Land.');
    } else if (tokenName.includes("HappyCows")) {
      toast.error('You cannot burn a HappyCow')
    } else {
      setBurnModalIsOpen(true);
    }
  }

  const handleBurn = async () => {
    if (!myToken) return

    closeBurnModal();
    setLoading(true);

    if (tokenType === "Bull") {
      try {
        await nftminterContract.methods
          .burnBull(
            myToken.tokenId
          )
          .send({ from: account })
          .on('transactionHash', function () {
            toast.success('Transaction submitted.')
          })
          .on('receipt', function () {
            history.push("/myNFTs")
            toast.success('Successfully burned NFT.')
          })
      } catch (e) {
        console.log(e)
      }
    } else if (tokenType === "Cow") {
      try {
        await nftminterContract.methods
          .burnCow(
            myToken.tokenId
          )
          .send({ from: account })
          .on('transactionHash', function () {
            toast.success('Transaction submitted.')
          })
          .on('receipt', function () {
            history.push("/myNFTs")
            toast.success('Successfully burned NFT.')
          })
      } catch (e) {
        console.log(e)
      }
    }

    setLoading(false);

  }

  return (
    <NftMetaDataContainer>

      <NftInfo>

        <NftTitleContainer
          style={{ color: isDark ? 'white' : 'white' }}
        >
          {tokenName}
        </NftTitleContainer>

        <NftSalePriceContainer
          style={{
            background: isDark ? '#16151a' : '',
            boxShadow: isDark ? '0 6px 12px 0 rgb(255 255 255 / 6%), 0 -1px 2px 0 rgb(255 255 255 / 2%)' : '',
          }}
        >
          {flgList ? (
            <NftSalePrice>
              <NftSalePriceTitleContainer style={{ color: isDark ? 'white' : '' }}>
                Sale Price
                <TokenSelectContainer>
                  <div style={{ color: isDark ? 'white' : '#00d86c', fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <img
                        style={{ width: '16px', height: '16px', marginRight: '5px', transform: 'translateY(-.5px)' }}
                        alt="Milk Token Icon"
                        src="/images/farms/milk.png"
                      />
                      Milk
                    </div>
                  </div>
                </TokenSelectContainer>
              </NftSalePriceTitleContainer>
              <NftSalePriceDetail style={{ color: isDark ? 'white' : '' }}>
                <img
                  style={{ width: '24px', height: '24px', marginRight: '8px' }}
                  src={selectedToken === 'Milk' ? '/images/farms/milk.png' : '/images/tokens/darkBNB.png'}
                  alt="Token Icon"
                />
                {getNumberSuffix(salePrice)}
                <span
                  style={{ fontSize: '14px', color: isDark ? 'white' : '#694f4e', fontWeight: 400, marginLeft: '4px' }}
                >
                  ≈ ${getNumberSuffix(Math.round(cakePriceUsd.toNumber() * parseInt(salePrice) * 100) / 100)}
                </span>
              </NftSalePriceDetail>
            </NftSalePrice>
          ) : (
            <div
              style={{
                fontSize: '17px',
                margin: 'auto',
                padding: '22px',
                color: isDark ? 'white' : 'white',
              }}
            >
              Not Listed Yet
            </div>
          )}
        </NftSalePriceContainer>

        <BuyNowBtnContainer>
          <div>
            {account && flgButtonState ? (
              <>
                <Button
                  className={flgList ? "unlist-button" : "sell-button"}
                  style={{
                    backgroundColor: 'transparent',
                  }}
                  onClick={flgList ? unlistNFTHandler : openModal}
                >
                  {/* {flgList ? 'Unlist NFT' : 'List NFT'} */}
                </Button>
                &nbsp;
                {/* We need to check if the tokenType is not Land, because we cannot burn lands */}
                  <Button
                    style={{ backgroundColor: 'transparent' }}
                    className={flgList || tokenType === "Land" || tokenName.includes("HappyCows") ? "burn-button-disabled" : "burn-button"}
                    onClick={handleOpenBurnModal}
                  >
                    {/* {flgList ? 'Unlist NFT' : 'List NFT'} */}
                  </Button>
              </>

            ) : (
              <Button
                // style={{ width: '100%' }} 
                disabled
                style={{ backgroundImage: '/images/nfts/buttons/burngray.png' }}
              >
                {flgList ? 'Unlist NFT' : 'List NFT'}
              </Button>
            )}
          </div>
        </BuyNowBtnContainer>

      </NftInfo>

      {/* Sell Modal */}

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '500px',
            minWidth: '400px',
            borderRadius: '15px',
          },
        }}
        contentLabel="Example Modal"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Heading as="h1" size="no" color="primary" mb="20px">
            List NFT
          </Heading>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => closeModal()}
            onKeyDown={closeModal}
            role="button"
            tabIndex={0}
          >
            <img src="/images/close.png" style={{ width: '25px', height: '25px' }} alt="close" />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', width: '70%' }}>
            <InputTag
              type="number"
              maxLength={18}
              placeholder="Price of NFT"
              value={priceNft}
              onChange={handleChange}
            />
            <ItemValueToken>
              <img
                src="/images/farms/milk.png"
                alt="token"
                style={{ width: '26px', height: '26px', marginRight: '4px' }}
              />
              MILK
            </ItemValueToken>
          </div>
          <Button onClick={listNFTHandler}>List NFT</Button>
        </div>
      </Modal>

      {/* Burn Modal */}

      <Modal
        isOpen={burnModalIsOpen}
        onAfterOpen={afterOpenBurnModal}
        onRequestClose={closeBurnModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            // maxWidth: '500px',
            // minWidth: '400px',
            borderRadius: '15px',
            backgroundColor: '#0B3D4C'
          },
        }}
        contentLabel="Example Modal"
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

          {/* <Heading as="h1" size="no" color="primary" mb="20px">
            Burn NFT
          </Heading> */}

          {/* <div
            style={{ cursor: 'pointer' }}
            onClick={() => closeBurnModal()}
            onKeyDown={closeBurnModal}
            role="button"
            tabIndex={0}
          >
            <img src="/images/close.png" style={{ width: '25px', height: '25px' }} alt="close" />
          </div> */}

          <div className="burn-alien-image">
            <img src="/images/nfts/extraterrestre.png" className="burn-alien-image-png" />
            <div
              className="burn-confirm-button"
              onClick={handleBurn}
            >
              Yes
            </div>
            <div
              className="burn-cancel-button"
              onClick={closeBurnModal}
            >
              No
            </div>
          </div>

        </div>

        <div className="burn-alien-text">
          Your NFT is going to be abducted.
          <br />
          Are you sure you want to continue?
        </div>
      </Modal>

    </NftMetaDataContainer>
  )
}

export default MyNftDataCenterComponent
