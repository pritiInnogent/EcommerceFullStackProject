import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
   console.error('Error fetching products:', error);
       throw new Error('Failed to fetch products. Please ensure the backend is running.');
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
       console.error('Error fetching product details:', error);
       throw new Error('Failed to fetch product details. Please ensure the backend is running.');
  }
};

export const getProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw new Error('Failed to fetch products by category. Please ensure the backend is running.');
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
     console.error('Error fetching categories:', error);
     throw new Error('Failed to fetch categories. Please ensure the backend is running.');
  }
};

// Promo Code API
export const validatePromoCode = async (code) => {
  try {
    const response = await api.post('/promo/validate', {code});
    return response.data;
  } catch (error) {
    console.error('Error validating promo code:', error);
    throw new Error(error.response?.data?.message || 'Invalid promo code');
  }
};

// Orders API
export const createOrder = async (orderData) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
   console.error('Error creating order:', error);
   throw new Error('Failed to create order. Please try again.');
  }
};

export const getOrders = async () => {
  try {
    const response = await api.get('/orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
};

export const cancelOrder = async (id) => {
    try {
        const response = await api.put(`/orders/cancel/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error cancelling order:', error);
        throw new Error('Failed to cancel order. Please try again.');
    }
};
export default api;
