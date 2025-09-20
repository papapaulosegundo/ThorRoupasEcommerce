import { Container, Row, Col, Button} from "react-bootstrap";
import { useEffect, useState } from "react";
import "../../styles/index.css";
import { Link } from "react-router-dom";
import {  } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CustomerLoop from "../../components/CustomerLoop/CustomerLoop";
import { MdMan, MdWoman2 } from "react-icons/md";
import { TbMoodKid } from "react-icons/tb";

import slide1 from "../../assets/inicial1.jpg";
import slide2 from "../../assets/teste.png";
import slide3 from "../../assets/LookInfantil.jpeg";

const HERO_IMAGES = [slide1, slide2, slide3];

const LOGOS = [
  { src: new URL("../../assets/logos/nestle.png", import.meta.url).href, alt: "Nestlé", href: "https://www.nestle.com/" },
  { src: new URL("../../assets/logos/amazon2.png", import.meta.url).href, alt: "Amazon", href: "https://www.amazon.com.br/" },
  { src: new URL("../../assets/logos/mercadoLivre.png", import.meta.url).href, alt: "Mercado Livre", href: "https://www.mercadolivre.com.br/" },
  { src: new URL("../../assets/logos/ebay.png", import.meta.url).href, alt: "Ebay", href: "https://br.ebay.com/" },
  { src: new URL("../../assets/logos/shopee.jpg", import.meta.url).href, alt: "Shopee", href: "https://shopee.com.br/" },
  { src: new URL("../../assets/logos/magalu.png", import.meta.url).href, alt: "Magalu", href: "https://www.magazineluiza.com.br" },
];


export default function Home() {

  const navigate = useNavigate();

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // pré-carrega as imagens
    HERO_IMAGES.forEach((src) => { const i = new Image(); i.src = src; });

    const id = setInterval(
      () => setIdx((i) => (i + 1) % HERO_IMAGES.length),
      5000
    );
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <section className="home-hero full">
        <div className="hero-slides">
          {HERO_IMAGES.map((src, i) => (
            <div
              key={i}
              className={`hero-slide ${i === idx ? "is-active" : ""}`}
              style={{ backgroundImage: `url(${src})` }}
              aria-hidden={i !== idx}
            />
          ))}
        </div>

        <Container className="position-relative">
          <div className="hero-card">
            <small className="eyebrow">Desenvolvendo estratégias inovadoras</small>

            <h1 className="hero-title">
              Alavanque suas vendas.<br />
            </h1>

            <p className="hero-lead">
              Sites rápidos, reutilizáveis e prontos para escalar. Foque no seu negócio — nós
              cuidamos do resto.
            </p>

            <div className="actions">
              <Button className="btn-hero" variant="outline-dark" onClick={() => navigate("/contato")}>
                Fale Conosco!
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* SEÇÃO 3 colunas */}
      <section className="home-sections">
        <Container>
          <header className="section-header text-center">
            <h2 className="section-heading">
              Temos a Peça Ideal para Você
            </h2>
          </header>

          <Row className="g-4 align-items-stretch">
            <Col sm={12} md={6} lg={4}>
              <article className="feature-card">
                <div className="feature-icon"><MdMan /></div>
                <h3 className="feature-title">Masculino</h3>
                <p className="feature-text">
                    Com nossos sistemas reutilizaveís e o atendimento da nossa equipe
                    seu Website ficará pronto de maneira rapída, com muita efetividade
                    Venha buscar novos horizontes com o time do Thor.
                </p>
                <Link to="/servicos/masculino" className="feature-cta">Ver serviços</Link>
              </article>
            </Col>

            <Col sm={12} md={6} lg={4}>
              <article className="feature-card">
                <div className="feature-icon"><MdWoman2 /></div>
                <h3 className="feature-title">Feminino</h3>
                <p className="feature-text">
                    Com nosso portfólio com clientes de diversas áreas, mostra que nós conseguimos
                    atender clientes de diferentes ramos e extrair a essência para cada cliente
                    transformando a ideia em algo com vida.
                </p>
                <Link to="/servicos/feminino" className="feature-cta">Ver portfólio</Link>
              </article>
            </Col>

            <Col sm={12} md={6} lg={4}>
              <article className="feature-card">
                <div className="feature-icon"><TbMoodKid /></div>
                <h3 className="feature-title">Infantil</h3>
                <p className="feature-text">
                  Nosso clientes tem o melhor que tem no mercado de Desenvolvimento, com nossa equipe
                  você garante suporte contínuo do website, além da hospedagem e buscando sempre a evolução do seu produto!
                </p>
                <Link to="/servicos/infantil" className="feature-cta">Fale com a gente</Link>
              </article>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <CustomerLoop
          emphasis = "+100 marcas"
          rest = "para você escolher"
          logos={LOGOS}
          speed={30}          
          logoHeight={30}     
          grayscale          
        />
      </section>
    </>
  );
}
