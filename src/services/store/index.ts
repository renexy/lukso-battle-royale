import { configureStore } from '@reduxjs/toolkit';
import nftMintedSliceReducer from '../state/nftMintedSlice';

const store = configureStore({
  reducer: {
    nftMinted: nftMintedSliceReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;