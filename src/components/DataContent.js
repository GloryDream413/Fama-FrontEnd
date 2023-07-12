import { wagmiContractConfig } from '@/contract'
import { useContractRead } from 'wagmi'

export default function DataContent({drawdown}) {

  const { data: dataTotalVaultUSDC, error: idTotalVaultETH, isLoading: isTotalVaultETHLoading } =
  useContractRead({
    ...wagmiContractConfig,
    functionName: 'totalVaultUSDC',
    chainId: 5,
    watch: true
  })

  const { data: usdcPrice, error: errUSDCPrice, isLoading: isUSDCPriceLoading } =
  useContractRead({
    ...wagmiContractConfig,
    functionName: 'getUSDCUSDPrice',
    chainId: 5,
    watch: true
  })

  const { data: dataTotalVaultETH, error: idTotalVaultUSDC, isLoading: isTotalVaultUSDCLoading } =
  useContractRead({
    ...wagmiContractConfig,
    functionName: 'totalVaultEth',
    chainId: 5,
    watch: true
  })

  const { data: ethPrice, error: errETHPrice, isLoading: isETHPriceLoading } =
  useContractRead({
    ...wagmiContractConfig,
    functionName: 'getEthUSDPrice',
    chainId: 5,
    watch: true
  })

  const totalUSDCUSD = (Number(dataTotalVaultUSDC) /1000000) * (Number(usdcPrice) /100000000);
  const totalETHUSD = (Number(dataTotalVaultETH) / (10 ** 18)) * (Number(ethPrice) /100000000);
  const totalUSD = totalUSDCUSD + totalETHUSD;
  const percentageUsd = totalUSD / 50000 * 100
  return (
    <div className='grid grid-cols-2 gap-[25px] w-[100%] mt-[50px] md:grid-cols-4 md:mt-[36px] md:gap-[10px] md:pl-[30px] '>
        <p className='text-14 sm:text-16'>Vault Capacity:</p>
        <p className='text-14 sm:text-16'>$50,000</p>
        <p className='text-14 sm:text-16'>Average Drawdown:</p>
        <p className='text-14 sm:text-16'>{drawdown?.average_drawdown_rate}%</p>
        <p className='text-14 sm:text-16'>Vault Deposits:</p>
        <p className='text-14 sm:text-16'> ${`${totalUSD.toFixed(2)}`} ({percentageUsd.toFixed(2)}% capacity)</p>
        <p className='text-14 sm:text-16'>Avg. Drawdown Occurrence:</p>
        <p className='text-14 sm:text-16'>{drawdown?.average_drawdown_occurance} per month</p>
    </div>
  )
}
