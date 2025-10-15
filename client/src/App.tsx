import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./home/_layout/HomePage";
import MenuPage from "./menu/_layout/MenuPage";
import ContactPage from "./contact/_layout/ContactPage";
import AboutPage from "./about/_layout/AboutPage";
import AdminPage from "./admin/_layout/AdminPage";
import NotFoundPage from "./notfound/_layout/NotFoundPage";
import LoginPage from "./account/login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
