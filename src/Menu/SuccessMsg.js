import React, { useState } from 'react'
import { Button, Modal} from 'react-bootstrap'

export default function SuccessMsg() {
  const [showModal, setShowModal] = useState(false);
  const handleModalClose =()=> {
    setShowModal(true)
  }
  return (
    <div className="container">
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your order has been placed successfully.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}