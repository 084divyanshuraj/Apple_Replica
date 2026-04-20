import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'apple_store.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database');
  }
});

const initializeDatabase = () => {
  db.serialize(() => {
    // Create Users Table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        phone TEXT,
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create Products Table
    db.run(`
      CREATE TABLE IF NOT EXISTS products (
        product_id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_name TEXT NOT NULL,
        category TEXT,
        price REAL,
        stock INTEGER,
        release_date DATE,
        description TEXT
      )
    `);

    // Create Orders Table
    db.run(`
      CREATE TABLE IF NOT EXISTS orders (
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        total_amount REAL,
        status TEXT,
        FOREIGN KEY (user_id) REFERENCES users(user_id)
      )
    `);

    // Create Order Items Table
    db.run(`
      CREATE TABLE IF NOT EXISTS order_items (
        order_item_id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        product_id INTEGER,
        quantity INTEGER,
        price REAL,
        FOREIGN KEY (order_id) REFERENCES orders(order_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
      )
    `);

    // Create Reviews Table
    db.run(`
      CREATE TABLE IF NOT EXISTS reviews (
        review_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        product_id INTEGER,
        rating INTEGER,
        comment TEXT,
        review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id),
        FOREIGN KEY (product_id) REFERENCES products(product_id)
      )
    `);

    // Create Payments Table
    db.run(`
      CREATE TABLE IF NOT EXISTS payments (
        payment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        payment_method TEXT,
        payment_status TEXT,
        payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(order_id)
      )
    `);

    // Create Shipping Table
    db.run(`
      CREATE TABLE IF NOT EXISTS shipping (
        shipping_id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        shipping_address TEXT,
        shipping_status TEXT,
        shipped_date DATE,
        delivery_date DATE,
        FOREIGN KEY (order_id) REFERENCES orders(order_id)
      )
    `);

    // Insert sample data
    insertSampleData();
  });
};

const insertSampleData = () => {
  // Check if data already exists
  db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
    if (err) return;
    
    if (row.count === 0) {
      // Insert Users
      db.run(
        `INSERT INTO users (full_name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)`,
        ['Rahul Kumar', 'rahul@gmail.com', 'pass123', '9876543210', 'Delhi']
      );
      db.run(
        `INSERT INTO users (full_name, email, password, phone, address) VALUES (?, ?, ?, ?, ?)`,
        ['Priya Sharma', 'priya@gmail.com', 'pass456', '9876543211', 'Mumbai']
      );

      // Insert Products
      db.run(
        `INSERT INTO products (product_name, category, price, stock, release_date, description) VALUES (?, ?, ?, ?, ?, ?)`,
        ['iPhone 15', 'iPhone', 799.00, 100, '2023-09-22', 'Latest iPhone model']
      );
      db.run(
        `INSERT INTO products (product_name, category, price, stock, release_date, description) VALUES (?, ?, ?, ?, ?, ?)`,
        ['MacBook Air M3', 'Mac', 1199.00, 50, '2024-03-08', 'Lightweight Apple laptop']
      );
      db.run(
        `INSERT INTO products (product_name, category, price, stock, release_date, description) VALUES (?, ?, ?, ?, ?, ?)`,
        ['iPad Pro', 'iPad', 999.00, 60, '2024-05-15', 'Powerful Apple tablet']
      );
      db.run(
        `INSERT INTO products (product_name, category, price, stock, release_date, description) VALUES (?, ?, ?, ?, ?, ?)`,
        ['Apple Watch Series 9', 'Watch', 399.00, 80, '2024-09-18', 'Advanced health monitoring watch']
      );
      db.run(
        `INSERT INTO products (product_name, category, price, stock, release_date, description) VALUES (?, ?, ?, ?, ?, ?)`,
        ['AirPods Pro', 'AirPods', 249.00, 150, '2024-09-12', 'Noise-canceling wireless earbuds']
      );

      // Insert Orders
      db.run(
        `INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)`,
        [1, 799.00, 'Completed']
      );
      db.run(
        `INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)`,
        [2, 1199.00, 'Pending']
      );

      // Insert Order Items
      db.run(
        `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
        [1, 1, 1, 799.00]
      );
      db.run(
        `INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)`,
        [2, 2, 1, 1199.00]
      );

      // Insert Reviews
      db.run(
        `INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)`,
        [1, 1, 5, 'Amazing phone']
      );
      db.run(
        `INSERT INTO reviews (user_id, product_id, rating, comment) VALUES (?, ?, ?, ?)`,
        [2, 2, 4, 'Great laptop']
      );

      // Insert Payments
      db.run(
        `INSERT INTO payments (order_id, payment_method, payment_status) VALUES (?, ?, ?)`,
        [1, 'Credit Card', 'Paid']
      );
      db.run(
        `INSERT INTO payments (order_id, payment_method, payment_status) VALUES (?, ?, ?)`,
        [2, 'UPI', 'Pending']
      );

      // Insert Shipping
      db.run(
        `INSERT INTO shipping (order_id, shipping_address, shipping_status, shipped_date, delivery_date) VALUES (?, ?, ?, ?, ?)`,
        [1, 'Delhi', 'Delivered', '2024-06-01', '2024-06-05']
      );
      db.run(
        `INSERT INTO shipping (order_id, shipping_address, shipping_status, shipped_date, delivery_date) VALUES (?, ?, ?, ?, ?)`,
        [2, 'Mumbai', 'Processing', null, null]
      );

      console.log('Sample data inserted');
    }
  });
};

export { db, initializeDatabase };
