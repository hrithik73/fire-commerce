import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardPage from "./pages/CardPage";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import ProductInfoPage from "./pages/ProductInfoPage";
import RegisterPage from "./pages/RegisterPage";
import "./stylesheet/Product.css";
import "./stylesheet/Layout.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/cart" element={<CardPage />} />
        <Route path="/product/:id" element={<ProductInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;