import React, { useState, useEffect, useContext, useMemo } from 'react'
import styled from 'styled-components'
import { LoadingContext } from 'contexts/LoadingContext'
import Web3 from "web3";
import NftFarmingV2 from 'config/abi/NftFarmingV2.json'
import { fromWei, AbiItem } from "web3-utils";
import { useWallet } from '@binance-chain/bsc-use-wallet'
import toast from 'react-hot-toast'
import SelectNFT from './SelectNFT';
import '../management.css'

export interface CardInterface {
    title?: string;
    index?: number;
    userHappyCow?: any;
    fetchUserHappyCows?: any;
}

const web3 = new Web3(Web3.givenProvider);

const EachHappyCowCard = ({ title, index, userHappyCow, fetchUserHappyCows }: CardInterface) => {
    const { account, connect } = useWallet()
    const [isOpen, setIsOpen] = useState(false);

    console.log(userHappyCow);

    const { setLoading } = useContext(LoadingContext);

    const temporalFarmingContract = '0x23f1Ef47a0953E8A33982AEB5dde6daB08427544';
    const farmingContract = new web3.eth.Contract(NftFarmingV2.abi as AbiItem[], temporalFarmingContract);

    const removeHappyCowFromFarming = async () => {
        console.log('Removing: ', userHappyCow);
        setLoading(true);
        try {
            if (account) {
                const currentTokenId = userHappyCow[0].tokenId;
                await farmingContract.methods.withdrawHappyCow(currentTokenId).send({ from: account });
                fetchUserHappyCows();
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
            <div className='individual-happy-cow-box'>
                {/* {userHappyCow ? userHappyCow[0].breed : <>No Data</>}
            <br /> */}

                {userHappyCow ? <div className="existing-nft-box">
                    <img
                        className='individual-happy-cow-image'
                        src={`/images/nfts/happycows/${userHappyCow[0].breed}.png`}
                    />
                    <img
                        className='individual-happy-cow-button'
                        onClick={removeHappyCowFromFarming}
                        src="/images/nfts/buttons/removegreen.png"
                    />
                </div> : <div className="add-nft-box">
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
                </div>
                }
            </div>
            <SelectNFT
                isOpen={isOpen}
                closeDialog={() => setIsOpen(false)}
                fetchOriginalUserHappyCows={fetchUserHappyCows}
                // actionHandler={farmActionHandler}
            />
        </>
    )
}

export default EachHappyCowCard;


