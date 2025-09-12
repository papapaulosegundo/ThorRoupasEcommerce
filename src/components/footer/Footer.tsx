import { Container, Row, Col } from "react-bootstrap";
import {
  FaClock,
  FaPhoneAlt,
  FaEnvelope,
  FaDesktop,
  FaLinkedin,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import "../../styles/index.css";


function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className="text-center gy-4">
          <Col md={3}>
            <div className="footer-icon">
              <FaClock />
            </div>
            <h6>Horário de Funcionamento</h6>
            <p>07:00 às 23:59</p>
          </Col>

          <Col md={3}>
            <div className="footer-icon">
              <FaPhoneAlt />
            </div>
            <h6>Telefone</h6>
            <p>+55 41 99999-9999</p>
          </Col>

          <Col md={3}>
            <div className="footer-icon">
              <FaEnvelope />
            </div>
            <h6>Email</h6>
            <p>contato@thorinc.com</p>
          </Col>

          <Col md={3}>
            <div className="footer-icon">
              <FaDesktop />
            </div>
            <h6>Dispositivos</h6>
            <p>Disponível em vários dispositivos</p>
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <div className="social-icons d-flex gap-3 justify-content-center">
            <a href="#" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
            <a href="#" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
          </div>
        </Row>

        <Row>
          <Col className="text-center mt-4">
            <p className="footer-text">
              Created by <span>Thor Inc</span> © All Rights Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
