/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/named */
import { useMutation } from '@tanstack/react-query';
import { useSelectWeb3 } from '../useSelectWeb3';


export const useMutationDeposit = () => {
  const { account, APP_CONTRACT } = useSelectWeb3();
  // console.log({ APP_CONTRACT })

  const mutationFn = async () => {
    const tx = await APP_CONTRACT.deposit('0xB72Bb8CD764006641de1687b3e3C89957106F460', 10);
    return tx.wait();
  };

  return useMutation(mutationFn, {
    enabled: !!account,
    onError: (error) => {
      console.log(error);
    },
  });
};
