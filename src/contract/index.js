export { default as contractABI } from './contractAbi.json';
export const contractAddress = "0x9b4668267E63D9fcECBDAF5734B565be5df8Bf0C";
export const erc20ContractAddress = "0xB72Bb8CD764006641de1687b3e3C89957106F460";
export const lpTokenContractAddress = "0xe2448621a1FD70dCCdf7811D92a8F6fa46d46B5F";

import contractAbi2 from './contractAbi.json';
import tokenContract from './ABI_ERC20.json';
import lpTokenContractAbi from './lpTokenContractAbi.json';


export const wagmiContractConfig = { address: contractAddress, abi: contractAbi2 }
export const erc20Contract = { address: erc20ContractAddress, abi: tokenContract }
export const lpTokenContract = { address: lpTokenContractAddress, abi: lpTokenContractAbi }