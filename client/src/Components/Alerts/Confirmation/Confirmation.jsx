import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

export default function Confirmation( {titulo,mensaje, textBtn,show , handleClose, handleDelete}) {
  return (
    <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>{ titulo }</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>
        {mensaje}
      </p>
      </Modal.Body>

    <Modal.Footer>

      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>

      <Button variant="primary" onClick={handleDelete}>
        {textBtn}
      </Button>
      
    </Modal.Footer>

  </Modal>
  )
}