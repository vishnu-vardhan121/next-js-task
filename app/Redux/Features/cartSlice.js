import setFireStoreDoc from "@/firestore/setFireStoreDoc";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getFireStoreDoc from "@/firestore/getDocById";

export const AddToCarAction = createAsyncThunk(
  "cart/addtocart",
  async ({ userId, data }, thunkApi) => {
    try {
      const userDoc = await getFireStoreDoc("user", userId);
      const userCart = userDoc?.cart || [];
      const isAlreadyInCart = userCart.some((item) => item.id === data.id);
      if (isAlreadyInCart) {
        return thunkApi.rejectWithValue("Product is already in the cart.");
      }
      await setFireStoreDoc("user", userId, { cart: arrayUnion(data) });

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const removeFromCartAction = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, data }, thunkApi) => {
    try {
      await setFireStoreDoc("user", userId, { cart: arrayRemove(data) });
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  loading: false,
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cart = Array.isArray(action.payload) ? action.payload : [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddToCarAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddToCarAction.fulfilled, (state, action) => {
        state.loading = false;
        state.cart.push(action.payload);
      })

      .addCase(AddToCarAction.rejected, (state, action) => {
        state.loading = false;
        console.error("Error adding to cart:", action.payload);
      })
      .addCase(removeFromCartAction.fulfilled, (state, action) => {
        if (state.cart) {
          const index = state.cart.findIndex(
            (item) => item.id === action.payload.id
          );
          if (index !== -1) {
            state.cart.splice(index, 1);
          }
        }
      });
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
