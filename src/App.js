import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ChecProvider } from "./contexts/ChecContext";

import { Footer, Navbar } from "./components/index";

import {
  Carts,
  Checkout,
  LogIn,
  NotFound,
  Products,
  ProductView,
  Protected,
  Register,
  Reset,
} from "./Pages/index.js";

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
            <Route path="*" element={<NotFound />} />
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
