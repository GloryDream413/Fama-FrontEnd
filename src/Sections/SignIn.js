/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import ImageButton from "@/components/ImageButton";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";

export default function SignInSection({ imgUrl }) {
  const router = useRouter();

  const { connect, connectors } = useConnect()
  const account = useAccount()


  const handleConnectWallet = (connectFun) => {
    connect({ connector: connectFun })
  }

  useEffect(() => {
    if (account?.address)
      router.push('/openingPages')
  }, [account?.status, account?.address])


  return (
    <div>
      <div className="flex flex-col items-center text-center">
        <img src="/assets/svg/logo.svg" className="w-[26px] h-[104px]" />
        <p className="text-28 mt-9 sm:text-38">Select your wallet:</p>
        <div className="bg-manage-bg mt-9 w-full py-[35px] gap-3 max-w-[333px] flex flex-col items-center justify-center border-[1px] rounded-[7px] ">
          <ImageButton onClick={() => {
            handleConnectWallet(connectors?.[0])
          }} imgUrl={"/assets/svg/MetaMask.svg"} title="Metamask" />
          <ImageButton
            imgUrl={"/assets/svg/Wallet.svg"}
            title="Walletconnect"
            sx="mb-1"
            onClick={() => handleConnectWallet(connectors?.[2])}
          />
          <ImageButton
            imgUrl={"/assets/svg/Ledger.svg"}
            title="Ledger"
            onClick={() => handleConnectWallet(connectors?.[1])}
          />
        </div>
        <p className="text-14 mt-6 sm:text-16">
          Fama is <span className="font-semibold "> beta and non-audited</span> software, use at your own
          discretion!
        </p>
      </div>
    </div>
  );
}
