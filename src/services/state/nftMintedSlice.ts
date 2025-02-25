import { createSlice } from "@reduxjs/toolkit";

export interface NftState {
  nftMinted: boolean;
  nftMintedImage: string | null;
}

const initialState: NftState = {
  nftMinted: false,
  nftMintedImage: null,
};

const nftMintedSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    setNftMinted: (state, action) => {
      state.nftMinted = action.payload;
    },
    setNftMintedImage: (state, action) => {
      state.nftMintedImage = action.payload;
    },
  },
});

export const { setNftMinted, setNftMintedImage } = nftMintedSlice.actions;

export default nftMintedSlice.reducer;
