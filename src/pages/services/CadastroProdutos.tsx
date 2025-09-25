import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { FaComments, FaEnvelope, FaPhoneAlt, FaArrowRight } from "react-icons/fa";
import "../../styles/index.css";

/*import Swal, { SweetAlertResult } from 'sweetalert2';
import api from '@/services/api'; // quando existir*/

export default function CadastroFormulario() {

  return (
    <>
        {/* HERO */}
        <section className="contact-hero">
            <Container>
                <h1 className="title">Fale Conosco!</h1>
                <p className="subtitle">
                Estamos prontos para acelerar suas vendas com soluções sob medida.
                </p>
            </Container>
        </section>

        {/* FORMULÁRIO */}
        <section className="contact-form-wrap">
            <Container>
                <Card className="contact-form-card mx-auto">
                <Card.Body className="p-4 p-md-5">
                    <h2 className="form-title text-center mb-4">Formulário de Contato</h2>

                    <Form onSubmit={(e) => e.preventDefault()} noValidate>
                    <Row className="g-4">
                        <Col md={6}>
                        <Form.Group controlId="formNome">
                            <Form.Label> Nome <span className="req">*</span> </Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Seu nome"
                            className="input-pill"
                            />
                        </Form.Group>
                        </Col>

                        <Col md={6}>
                        <Form.Group controlId="formEmail">
                            <Form.Label> Email <span className="req">*</span> </Form.Label>
                            <Form.Control
                            type="email"
                            placeholder="voce@email.com"
                            required
                            className="input-pill"
                            />
                        </Form.Group>
                        </Col>

                        <Col md={6}>
                        <Form.Group controlId="formEmpresa">
                            <Form.Label> Nome da empresa <span className="req">*</span> </Form.Label>
                            <Form.Control
                            type="text"
                            placeholder="Ex.: Barbecue Hellman's"
                            required
                            className="input-pill"
                            />
                        </Form.Group>
                        </Col>

                        <Col md={6}>
                        <Form.Group controlId="formSegmento">
                            <Form.Label> Segmento <span className="req">*</span> </Form.Label>
                            <Form.Select required className="input-pill">
                                <option value="">Selecione…</option>
                                <option>E-commerce</option>
                                <option>Website</option>
                                <option>Outro</option>
                            </Form.Select>
                        </Form.Group>
                        </Col>
                    </Row>

                    <div className="text-center mt-4">
                        <Button type="button" variant="success" className="btn-send">
                        Enviar Formulário <FaArrowRight className="ms-1" />
                        </Button>
                    </div>
                    </Form>
                </Card.Body>
                </Card>
            </Container>
        </section>

    </>
  );
}
