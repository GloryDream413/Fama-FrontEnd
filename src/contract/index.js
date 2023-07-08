export { default as contractABI } from './contractAbi.json';
export const contractAddress = "0xDE37e20d496De2555C446E26575A8B8224F8e916";
export const erc20ContractAddress = "0xB72Bb8CD764006641de1687b3e3C89957106F460";
export const lpTokenContractAddress = "0x0EB66dC409bC3d774B928567d7dB4cD0F3280a9A";

import contractAbi2 from './contractAbi.json';
import tokenContract from './ABI_ERC20.json';
import lpTokenContractAbi from './lpTokenContractAbi.json';


export const wagmiContractConfig = { address: contractAddress, abi: contractAbi2 }
export const erc20Contract = { address: erc20ContractAddress, abi: tokenContract }
export const lpTokenContract = { address: lpTokenContractAddress, abi: lpTokenContractAbi }