import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'db.json');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper functions to read/write JSON database
const readDB = () => {
  try {
    const data = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return {};
  }
};

const writeDB = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing database:', error);
    return false;
  }
};

// =====================
// PRODUCTS ROUTES
// =====================
app.get('/api/products', (req, res) => {
  const db = readDB();
  res.json(db.products || []);
});

app.get('/api/products/:id', (req, res) => {
  const db = readDB();
  const product = db.products.find(p => p.product_id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.get('/api/products/category/:category', (req, res) => {
  const db = readDB();
  const products = db.products.filter(p => p.category === req.params.category);
  res.json(products);
});

// =====================
// USERS ROUTES
// =====================
app.get('/api/users', (req, res) => {
  const db = readDB();
  const users = db.users.map(u => ({
    user_id: u.user_id,
    full_name: u.full_name,
    email: u.email,
    phone: u.phone,
    address: u.address,
    created_at: u.created_at
  }));
  res.json(users);
});

app.post('/api/users/register', (req, res) => {
  const { full_name, email, password, phone, address } = req.body;
  
  if (!full_name || !email || !password) {
    return res.status(400).json({ error: 'Required fields missing' });
  }
  
  const db = readDB();
  const userExists = db.users.some(u => u.email === email);
  if (userExists) return res.status(409).json({ error: 'Email already exists' });
  
  const newUser = {
    user_id: Math.max(...db.users.map(u => u.user_id), 0) + 1,
    full_name,
    email,
    password,
    phone,
    address,
    created_at: new Date().toISOString()
  };
  
  db.users.push(newUser);
  writeDB(db);
  res.json({ user_id: newUser.user_id, full_name, email });
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.email === email && u.password === password);
  
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  res.json({ user_id: user.user_id, full_name: user.full_name, email: user.email });
});

// =====================
// ORDERS ROUTES
// =====================
app.get('/api/orders', (req, res) => {
  const db = readDB();
  res.json(db.orders || []);
});

app.get('/api/orders/:id', (req, res) => {
  const db = readDB();
  const order = db.orders.find(o => o.order_id === parseInt(req.params.id));
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

app.get('/api/orders/user/:userId', (req, res) => {
  const db = readDB();
  const orders = db.orders.filter(o => o.user_id === parseInt(req.params.userId));
  res.json(orders);
});

app.post('/api/orders', (req, res) => {
  const { user_id, total_amount, status } = req.body;
  const db = readDB();
  
  const newOrder = {
    order_id: Math.max(...db.orders.map(o => o.order_id), 0) + 1,
    user_id,
    order_date: new Date().toISOString(),
    total_amount,
    status: status || 'Pending'
  };
  
  db.orders.push(newOrder);
  writeDB(db);
  res.json({ order_id: newOrder.order_id });
});

// =====================
// ORDER ITEMS ROUTES
// =====================
app.get('/api/order-items/:orderId', (req, res) => {
  const db = readDB();
  const items = db.order_items.filter(oi => oi.order_id === parseInt(req.params.orderId));
  res.json(items);
});

app.post('/api/order-items', (req, res) => {
  const { order_id, product_id, quantity, price } = req.body;
  const db = readDB();
  
  const newItem = {
    order_item_id: Math.max(...db.order_items.map(oi => oi.order_item_id), 0) + 1,
    order_id,
    product_id,
    quantity,
    price
  };
  
  db.order_items.push(newItem);
  writeDB(db);
  res.json({ order_item_id: newItem.order_item_id });
});

// =====================
// REVIEWS ROUTES
// =====================
app.get('/api/reviews/product/:productId', (req, res) => {
  const db = readDB();
  const reviews = db.reviews
    .filter(r => r.product_id === parseInt(req.params.productId))
    .map(r => {
      const user = db.users.find(u => u.user_id === r.user_id);
      return { ...r, full_name: user?.full_name };
    });
  res.json(reviews);
});

app.post('/api/reviews', (req, res) => {
  const { user_id, product_id, rating, comment } = req.body;
  const db = readDB();
  
  const newReview = {
    review_id: Math.max(...db.reviews.map(r => r.review_id), 0) + 1,
    user_id,
    product_id,
    rating,
    comment,
    review_date: new Date().toISOString()
  };
  
  db.reviews.push(newReview);
  writeDB(db);
  res.json({ review_id: newReview.review_id });
});

// =====================
// PAYMENTS ROUTES
// =====================
app.get('/api/payments/order/:orderId', (req, res) => {
  const db = readDB();
  const payment = db.payments.find(p => p.order_id === parseInt(req.params.orderId));
  if (!payment) return res.status(404).json({ error: 'Payment not found' });
  res.json(payment);
});

app.post('/api/payments', (req, res) => {
  const { order_id, payment_method, payment_status } = req.body;
  const db = readDB();
  
  const newPayment = {
    payment_id: Math.max(...db.payments.map(p => p.payment_id), 0) + 1,
    order_id,
    payment_method,
    payment_status: payment_status || 'Pending',
    payment_date: new Date().toISOString()
  };
  
  db.payments.push(newPayment);
  writeDB(db);
  res.json({ payment_id: newPayment.payment_id });
});

// =====================
// SHIPPING ROUTES
// =====================
app.get('/api/shipping/order/:orderId', (req, res) => {
  const db = readDB();
  const shipping = db.shipping.find(s => s.order_id === parseInt(req.params.orderId));
  if (!shipping) return res.status(404).json({ error: 'Shipping not found' });
  res.json(shipping);
});

app.post('/api/shipping', (req, res) => {
  const { order_id, shipping_address, shipping_status } = req.body;
  const db = readDB();
  
  const newShipping = {
    shipping_id: Math.max(...db.shipping.map(s => s.shipping_id), 0) + 1,
    order_id,
    shipping_address,
    shipping_status: shipping_status || 'Processing',
    shipped_date: null,
    delivery_date: null
  };
  
  db.shipping.push(newShipping);
  writeDB(db);
  res.json({ shipping_id: newShipping.shipping_id });
});

// =====================
// HEALTH CHECK
// =====================
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend server is running' });
});

app.listen(PORT, () => {
  console.log(`\n✓ Backend server running on http://localhost:${PORT}`);
  console.log('✓ Database file: db.json\n');
});
