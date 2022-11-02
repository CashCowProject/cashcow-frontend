import React, { useState, useEffect, useContext, useMemo } from 'react'
import styled from 'styled-components'
import { LoadingContext } from 'contexts/LoadingContext'
import Web3 from "web3";
import NftFarmingV2 from 'config/abi/NftFarmingV2.json'
import { fromWei, AbiItem } from "web3-utils";
import { useWallet } from '@binance-chain/bsc-use-wallet'
import toast from 'react-hot-toast'
import SelectNFT from './SelectNFT';
import { getNftFarmingAddress } from 'utils/addressHelpers'
import '../management.css'

const web3 = new Web3(Web3.givenProvider);

const EachGenesisCard = ({ genesisToken, genesisTokenId, hasGenesisStaked, fetchUserGenesis }) => {
    const { account, connect } = useWallet()
    const { setLoading } = useContext(LoadingContext);
    const [isOpen, setIsOpen] = useState(false);

    // FIXME: To be removed in a future version
    const temporalFarmingContract = '0xb1A8042ba17Fd8B67E1A90aa577c553B4e5b1b17';
    const farmingContract = new web3.eth.Contract(NftFarmingV2.abi as AbiItem[], getNftFarmingAddress());

    const removeGenesisFromFarming = async () => {
        console.log('Removing: ', genesisTokenId);
        setLoading(true);
        try {
            if (account) {
                await farmingContract.methods.withdrawAirNft(genesisTokenId).send({ from: account });
                fetchUserGenesis();
            } else {
                toast.error("Error with account. Please Reconnect your Wallet.");
            }
        } catch (e) {
            console.log(e)
            toast.error("Error on Remove. Please refresh and Retry.");
        }
        setLoading(false);
    }

    return (
        <>
        <div className='individual-genesis-box'>
            {hasGenesisStaked ? <>
                <img
                    className='individual-genesis-image'
                    // src={(genesisToken.image).replace('ipfs://', 'http://ipfs.io/ipfs/')}
                    // FIXME: Must be replaced with last line
                    // Just for testing: dev@topospec
                    src='/images/farms/management/dancingcow.png'
                />
                <img
                    className='individual-happy-cow-button'
                    onClick={removeGenesisFromFarming}
                    src="/images/nfts/buttons/removegreen.png"
                />
            </> : <>
                <img
                    className='individual-happy-cow-more-button'
                    onClick={() => setIsOpen(true)}
                    src={`/images/nfts/buttons/more.png`}
                />
                <img
                    className='individual-happy-cow-add-button'
                    onClick={() => setIsOpen(true)}
                    src="/images/nfts/buttons/addgreen.png"
                />
            </>}
        </div>
            <SelectNFT
                isOpen={isOpen}
                closeDialog={() => setIsOpen(false)}
                fetchOriginalUserGenesis={fetchUserGenesis}
            />
        </>
    )
}

export default EachGenesisCard;
