import { useEffect, useMemo, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import { criarProduto } from "../../services/produto";
import { listarCategorias, type Categoria } from "../../services/categoria";
import "../../styles/index.css";

type FormState = {
  nome: string;
  descricao: string;
  imagem: string;
  precoView: string;
  precoCents: number;
  idCategoria: number | null;
  usarTamanho: boolean;
};

const initialState: FormState = {
  nome: "",
  descricao: "",
  imagem: "",
  precoView: "",
  precoCents: 0,
  idCategoria: null,
  usarTamanho: true, 
};

// helpers de moeda
const onlyDigits = (s: string) => s.replace(/\D/g, "");
const toBRL = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Produtos() {
  const [form, setForm] = useState<FormState>(initialState);
  const [cats, setCats] = useState<Categoria[]>([]);
  const [loadingCats, setLoadingCats] = useState(true);
  const [saving, setSaving] = useState(false);
  const [erroCats, setErroCats] = useState<string | null>(null);

  // carrega categorias (só as ativas; ajuste se quiser)
  useEffect(() => {
    (async () => {
      try {
        const data = await listarCategorias(100, 0);
        setCats(data);
      } catch (e: any) {
        setErroCats(e?.message ?? "Falha ao carregar categorias");
      } finally {
        setLoadingCats(false);
      }
    })();
  }, []);

  // preview elegante do preço
  const precoFormatado = useMemo(() => toBRL(form.precoCents), [form.precoCents]);

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((s) => ({ ...s, [k]: v }));
  }

  function handlePrecoChange(v: string) {
    const digits = onlyDigits(v);
    const cents = digits ? parseInt(digits, 10) : 0;
    setForm((s) => ({
      ...s,
      precoView: v,
      precoCents: cents,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // validações básicas
    if (!form.nome.trim() || form.nome.trim().length < 2) {
      Swal.fire("Ops!", "Informe um nome válido.", "warning");
      return;
    }
    if (!form.idCategoria) {
      Swal.fire("Ops!", "Escolha uma categoria.", "warning");
      return;
    }
    if (form.precoCents <= 0) {
      Swal.fire("Ops!", "Informe um preço maior que zero.", "warning");
      return;
    }

    const payload = {
      nome: form.nome.trim(),
      descricao: form.descricao.trim() || undefined,
      imagem: form.imagem.trim() || undefined,
      preco: form.precoCents,
      idCategoria: form.idCategoria,
      idTagTipo: form.usarTamanho ? 1 : null, // ajustar se usar outro TagTipo
    };

    try {
      setSaving(true);
      await criarProduto(payload);
      await Swal.fire("Pronto!", "Produto cadastrado com sucesso.", "success");
      setForm(initialState); // limpa
    } catch (err: any) {
      Swal.fire("Erro", err?.response?.data ?? err?.message ?? "Falha ao cadastrar", "error");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="home-sections">
      <Container>
        <header className="section-header text-center">
          <h2 className="section-heading">Cadastrar Produto</h2>
          <p className="text-muted mb-0">
            Preencha os dados do produto e escolha a categoria.
          </p>
        </header>

        <Row className="justify-content-center mt-4">
          <Col xs={12} md={10} lg={8}>
            <Card className="shadow-sm">
              <Card.Body>
                <Form onSubmit={handleSubmit} noValidate>
                  <Row className="g-3">
                    <Col md={8}>
                      <Form.Group controlId="prodNome">
                        <Form.Label>Nome *</Form.Label>
                        <Form.Control
                          value={form.nome}
                          onChange={(e) => set("nome", e.target.value)}
                          placeholder="Ex.: Camiseta Básica"
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="prodCategoria">
                        <Form.Label>Categoria *</Form.Label>
                        {loadingCats ? (
                          <div className="d-flex align-items-center gap-2">
                            <Spinner size="sm" /> <small>Carregando...</small>
                          </div>
                        ) : erroCats ? (
                          <Alert variant="danger" className="mb-0">
                            {erroCats}
                          </Alert>
                        ) : cats.length === 0 ? (
                          <Alert variant="secondary" className="mb-0">
                            Nenhuma categoria cadastrada. Crie uma primeiro.
                          </Alert>
                        ) : (
                          <Form.Select
                                value={form.idCategoria ?? ""}
                                onChange={(e) =>
                                  set("idCategoria", e.target.value ? Number(e.target.value) : null)
                                }
                                required
                              >
                                <option value="">Selecione...</option>
                                {cats.map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.nome}
                                  </option>
                                ))}
                            </Form.Select>
                        )}
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Group controlId="prodDescricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={form.descricao}
                          onChange={(e) => set("descricao", e.target.value)}
                          placeholder="Fale um pouco sobre o produto..."
                        />
                      </Form.Group>
                    </Col>

                    <Col md={8}>
                      <Form.Group controlId="prodImagem">
                        <Form.Label>URL da imagem</Form.Label>
                        <Form.Control
                          value={form.imagem}
                          onChange={(e) => set("imagem", e.target.value)}
                          placeholder="https://..."
                        />
                        {!!form.imagem && (
                          <div className="mt-2">
                            <img
                              src={form.imagem}
                              alt="Preview"
                              style={{ maxHeight: 140, borderRadius: 8 }}
                              onError={(e) => ((e.currentTarget.style.display = "none"))}
                            />
                          </div>
                        )}
                      </Form.Group>
                    </Col>

                    <Col md={4}>
                      <Form.Group controlId="prodPreco">
                        <Form.Label>Preço *</Form.Label>
                        <Form.Control
                          inputMode="numeric"
                          value={form.precoView}
                          onChange={(e) => handlePrecoChange(e.target.value)}
                          placeholder="49,90"
                          required
                        />
                        <Form.Text className="text-muted">
                          {form.precoCents > 0 ? `Prévia: ${precoFormatado}` : " "}{" "}
                        </Form.Text>
                      </Form.Group>
                    </Col>

                    <Col xs={12}>
                      <Form.Check
                        type="switch"
                        id="prodUsarTamanho"
                        label="Habilitar variação por tamanho (TagTipo 1)"
                        checked={form.usarTamanho}
                        onChange={(e) => set("usarTamanho", e.target.checked)}
                      />
                    </Col>

                    <Col xs={12} className="mt-2">
                      <div className="d-flex gap-2">
                        <Button type="submit" variant="dark" disabled={saving || loadingCats || cats.length === 0}>
                          {saving ? "Salvando..." : "Cadastrar produto"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline-secondary"
                          onClick={() => setForm(initialState)}
                          disabled={saving}
                        >
                          Limpar
                        </Button>
                      </div>
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