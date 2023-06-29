import { useDispatch } from 'react-redux';

import { changeAccount, changeChainId, changeProvider } from '@/redux/slice/web3';

function useWeb3SubscribeProvider() {
  const dispatch = useDispatch();

  const resetAll = () => {
    dispatch(changeChainId(null));
    dispatch(changeAccount(null));
    dispatch(changeProvider(null));
  };

  return {
    resetAll,
  };
}

export default useWeb3SubscribeProvider;
