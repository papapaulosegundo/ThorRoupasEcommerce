import { Routes, Route } from "react-router-dom";
import './App.css'
import NavbarApp from "./components/navBar/NavBar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Masculino from "./pages/services/Masculino";
import Feminino from "./pages/services/Feminino";
import Infantil from "./pages/services/Infantil";

/*
import AboutUs from "./pages/aboutUs/AboutUs";
import Portfolio from "./pages/portfolio/Portfolio";
*/

export default function App() {
  return (
    <>
      <NavbarApp/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contato" element={<Contact />} />
          {/* 
          <Route path="/sobre" element={<AboutUs />} />
          <Route path="/portfolio" element={<Portfolio />} />*/}
          <Route path="/servicos/masculino" element={<Masculino />} />
          <Route path="/servicos/feminino" element={<Feminino />} />
          <Route path="/servicos/infantil" element={<Infantil />} />

        </Routes>
      <Footer/>
    </>
  );
}
