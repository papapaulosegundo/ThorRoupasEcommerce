import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Form, Button, Card, InputGroup } from "react-bootstrap";
import "../../styles/index.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom"; // ⬅️ add useNavigate
import logo from "../../assets/logoSally.jpeg";

/** Substitua pelos seus arquivos reais */
import slide1 from "../../assets/infantil.jpeg";
import slide2 from "../../assets/masculino.jpeg";
import slide3 from "../../assets/feminina.jpg";

type LoginForm = { email: string; password: string };

export default function Login() {
  const [form, setForm] = useState<LoginForm>({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ⬅️ hook para navegar

  // imagens do slider
  const slides = useMemo(() => [slide1, slide2, slide3], []);
  const [idx, setIdx] = useState(0);

  // troca automática a cada 8s (respeita prefers-reduced-motion)
  useEffect(() => {
    const prefersReduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduce) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 8000);
    return () => clearInterval(t);
  }, [slides.length]);

  function handleChange<K extends keyof LoginForm>(k: K, v: LoginForm[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("login", form);
      // por enquanto só redireciona para a home
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container fluid className="auth-split p-0">
      <Row className="g-0 min-vh-100">
        {/* ESQUERDA ~40% com SLIDER */}
        <Col md={5} className="auth-left position-relative d-none d-md-block">
          <img src={logo} alt="Sally" className="auth-logo" />

          {/* Camada de slides cobrindo 100% */}
          <div className="auth-slides" aria-hidden="true">
            {slides.map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className={`auth-slide ${i === idx ? "is-active" : ""}`}
                loading={i === 0 ? "eager" : "lazy"}
              />
            ))}
          </div>

          {/* (opcional) indicadores */}
          <div className="auth-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`auth-dot ${i === idx ? "active" : ""}`}
                onClick={() => setIdx(i)}
                aria-label={`Ir para slide ${i + 1}`}
              />
            ))}
          </div>
        </Col>

        {/* DIREITA ~60% */}
        <Col xs={12} md={7} className="auth-right d-flex align-items-center justify-content-center">
          <Card className="auth-card auth-card-lg shadow-sm">
            <div className="mb-4 text-center">
              <h1 className="auth-title">Login</h1>
            </div>

            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="loginEmail">
                <Form.Label className="auth-label">Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  autoComplete="email"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="loginPassword">
                <Form.Label className="auth-label">Senha</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={show ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <Button
                    variant="outline-secondary"
                    className="auth-eye"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Ocultar senha" : "Mostrar senha"}
                    type="button"
                  >
                    {show ? <FiEyeOff /> : <FiEye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100 auth-btn" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <small>
                Não tem conta? <Link to="/register" className="auth-link">Cadastre-se</Link>
              </small>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
