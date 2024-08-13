import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type Pizza = {
  category: number;
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
};

export type FetchParametrs = {
  categoryIs: string;
  search: string;
  pageUrl: string;
  sortUrl: string;
  orderUrl: string;
};

interface PizzaSliceState {
  items: Pizza[];
  loading: true | false;
}

export const fetchingPizza = createAsyncThunk<Pizza[], FetchParametrs>(
  "pizza/fetchPizza",
  async ({ categoryIs, search, pageUrl, sortUrl, orderUrl }) => {
    const { data } = await axios.get<Pizza[]>(
      `https://66bb41ef6a4ab5edd637c568.mockapi.io/items/pizzas?${pageUrl}&limit=4&${search}${categoryIs}&${sortUrl}&${orderUrl}`
    );
    return data;
  }
);

const initialState: PizzaSliceState = {
  items: [],
  loading: true,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchingPizza.pending, (state) => {
      state.loading = true;
      state.items = [];
    });
    builder.addCase(fetchingPizza.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchingPizza.rejected, (state) => {
      state.items = [];
      state.loading = true;
    });
  },
});

export default pizzaSlice.reducer;
