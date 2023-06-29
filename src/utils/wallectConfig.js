// import { configureChains } from 'wagmi'

// import { alchemyProvider } from 'wagmi/providers/alchemy'
// import { publicProvider } from 'wagmi/providers/public'

// import { LedgerConnector } from 'wagmi/connectors/ledger'
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
// // // import { goerli } from 'viem/chains'
// import { avalanche, bsc, goerli, mainnet } from '@wagmi/chains'


// const { publicClient, webSocketPublicClient } = configureChains(
//   [avalanche, bsc, mainnet,goerli],
//   [alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), publicProvider()],
// )

// // // Set up wagmi config
// // export const config = createConfig({
// //   autoConnect: true,
  
//   // connectors: [
//   //   new MetaMaskConnector({ chains }),
//   //   // new CoinbaseWalletConnector({
//   //   //   chains,
//   //   //   options: {
//   //   //     appName: 'wagmi',
//   //   //   },
//   //   // }),
//   //   new LedgerConnector({
//   //     options: {
//   //       enableDebugLogs: true,
//   //       chains,
//   //       // rpc: {
//   //       //   1: 'https://eth-mainnet.alchemyapi.io/v2/yourAlchemyId',
//   //       // },
//   //     },
//   //   }),
//   //   new WalletConnectConnector({
//   //     chains,
//   //     options: {
//   //       projectId: 'c1fecdaa2d99d3e07e8d35e697a3dc25',
//   //     },
//   //   }),
//   //   // new InjectedConnector({
//   //   //   chains,
//   //   //   options: {
//   //   //     name: 'Injected',
//   //   //     shimDisconnect: true,
//   //   //   },
//   //   // }),
//   // ],
// //   publicClient,
// //   webSocketPublicClient,
// // })

// // import { createClient } from "wagmi"
// // import {
// //   polygonMumbai
// // } from "wagmi/chains"


// // // if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
// // //   throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
// // // }
// // const projectId = 'c1fecdaa2d99d3e07e8d35e697a3dc25'
// // // process.env.NEXT_PUBLIC_PROJECT_ID;

// // const chains = [goerli];

// // // const { provider } = configureChains(chains,[MetaMaskConnector, LedgerConnector] );
// // export const wagmiClient = createClient({
// //   autoConnect: true,
// //   connectors: [
// //     new MetaMaskConnector({ chains }),
// //     // new CoinbaseWalletConnector({
// //     //   chains,
// //     //   options: {
// //     //     appName: 'wagmi',
// //     //   },
// //     // }),
// //     new LedgerConnector({
// //       options: {
// //         enableDebugLogs: true,
// //         chains,
// //         // rpc: {
// //         //   1: 'https://eth-mainnet.alchemyapi.io/v2/yourAlchemyId',
// //         // },
// //       },
// //     }),
// //     new WalletConnectConnector({
// //       chains,
// //       options: {
// //         projectId: 'c1fecdaa2d99d3e07e8d35e697a3dc25',
// //       },
// //     }),
// //     // new InjectedConnector({
// //     //   chains,
// //     //   options: {
// //     //     name: 'Injected',
// //     //     shimDisconnect: true,
// //     //   },
// //     // }),
// //   ],
// //   publicClient,
// //   webSocketPublicClient
// // });



import { configureChains, createConfig } from 'wagmi'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import { LedgerConnector } from 'wagmi/connectors/ledger'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { goerli } from 'wagmi/chains'




const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [alchemyProvider({ apiKey: '9BAxqf4GeMLJ4C9uwsOGo-1PSjtGmsFu' }), publicProvider()],
)

// Set up wagmi config
export const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     appName: 'wagmi',
    //   },
    // }),
    new LedgerConnector({
      options: {
        enableDebugLogs: true,
        chains,
        // rpc: {
        //   1: 'https://eth-mainnet.alchemyapi.io/v2/yourAlchemyId',
        // },
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: 'c1fecdaa2d99d3e07e8d35e697a3dc25',
      },
    }),
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: 'Injected',
    //     shimDisconnect: true,
    //   },
    // }),
  ],
  publicClient,
  webSocketPublicClient,
})