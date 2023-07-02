/* eslint-disable import/named */
import { useQuery } from '@tanstack/react-query';

import { useSelectWeb3 } from '../useSelectWeb3';
import { queryKeys } from './queryConstants';
import axios from 'axios';

// const queryFn = async () => {
//   const backEndData = await fetch('http://127.0.0.1:5000/')
//   console.log({backEndData})
//   // return backEndData
// };

// queryFn()

export const useQueryGetUserInfo = () => {
  const queryKey = [queryKeys.getBackendData];

  const queryFn = async () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/get-data',
      headers: {},
      timeout: 120000,
    };

    const tx = axios.request(config)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    return tx
  };

  return useQuery(queryKey, queryFn, {
    refetchOnWindowFocus: false,
    enabled: false,
    onError: (error) => {
      console.log(error);
    },
  });
};