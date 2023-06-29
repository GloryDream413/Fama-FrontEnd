import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chainId: null,
  account: null,
  provider: null,
  signer: null,
  APP_CONTRACT: null,
};

export const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    changeChainId: (state, action) => {
      state.chainId = action.payload;
    },
    changeAccount: (state, action) => {
      state.account = action.payload;
    },
    changeProvider: (state, action) => {
      state.provider = action.payload;
    },
    changeSigner: (state, action) => {
      state.signer = action.payload;
    },
    privateInput: (state, action) => {
      state.privateInputValue = action.payload;
    },
    changeContract: (state, action) => {
      state.APP_CONTRACT = action.payload.APP_CONTRACT;
    },
  },
});

export const {
  changeAccount, changeChainId, changeProvider, changeContract, changeSigner, privateInput,
} =
  web3Slice.actions;
export default web3Slice.reducer;
