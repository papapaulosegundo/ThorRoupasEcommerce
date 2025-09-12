import { Container, Row, Col, Button} from "react-bootstrap";
import { useEffect, useState } from "react";
import "../../styles/index.css";
import { Link } from "react-router-dom";
import { FaFileImage, FaLayerGroup, FaHandshake } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CustomerLoop from "../../components/CustomerLoop/CustomerLoop";


const HERO_IMAGES = [
  new URL("../../assets/Prototipos/Montanhismo.webp", import.meta.url).href,
  new URL("../../assets/Prototipos/Mercado.webp", import.meta.url).href,
  new URL("../../assets/Prototipos/Farmacia.webp", import.meta.url).href,
];

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
              Temos a Solução Ideal para seu Negócio
            </h2>
          </header>

          <Row className="g-4 align-items-stretch">
            <Col sm={12} md={6} lg={4}>
              <article className="feature-card">
                <div className="feature-icon"><FaFileImage /></div>
                <h3 className="feature-title">Desenvolvimento Web</h3>
                <p className="feature-text">
                    Com nossos sistemas reutilizaveís e o atendimento da nossa equipe
                    seu Website ficará pronto de maneira rapída, com muita efetividade
                    Venha buscar novos horizontes com o time do Thor.
                </p>
                <Link to="/servicos#opcoes" className="feature-cta">Ver serviços</Link>
              </article>
            </Col>

            <Col sm={12} md={6} lg={4}>
              <article className="feature-card">
                <div className="feature-icon"><FaLayerGroup /></div>
                <h3 className="feature-title">Projetos</h3>
                <p className="feature-text">
                    Com nosso portfólio com clientes de diversas áreas, mostra que nós conseguimos
                    atender clientes de diferentes ramos e extrair a essência para cada cliente
                    transformando a ideia em algo com vida.
                </p>
                <Link to="/portfolio" className="feature-cta">Ver portfólio</Link>
              </article>
            </Col>

            <Col sm={12} md={6} lg={4}>
              <article className="feature-card">
                <div className="feature-icon"><FaHandshake /></div>
                <h3 className="feature-title">Seja Nosso Cliente</h3>
                <p className="feature-text">
                  Nosso clientes tem o melhor que tem no mercado de Desenvolvimento, com nossa equipe
                  você garante suporte contínuo do website, além da hospedagem e buscando sempre a evolução do seu produto!
                </p>
                <Link to="/contato" className="feature-cta">Fale com a gente</Link>
              </article>
            </Col>
          </Row>
        </Container>
      </section>

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
    </>
  );
}
