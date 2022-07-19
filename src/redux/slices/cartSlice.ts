import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type ItemsType = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

interface CartSliceState {
  count: number;
  totalPrice: number;
  items: ItemsType[];
}

const initialState: CartSliceState = {
  count: 0,
  totalPrice: 0,
  items: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ItemsType>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.count++;
      state.totalPrice += action.payload.price;
    },
    removeItem(state, action: PayloadAction<ItemsType>) {
      state.count -= action.payload.count;
      state.totalPrice -= action.payload.price * action.payload.count;
      const findItem = state.items.findIndex(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      state.items.splice(findItem, 1);
    },
    removeAll(state) {
      state.totalPrice = 0;
      state.items = [];
      state.count = 0;
    },
    itemPlus(state, action: PayloadAction<ItemsType>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );
      findItem && findItem.count++;
      state.count++;
      state.totalPrice += action.payload.price;
    },
    itemMinus(state, action: PayloadAction<ItemsType>) {
      const findItem = state.items.find(
        (obj) =>
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size,
      );

      findItem && findItem.count--;
      state.count--;
      state.totalPrice -= action.payload.price;
      if (findItem && findItem.count == 0) {
        state.items.splice(Number(findItem), 1);
      }
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export const { addItem, removeAll, removeItem, itemMinus, itemPlus } = cartSlice.actions;

export default cartSlice.reducer;
