/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import WalletConnect from "@/components/WalletConnect";
import { conciseAddress } from "@/utils/helper";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAccount } from "wagmi";
import { useDisconnect } from "wagmi";

export default function Navbar() {
  const router = useRouter()

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-[23px] items-center">
        <img src="/assets/svg/logo.svg" alt="" />
        <div className=" border-[1px] rounded-[30px] border-white py-1 md:py-2 text-center px-[25px] ">
          <p className="text-16">ETH/USDC Famabot</p>
        </div>
        <div className="ml-[27px] gap-[7px] hidden lg:flex lg:items-center">
          <img src="/assets/svg/Exclamation.svg" />
          <p className="text-16">
            <Link target="_blank" href={'https://docs.fama.one/live-vaults/eth-usdc-famabot'}>Learn more about how Famabot works</Link>
          </p>
        </div>
      </div>
      <WalletConnect />
    </div>
  );
}
