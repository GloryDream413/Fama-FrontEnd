import { wagmiContractConfig } from '@/contract'
import { useContractRead } from 'wagmi'

export default function DataContent({drawdown}) {

  const { data: dataTotalVaultUSDC, error: idTotalVaultETH, isLoading: isTotalVaultETHLoading } =
  useContractRead({
    ...wagmiContractConfig,
    functionName: 'totalVaultUSDC',
    chainId: 5,
  })

  const totalUSDC = Number(dataTotalVaultUSDC) /1000000;
  const percentageUsdc = totalUSDC / 50000 * 100
  // console.log({totalUSDC})

  return (
    <div className='grid grid-cols-2 gap-[25px] w-[100%] mt-[50px] md:grid-cols-4 md:mt-[36px] md:gap-[10px] md:pl-[30px] '>
        <p className='text-14 sm:text-16'>Vault Capacity:</p>
        <p className='text-14 sm:text-16'>$50,000</p>
        <p className='text-14 sm:text-16'>Average Drawdown:</p>
        <p className='text-14 sm:text-16'>{drawdown?.average_drawdown_rate || 0}%</p>
        <p className='text-14 sm:text-16'>Vault Deposits:</p>
        <p className='text-14 sm:text-16'> ${`${totalUSDC.toFixed(2)}`} ({percentageUsdc.toFixed(2)}% capacity)</p>
        <p className='text-14 sm:text-16'>Avg. Drawdown Occurrence:</p>
        <p className='text-14 sm:text-16'>{drawdown?.average_drawdown_occurance || 0} per month</p>
    </div>
  )
}
