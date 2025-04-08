// src/redux/features/products/productSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TProduct } from '../../types/product';

interface IProductState {
  products: TProduct[];
  loading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  limit: number;
}

const initialState: IProductState = {
  products: [],
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
  limit: 10,
};

// Thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (queryParams: Record<string, string | number>, thunkAPI) => {
    try {
      const queryString = new URLSearchParams(queryParams as any).toString();
      const res = await axios.get(
        `/products?${queryString}`
      );
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.total = action.payload.meta.total;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { setPage, setLimit } = productSlice.actions;
export default productSlice.reducer;
