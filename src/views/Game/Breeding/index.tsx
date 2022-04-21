import React, { useState, useEffect, useCallback, useContext } from 'react'
import styled from 'styled-components'
import {Link, useParams} from 'react-router-dom'
import toast from 'react-hot-toast'
import Page from 'components/layout/Page'
import { Heading, Button } from 'cashcow-uikit'
import useTheme from 'hooks/useTheme'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import CowNFT from 'config/abi/CowNFT.json'
import BullNFT from 'config/abi/BullNFT.json'
import NftBreeding from 'config/abi/NftBreeding.json'
import MilkToken from 'config/abi/MilkToken.json'
import Web3 from "web3";
import { fromWei, toWei, AbiItem, toBN } from "web3-utils";
import { LoadingContext } from 'contexts/LoadingContext'
import { getCowNftAddress, getBullNftAddress, getNftBreedingAddress, getMilkAddress } from 'utils/addressHelpers'
import CowCard from './CowCard'
import BullCard from './BullCard'
import BreedingCard from './BreedingCard'

type boxParam = {
  index: string;
};

const StyledHero = styled.div`
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 20px;
  `

const BreedingContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 270px;
    max-width: 31.5%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
  `
const ActionContainer = styled.div`
  min-width: 230px;
  max-width: calc(25% - 30px);
  flex: 1;
  
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 3%), 0 4px 6px -2px rgb(0 0 0 / 1%);
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
`
const ImageContainer = styled.div`
  
`
const ButtonContainer = styled.div`
  text-align: center;
  margin-top: 16px;
`

const BreedingListContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 270px;
    max-width: 31.5%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
  `
const chainId = process.env.REACT_APP_CHAIN_ID
const web3 = new Web3(Web3.givenProvider)

const FarmBreeding = () => {
    const { setLoading } = useContext(LoadingContext);
    const { account, connect } = useWallet()
    const { index } = useParams<boxParam>();
    const { isDark } = useTheme();
    const [selectedCowTokenId, setSelectedCowTokenId] = useState(0)
    const [selectedBullTokenId, setSelectedBullTokenId] = useState(0)

    const handleStartBreeding = async () => {
      
      // Checking breeding condition
      const cowNftContract = new web3.eth.Contract(CowNFT.abi as AbiItem[], getCowNftAddress());
      const bullNftContract = new web3.eth.Contract(BullNFT.abi as AbiItem[], getBullNftAddress());

      const attrOfCow = await cowNftContract.methods.attrOf(selectedCowTokenId).call();
      const attrOfBull = await bullNftContract.methods.attrOf(selectedBullTokenId).call();
      
      if(attrOfCow.rarity === attrOfBull.rarity) {
        setLoading(true);
        try {
          const breedingContract = new web3.eth.Contract(NftBreeding.abi as AbiItem[], getNftBreedingAddress());
          const breedingPrice = breedingContract.methods.breedingPrice().call();
          const milkTokenContract = new web3.eth.Contract(MilkToken.abi as AbiItem[], getMilkAddress());
          const allowance = await milkTokenContract.methods.allowance(account, getNftBreedingAddress()).call();
          if(parseInt(allowance.toString()) < parseInt(breedingPrice))
              await milkTokenContract.methods.approve(getNftBreedingAddress(), breedingPrice).send({ from: account });
        
        
          await breedingContract.methods
              .breed(selectedCowTokenId, selectedBullTokenId)
              .send({from: account})
              .on('transactionHash', function() {
                  toast.success('Transaction submitted');
              })
              .on('receipt', function(receipt) {
                  console.log(receipt);
                  setLoading(false);
                  toast.success('Breeding started');
              })
        } catch (err: unknown) {
            console.log("ERROR: ", err);
            setLoading(false);

            const { message } = err as Error
            toast.error(message);
        }
      } else {
        toast.error('Cannot breed between Cow and Bull with different rarities')
      }
    }
    /* useEffect( () => {
      async function fetchInfo() {

      }

      fetchInfo();
    },[account]) */
    return (
        <Page style={{
            backgroundImage: isDark ? `url(/images/cow/home-backgrounddark.png)` : `url(/images/cow/home-backgroundlight.png)`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',}}
        >
          <StyledHero>
            <Heading as="h1" size="lg" color="secondary" mb="20px" style={{color: isDark ? "white" : ''}}>
              BREEDING
            </Heading>
          </StyledHero>
          <Heading as="h1" size="no" color="primary" mb="20px" style={{color: isDark ? "white" : ''}}>
            TOTAL BREEDING FEES : 90 MILK
          </Heading>
          <BreedingContainer>
            <CowCard selectTokenId={setSelectedCowTokenId}/>
            <ActionContainer>
              <ImageContainer>
                <img src='/images/heartsf.png' alt="" />
              </ImageContainer>
              <ButtonContainer>
                  <Button disabled={selectedCowTokenId === 0 || selectedBullTokenId === 0} onClick={handleStartBreeding}>BING BANG</Button>
              </ButtonContainer>
            </ActionContainer>
            <BullCard selectTokenId={setSelectedBullTokenId}/>
          </BreedingContainer>
          <BreedingListContainer>
            <BreedingCard />
          </BreedingListContainer>
        </Page>
    )
}

export default FarmBreeding
