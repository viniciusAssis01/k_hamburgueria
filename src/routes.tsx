import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ShopPage from "./pages/ShopPage";
import { ProtectedRoutes } from "./components/ProtectedRoutes";
import { CartProvider } from "./providers/CartContext";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/shop"
          element={
            <CartProvider>
              <ShopPage />
            </CartProvider>
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
