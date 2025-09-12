import { Container, Row, Col, Button } from "react-bootstrap";
import { FaStore, FaLaptop, FaShoppingBasket, FaIndustry } from "react-icons/fa";
import "../../styles/index.css";
import CustomerLoop from "../../components/CustomerLoop/CustomerLoop";
import ecommerceImg from "../../assets/ecommerce.webp";
import homemProsperando from "../../assets/homemprosperando.webp";

const LOGOS = [
  { src: new URL("../../assets/logos/nestle.png", import.meta.url).href, alt: "Nestlé", href: "https://www.nestle.com/" },
  { src: new URL("../../assets/logos/amazon2.png", import.meta.url).href, alt: "Amazon", href: "https://www.amazon.com.br/" },
  { src: new URL("../../assets/logos/mercadoLivre.png", import.meta.url).href, alt: "Mercado Livre", href: "https://www.mercadolivre.com.br/" },
  { src: new URL("../../assets/logos/ebay.png", import.meta.url).href, alt: "Ebay", href: "https://br.ebay.com/" },
  { src: new URL("../../assets/logos/shopee.jpg", import.meta.url).href, alt: "Shopee", href: "https://shopee.com.br/" },
  { src: new URL("../../assets/logos/magalu.png", import.meta.url).href, alt: "Magalu", href: "https://www.magazineluiza.com.br" },
];

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

      {/* logos */}
      <section>
        <CustomerLoop
          emphasis="+100 empresas"
          rest="estão prosperando no Thor"
          logos={LOGOS}
          speed={30}
          logoHeight={30}
          grayscale
        />
      </section>

      <section className="ecom-target">
        <Container>
          <Row className="g-5 align-items-center">
            <Col lg={6}>
              <div className="target-img">
                <img src={homemProsperando} alt="Profissional trabalhando e prosperando" loading="lazy" />
              </div>
            </Col>

            <Col lg={6}>
              <header className="target-header">
                <h2 className="target-title">
                  Para quem é indicado a{" "}
                  <span className="target-highlight">criação do E-commerce?</span>
                </h2>
                <p className="target-lead">
                  A criação de e-commerce é ideal para empresas que desejam expandir suas
                  operações e alcançar clientes em uma escala global, oferecendo
                  uma experiência de compra conveniente e acessível 24/7.
                </p>
              </header>

              <div className="target-list">
                <div className="target-card">
                  <div className="target-ico"><FaStore /></div>
                  <div className="target-text">Quem possui lojas físicas</div>
                </div>

                <div className="target-card">
                  <div className="target-ico"><FaLaptop /></div>
                  <div className="target-text">Empresas que atendem de forma remota</div>
                </div>

                <div className="target-card">
                  <div className="target-ico"><FaShoppingBasket /></div>
                  <div className="target-text">Para supermercados</div>
                </div>

                <div className="target-card">
                  <div className="target-ico"><FaIndustry /></div>
                  <div className="target-text">Para fabricantes</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

    </>
  );
}
