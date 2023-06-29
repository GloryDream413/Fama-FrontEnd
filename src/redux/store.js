import { configureStore } from '@reduxjs/toolkit';

import web3Slice from './slice/web3';
import textEditor from './slice/editor';

const middleware = (getDefaultMiddleware) => {

  return [
    ...getDefaultMiddleware({
      serializableCheck: false,
    })
  ];
};

export const store = configureStore({
  reducer: {
    web3Slice,
    textEditor,
  },
  // preloadedState: {},
  middleware: (getDefaultMiddleware) => middleware(getDefaultMiddleware),
});
