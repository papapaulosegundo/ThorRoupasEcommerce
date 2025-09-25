import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner, Alert, Form } from "react-bootstrap";
import { api } from "../../services/api";
import { obterCategoriaPorSlug, type Categoria } from "../../services/categoria";
import type { Produto } from "../../types";
import "../../styles/index.css";

const toBRL = (cents: number) =>
  (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function CategoriaProdutosPage() {
  const { slug } = useParams<{ slug: string }>();

  const [cat, setCat] = useState<Categoria | null>(null);
  const [items, setItems] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [sizeByProduct, setSizeByProduct] = useState<Record<number, number | "">>({});

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setError(null);
      setItems([]);
      setCat(null);

      try {
        if (!slug) throw new Error("Categoria inválida.");
        const categoria = await obterCategoriaPorSlug(slug);
        if (!categoria?.id) throw new Error("Categoria não encontrada.");

        if (alive) setCat(categoria);

        const { data } = await api.get<Produto[]>("/Produto", {
          params: { limit: 24, offset: 0, idCategoria: categoria.id },
        });

        if (alive) setItems(data ?? []);
      } catch (err: any) {
        if (alive) setError(err?.message ?? "Falha ao carregar produtos");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [slug]);

  const handleSizeChange = (productId: number, value: string) => {
    setSizeByProduct((s) => ({ ...s, [productId]: value ? Number(value) : "" }));
  };

  return (
    <>
      {/* HERO / título da categoria */}
      <section className="ecom-hero">
        <Container className="py-4">
          <h1 className="mb-1">{cat?.nome ?? "Categoria"}</h1>
          {cat?.descricao && <p className="text-muted mb-0">{cat.descricao}</p>}
        </Container>
      </section>

      <Container className="py-4">
        {loading && (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" />
          </div>
        )}

        {!loading && error && <Alert variant="danger">{error}</Alert>}

        {!loading && !error && items.length === 0 && (
          <Alert variant="secondary">Nenhum produto nesta categoria.</Alert>
        )}

        <Row xs={1} sm={2} md={3} lg={4} className="g-4">
          {items.map((p) => {
            const hasSizes = Array.isArray(p.tags) && p.tags.length > 0;
            return (
              <Col key={p.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={p.imagem || "https://via.placeholder.com/600x600?text=Produto"}
                    alt={p.nome}
                  />
                  <Card.Body className="d-flex flex-column gap-2">
                    <Card.Title className="mb-1">{p.nome}</Card.Title>
                    <Card.Text className="text-muted mb-2">{p.descricao || "Sem descrição"}</Card.Text>

                    <div className="d-flex align-items-center justify-content-between gap-2">
                      <strong className="mb-0">{toBRL(p.preco)}</strong>

                      {hasSizes ? (
                        <Form.Select
                          size="sm"
                          style={{ maxWidth: 140 }}
                          value={sizeByProduct[p.id] ?? ""}
                          onChange={(e) => handleSizeChange(p.id, e.target.value)}
                        >
                          <option value="">Tamanho</option>
                          {p.tags!.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.nome}
                            </option>
                          ))}
                        </Form.Select>
                      ) : (
                        <Form.Select size="sm" style={{ maxWidth: 140 }} disabled>
                          <option>Sem variações</option>
                        </Form.Select>
                      )}
                    </div>

                    <div className="mt-3">
                      <Button variant="dark" size="sm">
                        Ver detalhes
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
