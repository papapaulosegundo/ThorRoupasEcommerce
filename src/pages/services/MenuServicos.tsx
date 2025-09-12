import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { FaShoppingCart, FaGlobe } from "react-icons/fa";
import "../../styles/index.css";

export default function MenuServicos() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement | null>(null);
  const { pathname } = useLocation();

  // fecha ao navegar
  useEffect(() => { setOpen(false); }, [pathname]);

  // fecha no ESC e clique fora
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <li
      ref={wrapRef} className={`nav-item services-mega ${open ? "is-open" : ""}`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} >

      <button className="nav-link services-trigger" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((v) => !v)} onFocus={() => setOpen(true)}>
          Serviços <span className="caret" aria-hidden>▾</span>
      </button>

      {/* painel */}
      <div className="services-panel" role="menu" aria-label="Serviços">
        <Container>
          <div className="panel-grid">
            <NavLink to="/servicos/ecommerce" className="panel-item" role="menuitem">
              <div className="p-icon"><FaShoppingCart /></div>
              <div className="p-content">
                <h4 className="p-title">E-commerce</h4>
                <p className="p-desc">Desenvolviemnto de lojas online e modernas para aumentar suas vendas.</p>
              </div>
            </NavLink>

            <NavLink to="/servicos/websites" className="panel-item" role="menuitem">
              <div className="p-icon"><FaGlobe /></div>
              <div className="p-content">
                <h4 className="p-title">Websites</h4>
                <p className="p-desc">Sites profissionais para garantir um destaque para sua marca.</p>
              </div>
            </NavLink>
          </div>
        </Container>
      </div>
    </li>
  );
}
