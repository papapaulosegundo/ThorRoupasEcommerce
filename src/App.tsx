import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import './App.css'
import NavbarApp from "./components/navBar/NavBar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";

import Login from "./pages/login/login";
import Register from "./pages/register/register";
import CadastroFormulario from "./pages/services/OpcaoCadastro";
import RequireAdmin from "./components/RequireAdmin";
import Categorias from "./pages/services/Cadastro/Categorias";
import Produtos from "./pages/services/Cadastro/Produtos";
import CategoriaProdutosPage from "./pages/services/CategoriaProdutos";

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
        <Route path="/servicos/cadastros" element={<RequireAdmin> <CadastroFormulario /></RequireAdmin>}/>
        <Route path="/servicos/categorias" element={<RequireAdmin> <Categorias /></RequireAdmin>}/>
        <Route path="/servicos/produtos" element={<RequireAdmin> <Produtos /> </RequireAdmin>}/>
        <Route path="/servicos/:slug" element={<RequireAdmin> <CategoriaProdutosPage /> </RequireAdmin>} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!shouldHide && <Footer />}
    </>
  );
}
