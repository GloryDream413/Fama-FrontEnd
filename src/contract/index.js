export { default as contractABI } from './contractAbi.json';
export const contractAddress = "0xcAF748eb46255f436Da323bcc406177a5f3D414b";
export const erc20ContractAddress = "0xB72Bb8CD764006641de1687b3e3C89957106F460";
export const lpTokenContractAddress = "0xE79CBD02b045c6CD26c69Cf3bc8D18678C1E2CaA";

import contractAbi2 from './contractAbi.json';
import tokenContract from './ABI_ERC20.json';
import lpTokenContractAbi from './lpTokenContractAbi.json';


export const wagmiContractConfig = { address: contractAddress, abi: contractAbi2 }
export const erc20Contract = { address: erc20ContractAddress, abi: tokenContract }
export const lpTokenContract = { address: lpTokenContractAddress, abi: lpTokenContractAbi }