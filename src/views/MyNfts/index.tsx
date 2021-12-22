import React, {useEffect, useState, useMemo, useCallback,} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { Heading } from '@pancakeswap-libs/uikit'
import { AbiItem } from "web3-utils"
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Web3 from "web3";
import HappyCows from 'config/abi/HappyCows.json'
import Market from 'config/abi/Market.json'
import Page from 'components/layout/Page'
import { getHappyCowAddress, getMarketAddress } from 'utils/addressHelpers'
import EachNft from './components/EachNft'

const StyledHero = styled.div`
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 20px;
`
const NftItemContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px;
`

const web3 = new Web3(Web3.givenProvider)

const MyNfts = () => {
    const { account } = useWallet()
    const [myTokens, setMyTokens] = useState([]);

    const happyCowsContract = useMemo(() => {
        return new web3.eth.Contract(HappyCows.abi as AbiItem[], getHappyCowAddress())
    }, []) 

    const marketContract = useMemo(() => {
        return new web3.eth.Contract(Market.abi as AbiItem[], getMarketAddress())
    }, [])

    const getTokenHashes = useCallback(
        async () => {
            const tmpMyTokens = [];
            let tokenIds = await happyCowsContract.methods.fetchMyNfts().call({from: account});
            const items = await marketContract.methods.fetchItemsCreated().call({from: account});
            const tokenIdLength = tokenIds.length;
            for(let i = 0; i < tokenIdLength; i ++) {
                if (!tmpMyTokens[i]) tmpMyTokens[i] = {}
                tmpMyTokens[i].itemId = '0'
            }
            let currentIndex = 0;
            for(let i = 0; i < items.length; i ++) {
                if(items[i].isSold === false) {
                    tokenIds = [
                        ...tokenIds, 
                        items[i].tokenId
                    ];
                    if (!tmpMyTokens[currentIndex + tokenIdLength]) tmpMyTokens[currentIndex + tokenIdLength] = {}
                    tmpMyTokens[currentIndex + tokenIdLength].itemId = items[i].itemId
                    currentIndex ++;
                }
            }
            
            const myTokenHashes = [];
            for(let i = 0; i < tokenIds.length; i ++) {
                myTokenHashes.push(happyCowsContract.methods.tokenURI(tokenIds[i]).call());
            }
            const result = await Promise.all(myTokenHashes);
            
            for(let i = 0; i < tokenIds.length; i ++) {
                if (!tmpMyTokens[i]) tmpMyTokens[i] = {}
                tmpMyTokens[i].tokenId = tokenIds[i]
                tmpMyTokens[i].tokenHash = result[i]
            }
            setMyTokens(tmpMyTokens);
        },
        [account, happyCowsContract, marketContract]
    )
    useEffect( () => {
        getTokenHashes()
    }, [getTokenHashes])

    return (
        <Page>
            <StyledHero>
                <Heading as="h1" size="lg" color="secondary" mb="20px">
                    My NFTs
                </Heading>
            </StyledHero>
            <NftItemContainer>
            {
                myTokens.map((EachMyToken, index) => {
                    return(
                        <Link key={EachMyToken.tokenHash} to={`/myNFTs/${index}`}>
                            <EachNft eachMyToken={EachMyToken} key={EachMyToken.tokenId}/>
                        </Link>
                    )
                })
            }
            </NftItemContainer>
            
            
        </Page>
    )
}

export default MyNfts
