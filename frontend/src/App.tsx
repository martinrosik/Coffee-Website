import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./home/_layout/HomePage";
import MenuPage from "./menu/_layout/MenuPage";
import ContactPage from "./contact/_layout/ContactPage";
import AboutPage from "./about/_layout/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
