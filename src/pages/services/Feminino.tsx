import { Container, Row, Col, Button } from "react-bootstrap";
import "../../styles/index.css";
import ecommerceImg from "../../assets/ecommerce.webp";


export default function FemininoPage() {
  return (
    <>
      {/* HERO */}
      <section className="ecom-hero">
        <Container>
          <Row className="align-items-center">
            {/* Texto */}
            <Col lg={6} className="mb-4 mb-lg-0">
              <span className="ecom-eyebrow">Criação de E-commerce</span>

              <h1 className="ecom-title">
                Aumente suas vendas e{" "}
                <span className="ecom-accent">conquiste o mercado online com uma loja virtual</span>{" "}
              </h1>

              <p className="ecom-lead">
                Criamos lojas virtuais que oferecem funcionalidades robustas
                para impulsionar suas vendas e garantir uma experiência de
                compra excepcional para os seus clientes.
              </p>

              <div className="mt-4">
                <Button className="btn-chat" onClick={() => { /* abrir chat depois */ }}>
                  Iniciar chat
                </Button>
              </div>
            </Col>

            {/* Imagem */}
            <Col lg={6} className="text-center">
              <div className="ecom-art">
                <img src={ecommerceImg} alt="E-commerce" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
