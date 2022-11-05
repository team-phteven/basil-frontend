import React, { useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const NewContactModal = ({ closeModal }) => {
    const emailRef = useRef();
    const handleSubmit = (e) => {
        e.prevent.default();

        // requestContact(idRef.current.value, nameRef.current.value);
        closeModal();
    };

    return (
        <>
            <Modal.Header closeButton>Make Contact Request</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" ref={emailRef} required />
                    </Form.Group>
                    <Button className="mt-1" type="submit">
                        Request
                    </Button>
                </Form>
            </Modal.Body>
        </>
    );
};

export default NewContactModal;
