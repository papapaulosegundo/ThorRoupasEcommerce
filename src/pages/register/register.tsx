// src/pages/Auth/Register.tsx
import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Form, Button, Card, InputGroup } from "react-bootstrap";
import "../../styles/index.css";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { signup } from "../../services/auth";

import logo from "../../assets/logoSally.jpeg";
import slide1 from "../../assets/masculino2.jpg";
import slide2 from "../../assets/feminina.jpg";
import slide3 from "../../assets/LookInfantil.jpeg";

type RegisterForm = {
  cpf: string;
  name: string;
  email: string;
  password: string;
  confirm: string;
};

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    cpf: "",
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const slides = useMemo(() => [slide1, slide2, slide3], []);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const prefersReduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduce) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 8000);
    return () => clearInterval(t);
  }, [slides.length]);

  function handleChange<K extends keyof RegisterForm>(k: K, v: RegisterForm[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  const err = (e: any) => e?.response?.data ?? e?.message ?? "Erro inesperado.";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // validações rápidas
    if (!/^\d{11}$/.test(form.cpf.replace(/\D/g, ""))) {
      Swal.fire("CPF inválido", "Informe 11 dígitos.", "warning");
      return;
    }
    if (form.password !== form.confirm) {
      Swal.fire("Atenção", "As senhas não coincidem.", "warning");
      return;
    }

    setLoading(true);
    try {
      await signup(form.cpf.replace(/\D/g, ""), form.name.trim(), form.email.trim(), form.password);
      await Swal.fire("Conta criada!", "Faça login para continuar.", "success");
      navigate("/login");
    } catch (e) {
      Swal.fire("Erro ao cadastrar", err(e), "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container fluid className="auth-split p-0">
      <Row className="g-0 min-vh-100">
        <Col md={5} className="auth-left position-relative d-none d-md-block">
          <img src={logo} alt="Sally" className="auth-logo" />
          <div className="auth-slides" aria-hidden="true">
            {slides.map((src, i) => (
              <img key={i} src={src} alt="" className={`auth-slide ${i === idx ? "is-active" : ""}`} loading={i === 0 ? "eager" : "lazy"} />
            ))}
          </div>
          <div className="auth-dots">
            {slides.map((_, i) => (
              <button key={i} className={`auth-dot ${i === idx ? "active" : ""}`} onClick={() => setIdx(i)} aria-label={`Ir para slide ${i + 1}`} />
            ))}
          </div>
        </Col>

        <Col xs={12} md={7} className="auth-right d-flex align-items-center justify-content-center">
          <Card className="auth-card auth-card-lg shadow-sm">
            <div className="mb-4 text-center">
              <h1 className="auth-title">Criar conta</h1>
            </div>

            <Form onSubmit={handleSubmit} noValidate>
              <Form.Group className="mb-3" controlId="registerCpf">
                <Form.Label className="auth-label">CPF</Form.Label>
                <Form.Control
                  type="text"
                  inputMode="numeric"
                  placeholder="Somente números"
                  value={form.cpf}
                  onChange={(e) => handleChange("cpf", e.target.value)}
                  required
                  autoComplete="off"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="registerName">
                <Form.Label className="auth-label">Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Seu nome"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  autoComplete="name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="registerEmail">
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

              <Form.Group className="mb-3" controlId="registerPassword">
                <Form.Label className="auth-label">Senha</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <Button
                    variant="outline-secondary"
                    className="auth-eye"
                    onClick={() => setShowPass((s) => !s)}
                    aria-label={showPass ? "Ocultar senha" : "Mostrar senha"}
                    type="button"
                  >
                    {showPass ? <FiEyeOff /> : <FiEye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-4" controlId="registerConfirm">
                <Form.Label className="auth-label">Confirmar senha</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={(e) => handleChange("confirm", e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <Button
                    variant="outline-secondary"
                    className="auth-eye"
                    onClick={() => setShowConfirm((s) => !s)}
                    aria-label={showConfirm ? "Ocultar confirmação" : "Mostrar confirmação"}
                    type="button"
                  >
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </Button>
                </InputGroup>
              </Form.Group>

              <Button variant="dark" type="submit" className="w-100 auth-btn" disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar-se"}
              </Button>
            </Form>

            <div className="text-center mt-3">
              <small>
                Já tem conta? <Link to="/login" className="auth-link">Entrar</Link>
              </small>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}