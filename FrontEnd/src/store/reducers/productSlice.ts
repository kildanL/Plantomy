
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TProduct } from "../../types";

interface ProductState {
    products: TProduct[];
    isLoading: boolean;
    error: string;
}

const initialState: ProductState = {
    products: [],
    isLoading: true,
    error: ""
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        ProductsFetching(state) {
            state.isLoading = true;
        },
        ProductsFetchingSuccess(state, action: PayloadAction<TProduct[]>) {
            state.isLoading = false;
            state.products = action.payload;
        },
        ProductsFetchingError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
})

export const ProductReducer = productSlice.reducer;