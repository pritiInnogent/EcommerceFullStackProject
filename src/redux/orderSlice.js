import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrders } from '../services/api';

// Async thunk to fetch orders from backend
export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async () => {
        const response = await getOrders();
        return response;
    }
);

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        loading: false,
        error: null,
    },
    reducers: {
        addOrder: (state, action) => {
            // Add order to local state immediately after creation
            state.orders.unshift(action.payload);
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload;
            const order = state.orders.find(order => order.id === orderId);
            if (order) {
                order.status = status;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { addOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
