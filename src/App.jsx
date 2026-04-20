import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Checkout from './pages/Checkout';
import ReviewsPage from './pages/ReviewsPage';

// Pages
import Home from './pages/Home';
import Store from './pages/Store';
import Mac from './pages/Mac';
import IPhone from './pages/IPhone';
import AirPods from './pages/AirPods';
import IPad from './pages/IPad';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="app-container">
            <Header />
            <CartDrawer />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/store" element={<Store />} />
                <Route path="/mac" element={<Mac />} />
                <Route path="/iphone" element={<IPhone />} />
                <Route path="/airpods" element={<AirPods />} />
                <Route path="/ipad" element={<IPad />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/reviews" element={<ReviewsPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
