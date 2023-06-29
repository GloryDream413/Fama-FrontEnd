import useWalletConnector from '@/hooks/useWalletConnector';
import { conciseAddress } from '@/utils/helper';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAccount, useDisconnect } from 'wagmi';

export default function WalletConnect() {
  const router = useRouter();
  const { disconnect, status } = useDisconnect();
  const account = useAccount();
  const { onConnect } = useWalletConnector();

  useEffect(() => {
    if (account?.address) {
      router.push('/openingPages');
    }else if(!account?.address) {
      router.push('/')
    }
  }, [status, account?.address])

  // useEffect(() => {onConnect()},[account?.address])


  return (
      <button onClick={() => {
        account?.address ? disconnect() : router.push('/')
      }}
        className="border-[1px] border-nav-sideBorder py-1 px-[25px] text-16 rounded-[43px] md:py-2 cursor-pointer">
        {account?.address ? conciseAddress(account?.address, 6, 5) : 'Wallet Connect'}
        {/* wallet connect */}
      </button>
  )
}