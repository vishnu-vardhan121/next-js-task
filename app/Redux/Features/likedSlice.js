import getFireStoreDoc from "@/firestore/getDocById";
import setFireStoreDoc from "@/firestore/setFireStoreDoc";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToLikedAction = createAsyncThunk(
  "likes/addToLiked",
  async ({ userId, data }, thunkApi) => {
    const userDoc = await getFireStoreDoc("user", userId);
    const userLiked = userDoc?.liked || [];
    const isExists = userLiked.some((item) => item.id === data.id);

    if (isExists) {
      return thunkApi.rejectWithValue("Product already liked");
    }

    await setFireStoreDoc("user", userId, { liked: arrayUnion(data) });
    return data;
  }
);

export const removeLikeAction = createAsyncThunk(
  "likes/removeLike",
  async ({ userId, data }, thunkApi) => {
    await setFireStoreDoc("user", userId, {
      liked: arrayRemove(data),
    });
    return data;
  }
);

const initialState = {
  loading: false,
  liked: [],
};

const likedSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    setLiked: (state, action) => {
      state.liked = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToLikedAction.fulfilled, (state, action) => {
        state.loading = false;
        state.liked.push(action.payload);
      })
      .addCase(removeLikeAction.fulfilled, (state, action) => {
        state.loading = false;
        state.liked = state.liked.filter(
          (item) => item.id !== action.payload.id
        );
      });
  },
});

export const { setLiked } = likedSlice.actions;
export default likedSlice.reducer;
