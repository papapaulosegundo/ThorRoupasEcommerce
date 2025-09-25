import { Container, Row, Col} from "react-bootstrap";
import { FaProductHunt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/index.css";
import { FaSection } from "react-icons/fa6";

/*import Swal, { SweetAlertResult } from 'sweetalert2';
import api from '@/services/api'; // quando existir*/

export default function CadastroFormulario() {

  return (
    <>
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
                        <div className="feature-icon"><FaSection /></div>
                        <h3 className="feature-title">Adicionar Categoria de Produtos</h3>
                        <p className="feature-text">
                            Adicione as categorias para seus produtos aqui! Tenha várias categorias
                            de produtos para seu negócio ficar bem divido e os clientes acharem o quer
                            querem com mais facilidade!
                        </p>
                        <Link to="/servicos/categorias" className="feature-cta">Adicionar Categorias</Link>
                    </article>
                    </Col>

                    <Col sm={12} md={6} lg={4}>
                    <article className="feature-card">
                        <div className="feature-icon"><FaProductHunt /></div>
                        <h3 className="feature-title">Adicionar Produto</h3>
                        <p className="feature-text">
                            Adicione e popule produtos nas suas categorias, deixe suas categorias
                            cheio de produtos espetaculares para seus clientes!
                        </p>
                        <Link to="/servicos/produtos" className="feature-cta">Adicionar Produtos</Link>
                    </article>
                    </Col>
                </Row>
            </Container>
            </section>
    </>
  );
}
