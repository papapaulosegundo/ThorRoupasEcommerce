// src/components/navBar/index.tsx
import { useEffect, useState } from "react";
import { Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../../styles/index.css";
import logoImage from "../../assets/logoSally.jpeg";
import MenuServicos from "../../pages/services/MenuServicos";
import { FiUser } from "react-icons/fi";
import { logout as doLogout } from "../../services/auth";

type UserLite = { id: number; nome: string; email: string; tipo?: string };

export default function NavbarApp() {
  const [shrink, setShrink] = useState(false);
  const [user, setUser] = useState<UserLite | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Atualiza quando rota muda OU quando disparamos 'auth:changed'
  useEffect(() => {
    const read = () => {
      try { setUser(JSON.parse(localStorage.getItem("user") || "null")); }
      catch { setUser(null); }
    };
    read();
    window.addEventListener("auth:changed", read as any);
    return () => window.removeEventListener("auth:changed", read as any);
  }, [location]);

  function handleLogout() {
    doLogout();
    navigate("/"); 
  }

  return (
    <Navbar
      expand="lg"
      className={`navbar-hero sticky-top ${shrink ? "navbar-shrink shadow-sm" : ""}`}
      data-bs-theme="dark"
    >
      <Container className="justify-content-between">
        <Navbar.Brand as={Link} to="/" aria-label="Ir para a Home" className="brand">
          <span className="brand-badge">
            <img src={logoImage} alt="Thor Inc" />
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav" className="justify-content-end">
          <Nav className="pillMenu">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <MenuServicos />
            
            {user?.tipo === "admin" && (
              <Nav.Link as={NavLink} to="/servicos/cadastros">
                Cadastros
              </Nav.Link>
            )}

            <Nav.Link as={NavLink} to="/contato">Contato</Nav.Link>

            {!user ? (
              <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle as="a" className="nav-link p-0 d-flex align-items-center" role="button">
                  <FiUser size={20} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Header>{user.nome}</Dropdown.Header>
                    <Dropdown.Item as={Link} to="/conta">Minha conta</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Sair</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
