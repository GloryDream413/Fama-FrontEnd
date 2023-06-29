/* eslint-disable react-hooks/rules-of-hooks */

import { useCallback } from 'react';

import { ethers } from 'ethers';
import { useDispatch } from 'react-redux';
import { useAccount } from 'wagmi';


import { abi, contractABI, contractAddress } from '@/contract';
import { usePublicClient, useWalletClient, useContract, useProvider } from 'wagmi';
import { goerli } from 'wagmi/chains'
import chains from 'wagmi/chains'
import { changeAccount, changeChainId, changeContract, changeProvider, changeSigner } from '@/redux/slice/web3';
// import { useNotify } from '@/components/notify';

// console.log({goerli})

const useWalletConnector = () => {
  const dispatch = useDispatch();
  const notify = 'useNotify()';

  //   const url = "http://127.0.0.1:8545";
  // const provider = new ethers.providers.JsonRpcProvider(url);

  const { connector, address: account } = useAccount();


  const signer = useWalletClient({
    chainId: goerli.id
  })

  const provider = usePublicClient()

  const onConnect = useCallback(async () => {
    try {
      const chainId = await 'signer?.getChainId()';
      const isChainId= goerli.id
      if (account && isChainId) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        // console.log({signer})
        // instantiate contract instance and assign to component ref variable
        // console.log({ chainId, account })

        // const APP_CONTRACT = new ethers.Contract(contractAddress, contractABI, provider );
        // const APP_CONTRACT = useContract(contractAddress, contractABI, provider );
        const APP_CONTRACT = new ethers.Contract(
          contractAddress,
          contractABI,
          signer,
        )
        // console.log({ APP_CONTRACT })

        dispatch(changeChainId(chainId));
        dispatch(changeAccount(account));
        dispatch(changeProvider(provider));
        dispatch(changeSigner(signer));

        dispatch(
          changeContract({
            APP_CONTRACT,
          }),
        );
        // switchNetwork(provider);
      } else {
        // notify('error', 'network is not connected');
        // console.log('network is not connected ');
      }
    } catch (error) {
      // notify('error', 'network is not connected to Polygon');
      // console.log(error);
    }
  }, [account, dispatch, provider, ]);

  const onDisconnect = async () => {
    connector.onDisconnect();

    resetAll();
  };

  return {
    onConnect,
    onDisconnect,
  };
};

export default useWalletConnector;