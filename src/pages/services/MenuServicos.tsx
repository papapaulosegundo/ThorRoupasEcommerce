// src/pages/services/MenuServicos.tsx
import { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import "../../styles/index.css";
import { listarCategoriasAtivas, type Categoria } from "../../services/categoria";

export default function MenuServicos() {
    const [open, setOpen] = useState(false);
    const [cats, setCats] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(true);
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

  // Carrega as categorias
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await listarCategoriasAtivas(100, 0);
        if (alive) {
          console.log("[MenuServicos] categorias ativas:", data);
          setCats(data);
        }
      } catch (err) {
        console.error("[MenuServicos] falha ao listar categorias:", err);
        if (alive) setCats([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return (
    <li
      ref={wrapRef}
      className={`nav-item services-mega ${open ? "is-open" : ""}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="nav-link services-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
      >
        Serviços <span className="caret" aria-hidden>▾</span>
      </button>

      {/* painel */}
      <div className="services-panel" role="menu" aria-label="Serviços">
        <Container>
          <div className="panel-grid">
            {loading && (
              <div className="panel-empty">Carregando...</div>
            )}

            {!loading && cats.length === 0 && (
              <div className="panel-empty">Nenhuma categoria ativa</div>
            )}

            {!loading && cats.map((c) => (
              <NavLink
                key={c.id}
                to={`/servicos/${c.slug}`} 
                className="panel-item"
                role="menuitem"
              >
                <div className="p-content">
                  <h4 className="p-title">{c.nome}</h4>
                  {c.descricao && <small className="text-muted">{c.descricao}</small>}
                </div>
              </NavLink>
            ))}
          </div>
        </Container>
      </div>
    </li>
  );
}
