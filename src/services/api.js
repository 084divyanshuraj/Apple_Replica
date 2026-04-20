const API_URL = 'http://localhost:5000/api';

// Products API
export const getProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  return response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`${API_URL}/products/${id}`);
  return response.json();
};

export const getProductsByCategory = async (category) => {
  const response = await fetch(`${API_URL}/products/category/${category}`);
  return response.json();
};

// Users API
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

// Orders API
export const createOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return response.json();
};

export const getUserOrders = async (userId) => {
  const response = await fetch(`${API_URL}/orders/user/${userId}`);
  return response.json();
};

// Order Items API
export const addOrderItem = async (itemData) => {
  const response = await fetch(`${API_URL}/order-items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(itemData),
  });
  return response.json();
};

export const getOrderItems = async (orderId) => {
  const response = await fetch(`${API_URL}/order-items/${orderId}`);
  return response.json();
};

// Reviews API
export const getProductReviews = async (productId) => {
  const response = await fetch(`${API_URL}/reviews/product/${productId}`);
  return response.json();
};

export const createReview = async (reviewData) => {
  const response = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(reviewData),
  });
  return response.json();
};

// Payments API
export const createPayment = async (paymentData) => {
  const response = await fetch(`${API_URL}/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData),
  });
  return response.json();
};

// Shipping API
export const createShipping = async (shippingData) => {
  const response = await fetch(`${API_URL}/shipping`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shippingData),
  });
  return response.json();
};
