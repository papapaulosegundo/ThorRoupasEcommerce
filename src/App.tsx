import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import './App.css'
import NavbarApp from "./components/navBar/NavBar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";

import Masculino from "./pages/services/Masculino";
import Feminino from "./pages/services/Feminino";
import Infantil from "./pages/services/Infantil";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

export default function App() {
    const { pathname } = useLocation();
    const hideChrome = ["/login" , "/register" ];
    const shouldHide = hideChrome.includes(pathname);

 return (
    <>
      {!shouldHide && <NavbarApp />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/servicos/masculino" element={<Masculino />} />
        <Route path="/servicos/feminino" element={<Feminino />} />
        <Route path="/servicos/infantil" element={<Infantil />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!shouldHide && <Footer />}
    </>
  );
}
