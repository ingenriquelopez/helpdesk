import React from 'react'
import Modal from 'react-bootstrap/Modal'

export default function Annoument( {mensaje,titulo, smShow, handleSmClose }) {
  return (
    <Modal
    size="sm"
    show={smShow}
    onHide={handleSmClose}
    aria-labelledby="example-modal-sizes-title-sm"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-sm">
        {titulo}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>{mensaje}</Modal.Body>
  </Modal>
  )
}