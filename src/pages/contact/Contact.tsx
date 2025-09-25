import { Container, Row, Col, Button} from "react-bootstrap";
import { FaComments, FaEnvelope, FaPhoneAlt} from "react-icons/fa";
import "../../styles/index.css";

/*import Swal, { SweetAlertResult } from 'sweetalert2';
import api from '@/services/api'; // quando existir*/

export default function Contact() {

  return (
    <>
        {/* HERO */}
        <section className="contact-hero">
            <Container>
                <h1 className="title">Fale Conosco!</h1>
                <p className="subtitle">
                Aqui você encontra tudo que precisar!
                </p>
            </Container>
        </section>

        {/* CARDS DE CONTATO (flip) */}
        <section className="py-5">
            <Container>
                <Row className="g-4">
                {/* CHAT */}
                <Col md={4}>
                <div className="card-3d">
                    <div className="flip-inner">
                        <div className="face front contact-card">
                            <div className="icon-badge"><FaComments /></div>
                            <h5 className="card-title">Chat Online</h5>
                            <p className="card-text">Atendimento em tempo real com nossa equipe.</p>
                        </div>
                        <div className="face back contact-back">
                            <h5 className="mb-2">Chat Online</h5>
                            <p className="mb-3 opacity-75">Fale com a nossa equipe agora.</p>
                            <Button className="btn-pill btn-cta" as="button" onClick={() => {/* abrir chat aqui depois */}} >
                                Iniciar Chat
                            </Button>
                        </div>
                    </div>
                </div>
                </Col>

                {/* EMAIL */}
                <Col md={4}>
                    <div className="card-3d" tabIndex={0}>
                    <div className="flip-inner">
                        <div className="face front contact-card">
                        <div className="icon-badge"><FaEnvelope /></div>
                        <h5 className="card-title">Mande um e-mail</h5>
                        <p className="card-text">
                            contato@thorinc.com<br />ou Preencha o Formulário Abaixo.
                        </p>
                        </div>
                        <div className="face back contact-back">
                        <h5 className="mb-2">E-mail</h5>
                        <p className="mb-3 opacity-75">Envie um email para nossa equipe. <br></br> contato@thorinc.com</p>
                        <div className="d-flex gap-2 flex-wrap justify-content-center">
                            <Button className="btn-pill btn-cta" href="mailto:contato@thorinc.com">
                                Enviar e-mail
                            </Button>
                        </div>
                        </div>
                    </div>
                    </div>
                </Col>

                {/* TELEFONE */}
                <Col md={4}>
                    <div className="card-3d" tabIndex={0}>
                    <div className="flip-inner">
                        <div className="face front contact-card">
                        <div className="icon-badge"><FaPhoneAlt /></div>
                        <h5 className="card-title">Contato</h5>
                        <p className="card-text">
                            Ligue (47) 99999-9999<br />Todos os dias, Todos os horários.
                        </p>
                        </div>
                        <div className="face back contact-back">
                        <h5 className="mb-2">Telefone</h5>
                        <p className="mb-3 opacity-75">Ligue para nossa equipe.</p>
                        <Button className="btn-pill btn-cta" href="tel:+5547999999999">
                            Ligar agora
                        </Button>
                        </div>
                    </div>
                    </div>
                </Col>
                </Row>
            </Container>
        </section>
        
        {/* MAPA */}
        <section className="contact-map">
            <Container>
                <h2 className="map-title text-center mb-3">Estamos Localizados:</h2>

                <div className="map-embed">
                <iframe
                    title="PUCPR - Bloco 9"
                    src="https://www.google.com/maps?q=PUCPR%20Bloco%209%2C%20Pontif%C3%ADcia%20Universidade%20Cat%C3%B3lica%20do%20Paran%C3%A1%2C%20Curitiba&hl=pt-BR&z=16&output=embed"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
                </div>

                <div className="text-center mt-2">
                <a
                    className="map-open-link"
                    href="https://www.google.com/maps/search/?api=1&query=PUCPR%20Bloco%209%20Curitiba"
                    target="_blank"
                    rel="noreferrer"
                >
                    Abrir no Google Maps
                </a>
                </div>
            </Container>
        </section>
    </>
  );
}
