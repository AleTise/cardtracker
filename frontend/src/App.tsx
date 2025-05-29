import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InfoPage from "./pages/InfoPage";
import GamesPage from "./pages/GamePage";
import ExpansionsPage from "./pages/ExpansionPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductsPage from "./pages/ProductPage";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/expansions" element={<ExpansionsPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;