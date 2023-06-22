import React, {useState} from 'react'
import { Modal, Button } from 'react-bootstrap';

const AvisoModal = ({ aviso, cerrarModal }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    cerrarModal();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>EMPLOYEE NOT FOUND!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{aviso}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AvisoModal;