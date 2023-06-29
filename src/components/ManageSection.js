/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */

import { contractAddress, erc20Contract, erc20ContractAddress, wagmiContractConfig } from "@/contract";
import { notify } from "@/utils/helper";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount, useBalance, useContractRead, useContractWrite } from "wagmi";
import LoadingSpinner from "./LoadingSpinner";



const Position_Data = [
  {
    id: 1,
    title: "0",
  },
  {
    id: 2,
    title: "LP Tokens",
  },
  {
    id: 3,
    title: "$0",
  },
  {
    id: 4,
    title: "Est. Value",
  },
];

export default function ManageSection() {

  const { address } = useAccount();
  const [inputValue, setInputValue] = useState(0);
  const [usdBalance, setUsdBalance] = useState(null);
  const { data: userBalance, isLoading: loadUserBalance } = useBalance({
    address,
  })

  const handleFormateValue = async () => {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
    const ethPriceInUSD = response.data.ethereum.usd;

    let balance = Number(userBalance?.formatted) || 0
    const balanceInUSD = balance * ethPriceInUSD;

    setUsdBalance({
      ethPriceInUSD,
      balanceInUSD,
      balance
    })
  }

  useEffect(() => {
    handleFormateValue()
  }, [userBalance?.value])

  const Wallet_Data = [
    {
      id: 1,
      title: " Ξ " + usdBalance?.balance?.toFixed(4),
    },
    {
      id: 2,
      title: "ETH",
    },
    {
      id: 3,
      title: `$${usdBalance?.balanceInUSD.toFixed(3)}`,
    },
    {
      id: 4,
      title: "USDC",
    },
  ];

  // erc20Contract
  // approved Function 
  const { write: mutateApprove, error: idApproveError, isLoading: isApproveLoading } =
    useContractWrite({
      ...erc20Contract,
      functionName: 'approve',
      chainId: 5,
      args: [contractAddress, parseInt(inputValue)],
    })

  // Deposit Functions
  const { write: mutateDeposit, error, isLoading } =
    useContractWrite({
      ...wagmiContractConfig,
      functionName: 'deposit',
      chainId: 5,
      args: [erc20ContractAddress, parseInt(inputValue)],
    })

  // WidthDraw
  const { write: mutateWithdraw, error: isErrorWithdraw, isLoading: isLoadingWithdraw, } =
    useContractWrite({
      ...wagmiContractConfig,
      functionName: 'withdraw',
      chainId: 5,
      args: [parseInt(inputValue)],
    })


  const { data: approveUser, error: approveError, } =
    useContractRead({
      ...erc20Contract,
      functionName: 'allowance',
      chainId: 5,
      args: [address, contractAddress],
    });

  useEffect(() => {
    if (error) {
      notify(error?.message)
    }
    if (isErrorWithdraw) {
      notify(isErrorWithdraw?.message)
    }

  }, [error, isErrorWithdraw])

  const isApprovedUser = approveUser === 0n ? true : false;


  return (
    <div className="bg-manage-bg px-[25px] pt-[14px] pb-[41px] border-[1px] border-white mt-[41px] rounded-[30px]">
      <p className="text-20 sm:text-25">Manage</p>
      <div className="mt-[11px]">
        <p className="text-16 sm:text-18">Your Wallet:</p>
        <div className="grid grid-cols-2 gap-[21px] mt-[47px]">
          {Wallet_Data.map((items, idx) => {
            return (
              <div key={idx} className="flex justify-center items-center">
                <p className="text-16">{items.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-[47px]">
        <p className="text-16 sm:text-18">Your Position:</p>
        <div className="grid grid-cols-2 gap-[21px] mx- mt-[47px]">
          {Position_Data.map((items, idx) => {
            return (
              <div key={idx} className="flex justify-center items-center">
                <p className="text-16">{items.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-[48px]">
        <p className="text-16 sm:text-18">Execute:</p>
        <div className="flex items-center justify-between gap-2 w-full mt-[39px]">
          <div className="border-b-[1px] flex items-center gap-[3px] w-full w-[40%]">
            <p className="text-20 sm:text-25">$</p>
            <input placeholder="0" min='0' onChange={(e) => {
              let value = e.target.value;
              value = Number(value)
              setInputValue(value)
            }} type='number' className="bg-none w-full text-18 sm:text-25 focus:outline-none" />
          </div>
          <div className="flex items-center  gap-[3px] border-[1px] rounded-[30px] w-full justify-center py-[3px] pl-[15px] pr-[12px]">
            <p className="text-18 sm:text-22">USDC</p>
            <img src="/assets/image/DownArrow.png" className="w-[21px] h-[14px]" />
          </div>
        </div>
      </div>
      <div className="mt-[59px] lg:mt-[100px] ">
        <button
          disabled={!mutateDeposit || inputValue === 0}
          // mutateDeposit?.()
          // onClick={() => mutateDeposit()}
          onClick={() => {
            if (address) {
              if (isApprovedUser) {
                mutateApprove()
              } else {
                mutateDeposit()
              }
            } else {
              notify('Wallet is not connected')
            }
          }
          }
          className="w-full text-16 sm:text-18 rounded-[30px] py-[10px]" style={{ background: "linear-gradient(270deg, #C660C7 0%, #4CC5C0 100%)" }}>
          {isLoading ? <LoadingSpinner /> : 'Deposit'}
        </button>
        <button disabled={!mutateWithdraw || inputValue === 0}
          onClick={() => {
            if (address) { mutateWithdraw?.() } else {
              notify('Wallet is not connected')
            }
          }}
          className="border-[1px] text-16 sm:text-18 rounded-[30px] py-[10px] w-full mt-[21px] ">
          {isLoadingWithdraw ? <LoadingSpinner /> : 'Withdraw'}
        </button>
      </div>
    </div >
  );
}
