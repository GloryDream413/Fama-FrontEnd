/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/named */
import { useMutation } from '@tanstack/react-query';
import { useSelectWeb3 } from '../useSelectWeb3';


export const useMutationDeposit = () => {
  const { account, APP_CONTRACT } = useSelectWeb3();
  // console.log({ APP_CONTRACT })

  const mutationFn = async () => {
    const tx = await APP_CONTRACT.deposit('0x78dEca24CBa286C0f8d56370f5406B48cFCE2f86', 10);

    return tx.wait();
  };

  return useMutation(mutationFn, {
    enabled: !!account,
    onError: (error) => {
      console.log(error);
    },
  });
};
