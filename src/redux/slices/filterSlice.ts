import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SetFiltersPayload = {
  category: number;
  sortBy: 'rating' | 'price' | 'alphabetic';
  order: 'asc' | 'desc';
  search: string;
  page: string;
};

type SortType = {
  id: number;
  sortType: 'rating' | 'price' | 'alphabetic';
};

interface FilterSliceState {
  pagination: number;
  search: string;
  order: 'desc' | 'asc';
  categoryId: number;
  sort: SortType;
}

const initialState: FilterSliceState = {
  pagination: 1,
  search: '',
  order: 'desc',
  categoryId: 0,
  sort: {
    id: 0,
    sortType: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    changeCategory(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    changeSortType(
      state,
      action: PayloadAction<{ id: number; sortType: 'rating' | 'price' | 'alphabetic' }>,
    ) {
      state.sort.id = action.payload.id;
      state.sort.sortType = action.payload.sortType;
    },
    changePage(state, action: PayloadAction<number>) {
      state.pagination = action.payload;
    },
    setFilters(state, action: PayloadAction<SetFiltersPayload>) {
      state.categoryId = Number(action.payload.category);
      state.sort.sortType = action.payload.sortBy;
      state.order = action.payload.order;
      state.search = action.payload.search;
      state.pagination = Number(action.payload.page);
    },
    setOrder(state, action: PayloadAction<string>) {
      if (action.payload == 'desc') {
        state.order = 'asc';
      } else state.order = 'desc';
    },
  },
});

export const { changeCategory, changeSortType, setFilters, setOrder, setSearchValue, changePage } =
  filterSlice.actions;

export default filterSlice.reducer;
