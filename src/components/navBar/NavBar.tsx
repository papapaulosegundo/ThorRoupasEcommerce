import { useEffect, useState } from "react";
import { Container, Nav, Navbar} from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/index.css";
import logoImage from "../../assets/Preview.png";
import MenuServicos from "../../pages/services/MenuServicos";

export default function NavbarApp() {
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Navbar
      expand="lg"
      className={`navbar-hero sticky-top ${shrink ? "navbar-shrink shadow-sm" : ""}`}
      data-bs-theme="dark"
    >
      <Container className="justify-content-between">
        {/* Quando usar router, troque href="/" por: as={Link} to="/" */}
        <Navbar.Brand as={Link} to="/" aria-label="Ir para a Home" className="brand">
          <span className="brand-badge">
            <img src={logoImage} alt="Thor Inc" />
          </span>
          {/** 
          <span className="brand-title">Thor</span>
          */}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav" className="justify-content-end">
          <Nav className="pillMenu">
            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
            <MenuServicos/>
            <Nav.Link as={NavLink} to="/portfolio">Portfólio</Nav.Link>
            <Nav.Link as={NavLink} to="/sobre">Sobre Nós</Nav.Link>
            <Nav.Link as={NavLink} to="/contato">Contato</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}