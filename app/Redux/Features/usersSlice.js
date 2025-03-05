import { db } from "@/config/firebase";
import addFireStoreDoc from "@/firestore/add-doc";
import getAllFireStoreDocs from "@/firestore/getAllDocs";
import setFireStoreDoc from "@/firestore/setFireStoreDoc";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setCart } from "./cartSlice";
import { setLiked } from "./likedSlice";
import getFireStoreDoc from "@/firestore/getDocById";
import { setProducts } from "./productsSlice";

export const loginAction = createAsyncThunk(
  "user/login",
  async ({ email, password, type }, thunkAPI) => {
    try {
      const responesusers = await getAllFireStoreDocs("user");
      const responseadmins = await getAllFireStoreDocs("admin");

      const users = [...responesusers, ...responseadmins];
      const user = users.find((u) => u.user.email === email);
      console.log("loginAC", user);
      if (!user) {
        return thunkAPI.rejectWithValue("No user found");
      }

      if (type == "password" && user.user.password !== password) {
        return thunkAPI.rejectWithValue("Invalid password");
      }

      if (user.user.role == "admin") {
        console.log("admin");
        thunkAPI.dispatch(setProducts(user.products));
      } else if (user.role == "user") {
        thunkAPI.dispatch(setCart(user.cart));
        thunkAPI.dispatch(setLiked(user.liked));
      }
      return { ...user.user, id: user.id };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const signinAction = createAsyncThunk(
  "user/signin",
  async ({ data, email }, thunkAPI) => {
    try {
      const existingUser = await getFireStoreDoc("user", email);

      if (existingUser) {
        return thunkAPI.rejectWithValue("User already exists!");
      }

      const userId = await setFireStoreDoc(data.role, email, { user: data });
      return { id: userId, ...data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logOutAction = createAsyncThunk("user/logout", async () => {
  return null;
});

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signinAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinAction.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signinAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logOutAction.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default usersSlice.reducer;
