import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ChecProvider } from "./contexts/ChecContext";

import Footer from "./components/Footer.jsx";
import Navbar from "./components/Navbar.jsx";

import Carts from "./Pages/Carts.jsx";
import Checkout from "./Pages/Checkout.jsx";
import LogIn from "./Pages/Login.jsx";
import Products from "./Pages/Products.jsx";
import ProductView from "./Pages/ProductView.jsx";
import Protected from "./Pages/Protected";
import Register from "./Pages/Register";
import Reset from "./Pages/Reset";

import "./App.css";

function App() {
  return (
    <div className="App">
      <ChecProvider>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/ProductView/:id" element={<ProductView />} />
            <Route path="/cart" element={<Carts />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/reset" element={<Reset />} />
            <Route
              path="/checkout"
              element={
                <Protected>
                  <Checkout />
                </Protected>
              }
            />
          </Routes>
          <Footer />
        </AuthProvider>
      </ChecProvider>
    </div>
  );
}

export default App;
