// src/pages/services/Categorias.tsx
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import { criarCategoria } from "../../../services/categoria";
import type { Categoria } from "../../../services/categoria";
import Swal from "sweetalert2";
import "../../../styles/index.css";

// gera slug a partir do nome
function slugify(s: string) {
  return s
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type FormState = {
  nome: string;
  slug: string;
  descricao: string;
  ativo: boolean;
};

export default function Categorias() {
  const [form, setForm] = useState<FormState>({
    nome: "",
    slug: "",
    descricao: "",
    ativo: true,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Atualiza o slug quando o nome muda (sem sobreescrever se o usuário editar manualmente)
  useEffect(() => {
    if (!form.slug || form.slug === slugify(form.nome)) {
      setForm((s) => ({ ...s, slug: slugify(s.nome) }));
    }
  }, [form.nome]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as any;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((s) => ({ ...s, [name]: val }));
  };

  const isValid = form.nome.trim().length > 0 && form.slug.trim().length > 0;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    setSaving(true);
    setError(null);
    try {
      const payload: Categoria = {
        nome: form.nome.trim(),
        slug: form.slug.trim(),
        descricao: form.descricao.trim() || undefined,
        ativo: form.ativo,
      };

      await criarCategoria(payload);

      Swal.fire({
        icon: "success",
        title: "Categoria criada!",
        text: "A categoria foi salva com sucesso.",
        timer: 1800,
        showConfirmButton: false,
      });

      setForm({ nome: "", slug: "", descricao: "", ativo: true });
    } catch (err: any) {
      setError(err?.response?.data ?? err?.message ?? "Erro ao salvar categoria.");
      Swal.fire({ icon: "error", title: "Erro", text: error ?? "Falha ao salvar." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="home-sections">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div>
                    <h2 className="h4 mb-1">Nova Categoria</h2>
                    <small className="text-muted">
                      Preencha as informações para adicionar uma categoria.
                    </small>
                  </div>
                </div>

                {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

                <Form onSubmit={onSubmit} noValidate>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Group controlId="catNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                          type="text"
                          name="nome"
                          placeholder="Ex.: Camisetas"
                          value={form.nome}
                          onChange={handleChange}
                          required
                          isInvalid={!form.nome.trim()}
                        />
                        <Form.Control.Feedback type="invalid">
                          Informe o nome.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group controlId="catSlug">
                        <Form.Label>Slug</Form.Label>
                        <Form.Control
                          type="text"
                          name="slug"
                          placeholder="ex.: camisetas"
                          value={form.slug}
                          onChange={handleChange}
                          required
                          isInvalid={!form.slug.trim()}
                        />
                        <Form.Text className="text-muted">
                          Usado na URL (somente letras, números e hífens).
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                          Informe o slug.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group controlId="catDescricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="descricao"
                          placeholder="Descrição opcional da categoria…"
                          value={form.descricao}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Check
                        type="switch"
                        id="catAtivo"
                        name="ativo"
                        label="Ativo"
                        checked={form.ativo}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col xs={12} className="d-flex gap-2">
                      <Button type="submit" variant="dark" disabled={!isValid || saving}>
                        {saving ? (<><Spinner size="sm" className="me-2" /> Salvando…</>) : "Salvar"}
                      </Button>
                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => setForm({ nome: "", slug: "", descricao: "", ativo: true })}
                        disabled={saving}
                      >
                        Limpar
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
