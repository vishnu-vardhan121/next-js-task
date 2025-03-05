import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import setFireStoreDoc from "@/firestore/setFireStoreDoc";
import { arrayUnion } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const AddProductAction = createAsyncThunk(
  "products/addProduct",
  async ({ data, userId }, thunkAPI) => {
    try {
      const productId = uuidv4();
      await setFireStoreDoc("admin", userId, {
        products: {
          [`${data.category}`]: arrayUnion({ ...data, id: productId }),
        },
      });
      console.log(data);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const initialState = {
  products: {},
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log(action.payload);

      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddProductAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(AddProductAction.fulfilled, (state, action) => {
        state.loading = false;

        const { category } = action.payload; // Extract category

        // Ensure `state.products` is an object
        if (!state.products) {
          state.products = {}; // Initialize if undefined
        }

        // Ensure `state.products[category]` is an array
        if (!Array.isArray(state.products[category])) {
          state.products[category] = []; // Initialize category array if it does not exist
        }

        // Add the new product to the correct category array
        state.products[category].push(action.payload);
      })
      .addCase(AddProductAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
